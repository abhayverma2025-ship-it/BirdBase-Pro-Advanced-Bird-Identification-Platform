const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://localhost:27017/birddb";

mongoose.connect(MONGODB_URI);

const Bird = mongoose.model('Bird', new mongoose.Schema({
  scientificName: String,
  commonName: String
}));

async function checkBirds() {
  console.log('Checking birds in database...\n');
  
  const birds = await Bird.find().sort({ commonName: 1 }).limit(20);
  
  console.log('First 20 birds in your database:');
  console.log('================================');
  
  birds.forEach((bird, index) => {
    console.log(`${index + 1}. "${bird.commonName}"`);
  });
  
  console.log('\nTotal birds in database:', await Bird.countDocuments());
  
  mongoose.connection.close();
}

checkBirds().catch(console.error);