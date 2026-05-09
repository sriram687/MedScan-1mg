const mongoose = require('mongoose');
const Medicine = require('../models/Medicine');
require('dotenv').config();

// Sample medicine data
const sampleMedicines = [
  // Anxiety & Sleep
  { name: 'Alprazolam', link: 'https://www.1mg.com/drugs/alprazolam', composition: 'Alprazolam 0.5mg', manufacturer: 'Pfizer', letter: 'A', uses: 'Anxiety disorders', side_effects: 'Drowsiness, dizziness', prescriptionRequired: true, price: '₹45', image_url: 'https://via.placeholder.com/200' },
  { name: 'Amitriptyline', link: 'https://www.1mg.com/drugs/amitriptyline', composition: 'Amitriptyline 25mg', manufacturer: 'Cipla', letter: 'A', uses: 'Depression, anxiety', side_effects: 'Dry mouth, weight gain', prescriptionRequired: true, price: '₹32', image_url: 'https://via.placeholder.com/200' },

  // Antibiotics
  { name: 'Amoxicillin', link: 'https://www.1mg.com/drugs/amoxicillin', composition: 'Amoxicillin 500mg', manufacturer: 'Cipla', letter: 'A', uses: 'Bacterial infections', side_effects: 'Allergic reactions', prescriptionRequired: true, price: '₹52', image_url: 'https://via.placeholder.com/200' },
  { name: 'Azithromycin', link: 'https://www.1mg.com/drugs/azithromycin', composition: 'Azithromycin 500mg', manufacturer: 'Lupin', letter: 'A', uses: 'Infections, bronchitis', side_effects: 'Nausea, diarrhea', prescriptionRequired: true, price: '₹85', image_url: 'https://via.placeholder.com/200' },

  // Pain & Fever
  { name: 'Aspirin', link: 'https://www.1mg.com/drugs/aspirin', composition: 'Aspirin 500mg', manufacturer: 'Bayer', letter: 'A', uses: 'Pain, fever, heart health', side_effects: 'Stomach upset', prescriptionRequired: false, price: '₹28', image_url: 'https://via.placeholder.com/200' },
  { name: 'Acetaminophen', link: 'https://www.1mg.com/drugs/acetaminophen', composition: 'Acetaminophen 500mg', manufacturer: 'Cipla', letter: 'A', uses: 'Pain, fever', side_effects: 'Liver damage with overdose', prescriptionRequired: false, price: '₹35', image_url: 'https://via.placeholder.com/200' },

  // B Vitamins
  { name: 'Vitamin B12', link: 'https://www.1mg.com/drugs/vitamin-b12', composition: 'Cyanocobalamin 1000mcg', manufacturer: 'Merck', letter: 'V', uses: 'B12 deficiency, anemia', side_effects: 'None', prescriptionRequired: false, price: '₹120', image_url: 'https://via.placeholder.com/200' },
  { name: 'B Complex Tablet', link: 'https://www.1mg.com/drugs/b-complex', composition: 'B Complex', manufacturer: 'Cipla', letter: 'B', uses: 'Energy, metabolism', side_effects: 'None', prescriptionRequired: false, price: '₹45', image_url: 'https://via.placeholder.com/200' },

  // Calcium
  { name: 'Calcium Carbonate', link: 'https://www.1mg.com/drugs/calcium', composition: 'Calcium 500mg', manufacturer: 'Merck', letter: 'C', uses: 'Bone health, osteoporosis', side_effects: 'Constipation', prescriptionRequired: false, price: '₹75', image_url: 'https://via.placeholder.com/200' },

  // Cholesterol
  { name: 'Atorvastatin', link: 'https://www.1mg.com/drugs/atorvastatin', composition: 'Atorvastatin 10mg', manufacturer: 'Cipla', letter: 'A', uses: 'High cholesterol', side_effects: 'Muscle pain', prescriptionRequired: true, price: '₹62', image_url: 'https://via.placeholder.com/200' },

  // Diabetes
  { name: 'Metformin', link: 'https://www.1mg.com/drugs/metformin', composition: 'Metformin 500mg', manufacturer: 'Lupin', letter: 'M', uses: 'Type 2 diabetes', side_effects: 'GI upset, vitamin B12 deficiency', prescriptionRequired: true, price: '₹48', image_url: 'https://via.placeholder.com/200' },
  { name: 'Glibenclamide', link: 'https://www.1mg.com/drugs/glibenclamide', composition: 'Glibenclamide 5mg', manufacturer: 'Cipla', letter: 'G', uses: 'Type 2 diabetes', side_effects: 'Hypoglycemia', prescriptionRequired: true, price: '₹35', image_url: 'https://via.placeholder.com/200' },

  // Digestion
  { name: 'Omeprazole', link: 'https://www.1mg.com/drugs/omeprazole', composition: 'Omeprazole 20mg', manufacturer: 'Cipla', letter: 'O', uses: 'GERD, ulcers', side_effects: 'Headache, diarrhea', prescriptionRequired: false, price: '₹85', image_url: 'https://via.placeholder.com/200' },
  { name: 'Domperidone', link: 'https://www.1mg.com/drugs/domperidone', composition: 'Domperidone 10mg', manufacturer: 'Cipla', letter: 'D', uses: 'Nausea, vomiting', side_effects: 'Headache', prescriptionRequired: false, price: '₹42', image_url: 'https://via.placeholder.com/200' },

  // ENT
  { name: 'Levocetirizine', link: 'https://www.1mg.com/drugs/levocetirizine', composition: 'Levocetirizine 5mg', manufacturer: 'Cipla', letter: 'L', uses: 'Allergies, itching', side_effects: 'Drowsiness', prescriptionRequired: false, price: '₹38', image_url: 'https://via.placeholder.com/200' },

  // Heart & BP
  { name: 'Amlodipine', link: 'https://www.1mg.com/drugs/amlodipine', composition: 'Amlodipine 5mg', manufacturer: 'Cipla', letter: 'A', uses: 'High blood pressure', side_effects: 'Headache, swelling', prescriptionRequired: true, price: '₹58', image_url: 'https://via.placeholder.com/200' },
  { name: 'Lisinopril', link: 'https://www.1mg.com/drugs/lisinopril', composition: 'Lisinopril 10mg', manufacturer: 'Lupin', letter: 'L', uses: 'High blood pressure, heart failure', side_effects: 'Dry cough', prescriptionRequired: true, price: '₹65', image_url: 'https://via.placeholder.com/200' },

  // Iron
  { name: 'Ferrous Sulfate', link: 'https://www.1mg.com/drugs/ferrous-sulfate', composition: 'Iron 325mg', manufacturer: 'Merck', letter: 'F', uses: 'Anemia, iron deficiency', side_effects: 'Black stools, constipation', prescriptionRequired: false, price: '₹42', image_url: 'https://via.placeholder.com/200' },

  // Iodine
  { name: 'Potassium Iodide', link: 'https://www.1mg.com/drugs/potassium-iodide', composition: 'Iodine 150mcg', manufacturer: 'Cipla', letter: 'P', uses: 'Iodine deficiency', side_effects: 'None', prescriptionRequired: false, price: '₹55', image_url: 'https://via.placeholder.com/200' },

  // Pain Relief
  { name: 'Ibuprofen', link: 'https://www.1mg.com/drugs/ibuprofen', composition: 'Ibuprofen 400mg', manufacturer: 'Cipla', letter: 'I', uses: 'Pain, inflammation, fever', side_effects: 'Stomach upset', prescriptionRequired: false, price: '₹35', image_url: 'https://via.placeholder.com/200' },
  { name: 'Naproxen', link: 'https://www.1mg.com/drugs/naproxen', composition: 'Naproxen 250mg', manufacturer: 'Cipla', letter: 'N', uses: 'Pain, inflammation', side_effects: 'GI bleeding', prescriptionRequired: false, price: '₹48', image_url: 'https://via.placeholder.com/200' },

  // Thyroid
  { name: 'Levothyroxine', link: 'https://www.1mg.com/drugs/levothyroxine', composition: 'Levothyroxine 50mcg', manufacturer: 'Lupin', letter: 'L', uses: 'Hypothyroidism', side_effects: 'None', prescriptionRequired: true, price: '₹75', image_url: 'https://via.placeholder.com/200' },

  // Anti-hypertensives
  { name: 'Atenolol', link: 'https://www.1mg.com/drugs/atenolol', composition: 'Atenolol 50mg', manufacturer: 'Cipla', letter: 'A', uses: 'High blood pressure, heart conditions', side_effects: 'Fatigue, dizziness', prescriptionRequired: true, price: '₹52', image_url: 'https://via.placeholder.com/200' },

  // Cough & Cold
  { name: 'Cough Syrup', link: 'https://www.1mg.com/drugs/cough-syrup', composition: 'DXM + Guaifenesin', manufacturer: 'Baidyanath', letter: 'C', uses: 'Cough, cold', side_effects: 'None', prescriptionRequired: false, price: '₹98', image_url: 'https://via.placeholder.com/200' },

  // Dermatology
  { name: 'Hydrocortisone Cream', link: 'https://www.1mg.com/drugs/hydrocortisone', composition: 'Hydrocortisone 1%', manufacturer: 'Cipla', letter: 'H', uses: 'Skin inflammation', side_effects: 'Skin thinning with prolonged use', prescriptionRequired: false, price: '₹120', image_url: 'https://via.placeholder.com/200' },

  // Respiratory
  { name: 'Salbutamol Inhaler', link: 'https://www.1mg.com/drugs/salbutamol', composition: 'Salbutamol 100mcg', manufacturer: 'GlaxoSmithKline', letter: 'S', uses: 'Asthma, COPD', side_effects: 'Tremor, palpitations', prescriptionRequired: true, price: '₹185', image_url: 'https://via.placeholder.com/200' },

  // Sleep
  { name: 'Melatonin', link: 'https://www.1mg.com/drugs/melatonin', composition: 'Melatonin 3mg', manufacturer: 'Cipla', letter: 'M', uses: 'Insomnia, sleep disorder', side_effects: 'Drowsiness', prescriptionRequired: false, price: '₹145', image_url: 'https://via.placeholder.com/200' },
];

async function seedDatabase() {
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

    // Insert sample medicines
    const result = await Medicine.insertMany(sampleMedicines);
    console.log(`✅ Seeded ${result.length} medicines into database`);

    // Display summary
    const count = await Medicine.countDocuments();
    console.log(`📊 Total medicines in database: ${count}`);

    // Get breakdown by letter
    const byLetter = await Medicine.aggregate([
      { $group: { _id: '$letter', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📋 Medicines by starting letter:');
    byLetter.forEach(item => {
      console.log(`   ${item._id}: ${item.count} medicines`);
    });

    // Get Rx vs OTC breakdown
    const rxCount = await Medicine.countDocuments({ prescriptionRequired: true });
    const otcCount = await Medicine.countDocuments({ prescriptionRequired: false });
    console.log(`\n💊 Prescription vs OTC:`);
    console.log(`   Requires Prescription (Rx): ${rxCount}`);
    console.log(`   Over-the-Counter (OTC): ${otcCount}`);

    mongoose.connection.close();
    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
