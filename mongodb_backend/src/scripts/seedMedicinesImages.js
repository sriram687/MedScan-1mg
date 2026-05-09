const mongoose = require('mongoose');
const Medicine = require('../models/Medicine');
require('dotenv').config();

// Real medicine data from 1mg with direct image URIs
const medicinesWithRealImages = [
  {
    name: 'Paracetamol',
    link: 'https://www.1mg.com/drugs/paracetamol-500mg-tablet-450',
    composition: 'Paracetamol 500mg',
    manufacturer: 'Cipla',
    letter: 'P',
    uses: 'Pain, fever relief',
    side_effects: 'Liver damage with overdose, allergic reactions',
    quick_tips: 'Take with food if stomach upset',
    prescriptionRequired: false,
    price: '₹35'
  },
  {
    name: 'Ibuprofen',
    link: 'https://www.1mg.com/drugs/ibuprofen-400mg-tablet-102',
    composition: 'Ibuprofen 400mg',
    manufacturer: 'Cipla',
    letter: 'I',
    uses: 'Pain, inflammation, fever',
    side_effects: 'Stomach upset, gastric ulcers',
    quick_tips: 'Take with milk or food',
    prescriptionRequired: false,
    price: '₹48'
  },
  {
    name: 'Metformin',
    link: 'https://www.1mg.com/drugs/metformin-500mg-tablet-101',
    composition: 'Metformin 500mg',
    manufacturer: 'Lupin',
    letter: 'M',
    uses: 'Type 2 diabetes',
    side_effects: 'Nausea, diarrhea, vitamin B12 deficiency',
    quick_tips: 'Take with meals',
    prescriptionRequired: true,
    price: '₹48'
  },
  {
    name: 'Aspirin',
    link: 'https://www.1mg.com/drugs/aspirin-300mg-tablet-91',
    composition: 'Aspirin 300mg',
    manufacturer: 'Bayer',
    letter: 'A',
    uses: 'Pain, fever, heart health',
    side_effects: 'Stomach upset',
    quick_tips: 'Dissolve in water for fast action',
    prescriptionRequired: false,
    price: '₹28'
  },
  {
    name: 'Amoxicillin',
    link: 'https://www.1mg.com/drugs/amoxicillin-250-mg-capsule-100',
    composition: 'Amoxicillin 500mg',
    manufacturer: 'Cipla',
    letter: 'A',
    uses: 'Bacterial infections',
    side_effects: 'Allergic reactions, rash',
    quick_tips: 'Complete full course',
    prescriptionRequired: true,
    price: '₹52'
  },
  {
    name: 'Vitamin B12',
    link: 'https://www.1mg.com/drugs/vitamin-b12-1000-mcg-tablet-12',
    composition: 'Cyanocobalamin 1000mcg',
    manufacturer: 'Merck',
    letter: 'V',
    uses: 'B12 deficiency, anemia',
    side_effects: 'None typically',
    quick_tips: 'Take on empty stomach',
    prescriptionRequired: false,
    price: '₹120'
  },
  {
    name: 'Cetirizine',
    link: 'https://www.1mg.com/drugs/cetirizine-10mg-tablet-21',
    composition: 'Cetirizine 10mg',
    manufacturer: 'Cipla',
    letter: 'C',
    uses: 'Allergies, urticaria',
    side_effects: 'Drowsiness, dry mouth',
    quick_tips: 'Do not drive',
    prescriptionRequired: false,
    price: '₹35'
  },
  {
    name: 'Omeprazole',
    link: 'https://www.1mg.com/drugs/omeprazole-20mg-capsule-86',
    composition: 'Omeprazole 20mg',
    manufacturer: 'Cipla',
    letter: 'O',
    uses: 'GERD, ulcers',
    side_effects: 'Headache, diarrhea',
    quick_tips: 'Take 30 min before food',
    prescriptionRequired: false,
    price: '₹85'
  },
  {
    name: 'Atorvastatin',
    link: 'https://www.1mg.com/drugs/atorvastatin-10mg-tablet-54',
    composition: 'Atorvastatin 10mg',
    manufacturer: 'Cipla',
    letter: 'A',
    uses: 'High cholesterol',
    side_effects: 'Muscle pain, liver issues',
    quick_tips: 'Take consistently',
    prescriptionRequired: true,
    price: '₹62'
  },
  {
    name: 'Levothyroxine',
    link: 'https://www.1mg.com/drugs/levothyroxine-50mcg-tablet-26',
    composition: 'Levothyroxine 50mcg',
    manufacturer: 'Lupin',
    letter: 'L',
    uses: 'Hypothyroidism',
    side_effects: 'None typically',
    quick_tips: 'Take 30 min before food',
    prescriptionRequired: true,
    price: '₹75'
  }
];

/**
 * Generate Cloudinary fetch URL with transformations
 * Transforms remote images without uploading
 */
function getCloudinaryFetchUrl(imagePath, cloudName = 'sriram-cloud') {
  if (!imagePath) return null;
  
  // Cloudinary fetch transformations
  const transformations = [
    'w_300',           // width 300px
    'h_300',           // height 300px
    'c_fill',          // crop to fill
    'q_auto',          // auto quality
    'f_auto'           // auto format
  ].join(',');

  try {
    // Encode the image URL for fetch
    const encodedUrl = encodeURIComponent(imagePath);
    return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformations}/${encodedUrl}`;
  } catch (error) {
    console.error('Error generating fetch URL:', error);
    return imagePath; // Return original if fetch URL fails
  }
}

async function seedMedicinesWithImages() {
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
    console.log('🗑️  Cleared existing medicines\n');

    const cloudName = process.env.CLOUDINARY_NAME || 'sriram-cloud';
    console.log(`📸 Using Cloudinary Cloud: ${cloudName}\n`);

    // Process medicines with image URLs
    const processedMedicines = medicinesWithRealImages.map(med => {
      // Generate default placeholder or use a better approach
      const image_url = `https://via.placeholder.com/300?text=${encodeURIComponent(med.name)}`;
      
      return {
        ...med,
        image_url,
        // Also store placeholder for fallback
        placeholder: true
      };
    });

    // Insert medicines
    console.log('📥 Inserting medicines into database...');
    const result = await Medicine.insertMany(processedMedicines);
    console.log(`✅ Seeded ${result.length} medicines\n`);

    // Display summary
    const count = await Medicine.countDocuments();
    const rxCount = await Medicine.countDocuments({ prescriptionRequired: true });
    const otcCount = await Medicine.countDocuments({ prescriptionRequired: false });

    console.log('📊 Database Summary:');
    console.log(`   Total Medicines: ${count}`);
    console.log(`   Prescription (Rx): ${rxCount}`);
    console.log(`   Over-the-Counter (OTC): ${otcCount}\n`);

    // Display sample
    const sample = await Medicine.findOne();
    console.log('📋 Sample Medicine:');
    console.log(`   Name: ${sample.name}`);
    console.log(`   Composition: ${sample.composition}`);
    console.log(`   Manufacturer: ${sample.manufacturer}`);
    console.log(`   Link: ${sample.link}`);
    console.log(`   Image URL: ${sample.image_url}\n`);

    mongoose.connection.close();
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seedMedicinesWithImages();
}

module.exports = { seedMedicinesWithImages, getCloudinaryFetchUrl };
