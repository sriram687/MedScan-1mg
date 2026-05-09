const axios = require('axios');
const mongoose = require('mongoose');
const { uploadImageFromUrl, getOptimizedUrl, batchUpload } = require('../services/cloudinaryService');
const Medicine = require('../models/Medicine');
require('dotenv').config();

// Medicine data with 1mg.com image URLs (real images)
const medicinesWithImages = [
  {
    name: 'Paracetamol',
    link: 'https://www.1mg.com/drugs/paracetamol',
    composition: 'Paracetamol 500mg',
    manufacturer: 'Cipla',
    letter: 'P',
    uses: 'Pain, fever relief',
    side_effects: 'Liver damage with overdose',
    quick_tips: 'Take with food if stomach upset',
    prescriptionRequired: false,
    price: '₹35',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/Untitled-1__118_.jpg' // Real 1mg image
  },
  {
    name: 'Ibuprofen',
    link: 'https://www.1mg.com/drugs/ibuprofen',
    composition: 'Ibuprofen 400mg',
    manufacturer: 'Cipla',
    letter: 'I',
    uses: 'Pain, inflammation, fever',
    side_effects: 'Stomach upset, ulcers',
    quick_tips: 'Take with milk or food',
    prescriptionRequired: false,
    price: '₹48',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/brufen_400.jpg'
  },
  {
    name: 'Metformin',
    link: 'https://www.1mg.com/drugs/metformin',
    composition: 'Metformin 500mg',
    manufacturer: 'Lupin',
    letter: 'M',
    uses: 'Type 2 diabetes management',
    side_effects: 'Nausea, diarrhea, vitamin B12 deficiency',
    quick_tips: 'Take with meals to reduce GI upset',
    prescriptionRequired: true,
    price: '₹48',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/glucophage_500.jpg'
  },
  {
    name: 'Aspirin',
    link: 'https://www.1mg.com/drugs/aspirin',
    composition: 'Aspirin 300mg',
    manufacturer: 'Bayer',
    letter: 'A',
    uses: 'Pain, fever, heart protection',
    side_effects: 'Stomach upset, allergic reactions',
    quick_tips: 'Chew or dissolve in water for fast relief',
    prescriptionRequired: false,
    price: '₹28',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/aspirin_300.jpg'
  },
  {
    name: 'Amoxicillin',
    link: 'https://www.1mg.com/drugs/amoxicillin',
    composition: 'Amoxicillin 500mg',
    manufacturer: 'Cipla',
    letter: 'A',
    uses: 'Bacterial infections',
    side_effects: 'Allergic reactions, rash, diarrhea',
    quick_tips: 'Complete full course even if symptoms relief',
    prescriptionRequired: true,
    price: '₹52',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/amoxicillin_500.jpg'
  },
  {
    name: 'Vitamin B12',
    link: 'https://www.1mg.com/drugs/vitamin-b12',
    composition: 'Cyanocobalamin 1000mcg',
    manufacturer: 'Merck',
    letter: 'V',
    uses: 'B12 deficiency, anemia treatment',
    side_effects: 'None with oral form',
    quick_tips: 'Take on empty stomach for better absorption',
    prescriptionRequired: false,
    price: '₹120',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/vitamin_b12.jpg'
  },
  {
    name: 'Cetirizine',
    link: 'https://www.1mg.com/drugs/cetirizine',
    composition: 'Cetirizine 10mg',
    manufacturer: 'Cipla',
    letter: 'C',
    uses: 'Allergies, urticaria, itching',
    side_effects: 'Drowsiness, dry mouth',
    quick_tips: 'Do not drive after taking',
    prescriptionRequired: false,
    price: '₹35',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/cetirizine_10.jpg'
  },
  {
    name: 'Omeprazole',
    link: 'https://www.1mg.com/drugs/omeprazole',
    composition: 'Omeprazole 20mg',
    manufacturer: 'Cipla',
    letter: 'O',
    uses: 'GERD, ulcers, acid reflux',
    side_effects: 'Headache, diarrhea, abdominal pain',
    quick_tips: 'Take 30 minutes before meals',
    prescriptionRequired: false,
    price: '₹85',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/omeprazole_20.jpg'
  },
  {
    name: 'Atorvastatin',
    link: 'https://www.1mg.com/drugs/atorvastatin',
    composition: 'Atorvastatin 10mg',
    manufacturer: 'Cipla',
    letter: 'A',
    uses: 'High cholesterol management',
    side_effects: 'Muscle pain, liver issues',
    quick_tips: 'Take in evening, consistent timing',
    prescriptionRequired: true,
    price: '₹62',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/atorvastatin_10.jpg'
  },
  {
    name: 'Levothyroxine',
    link: 'https://www.1mg.com/drugs/levothyroxine',
    composition: 'Levothyroxine 50mcg',
    manufacturer: 'Lupin',
    letter: 'L',
    uses: 'Hypothyroidism treatment',
    side_effects: 'None with correct dosage',
    quick_tips: 'Take on empty stomach, wait 30min before food',
    prescriptionRequired: true,
    price: '₹75',
    image_url: 'https://onemg.imgix.net/catalog/medicine/2020-07/levothyroxine_50.jpg'
  }
];

async function seedWithImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGO_DB_NAME || 'prescription-medicine'
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing medicines
    await Medicine.deleteMany({});
    console.log('🗑️  Cleared existing medicines');

    console.log('\n📸 Processing medicine images...');
    
    // Process each medicine
    const processedMedicines = [];
    
    for (const med of medicinesWithImages) {
      console.log(`\n⏳ Processing: ${med.name}`);
      
      // Create public ID for Cloudinary
      const publicId = `medicines/${med.letter.toLowerCase()}/${med.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      try {
        // Upload image to Cloudinary
        const uploadResult = await uploadImageFromUrl(med.image_url, publicId);
        
        if (uploadResult) {
          // Update medicine with Cloudinary URL
          const medicineData = {
            ...med,
            image_url: uploadResult.secure_url,
            cloudinary_public_id: publicId
          };
          
          processedMedicines.push(medicineData);
          console.log(`✅ Image URL: ${uploadResult.secure_url}`);
        } else {
          // Fallback to original URL if upload fails
          console.log(`⚠️  Upload failed, using original URL`);
          processedMedicines.push(med);
        }
      } catch (error) {
        console.error(`❌ Error processing ${med.name}:`, error.message);
        // Add medicine without waiting for image
        processedMedicines.push(med);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Insert medicines into database
    console.log('\n📥 Inserting medicines into database...');
    const result = await Medicine.insertMany(processedMedicines);
    console.log(`✅ Seeded ${result.length} medicines`);

    // Display summary
    const count = await Medicine.countDocuments();
    console.log(`\n📊 Total medicines in database: ${count}`);

    // Get breakdown
    const withImages = await Medicine.countDocuments({ image_url: { $regex: 'cloudinary', $options: 'i' } });
    console.log(`📸 Medicines with Cloudinary images: ${withImages}`);
    
    const rxCount = await Medicine.countDocuments({ prescriptionRequired: true });
    const otcCount = await Medicine.countDocuments({ prescriptionRequired: false });
    console.log(`\n💊 Prescription vs OTC:`);
    console.log(`   Requires Prescription (Rx): ${rxCount}`);
    console.log(`   Over-the-Counter (OTC): ${otcCount}`);

    // Display first medicine as example
    const sample = await Medicine.findOne();
    console.log(`\n📋 Sample medicine:`, {
      name: sample.name,
      image_url: sample.image_url,
      cloudinary_public_id: sample.cloudinary_public_id
    });

    mongoose.connection.close();
    console.log('\n✅ Database seeding with images complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedWithImages();
}

module.exports = { seedWithImages };
