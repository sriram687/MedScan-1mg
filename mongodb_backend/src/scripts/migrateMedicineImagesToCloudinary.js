const mongoose = require('mongoose');
require('dotenv').config();

const Medicine = require('../models/Medicine');
const { uploadImageFromUrl } = require('../services/cloudinaryService');

function toPublicId(medicine) {
  const namePart = String(medicine.name || 'medicine')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const letterPart = String(medicine.letter || namePart?.[0] || 'x').toLowerCase();
  return `medicines/${letterPart}/${namePart}-${String(medicine._id)}`;
}

async function main() {
  const { MONGO_URI, MONGO_DB_NAME, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!MONGO_URI) throw new Error('Missing MONGO_URI');
  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Missing Cloudinary env vars (CLOUDINARY_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET)');
  }

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: MONGO_DB_NAME || 'prescription-medicine'
  });

  console.log('✅ Connected to MongoDB');

  const cursor = Medicine.find({
    image_url: { $type: 'string', $ne: '' },
    image_url: { $not: /cloudinary\.com/i }
  }).cursor();

  let processed = 0;
  let uploaded = 0;
  let failed = 0;

  for await (const med of cursor) {
    processed += 1;

    const srcUrl = String(med.image_url || '').trim();
    if (!srcUrl) continue;

    const publicId = toPublicId(med);
    console.log(`\n⏳ [${processed}] ${med.name} → uploading image`);

    try {
      const result = await uploadImageFromUrl(srcUrl, publicId);
      if (!result?.secure_url) {
        failed += 1;
        console.log(`⚠️  Upload failed for ${med.name}`);
        continue;
      }

      med.image_url = result.secure_url;
      await med.save();
      uploaded += 1;
      console.log(`✅ Updated image_url → ${result.secure_url}`);

      // light rate-limit
      await new Promise((r) => setTimeout(r, 350));
    } catch (e) {
      failed += 1;
      console.log(`❌ Error for ${med.name}: ${e?.message || e}`);
    }
  }

  console.log('\n📊 Migration summary:');
  console.log(`   Processed: ${processed}`);
  console.log(`   Uploaded:  ${uploaded}`);
  console.log(`   Failed:    ${failed}`);

  await mongoose.connection.close();
  console.log('✅ Done');
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌ Migration failed:', e?.message || e);
    process.exit(1);
  });
}
