// const mongoose = require('mongoose');
// const MONGODB_URI = "mongodb://localhost:27017/birddb";

// mongoose.connect(MONGODB_URI);

// const Bird = mongoose.model('Bird', new mongoose.Schema({
//   scientificName: String,
//   commonName: String,
//   attributes: Object
// }));

// async function enhanceAllBirds() {
//   console.log('Adding basic attributes to all birds...\n');
  
//   const allBirds = await Bird.find();
//   let enhancedCount = 0;

//   for (const bird of allBirds) {
//     // Create basic attributes based on bird name patterns
//     const basicAttributes = {
//       size: "medium", // Default size
//       primaryColors: ["brown"], // Default color
//       habitat: ["forest"], // Default habitat
//       diet: ["insects"], // Default diet
//       distinctiveFeatures: ["common bird"]
//     };

//     const result = await Bird.updateOne(
//       { _id: bird._id },
//       { $set: { attributes: basicAttributes } }
//     );
    
//     if (result.modifiedCount > 0) {
//       enhancedCount++;
//       if (enhancedCount <= 10) {
//         console.log(`✅ Enhanced: ${bird.commonName}`);
//       }
//     }
//   }
  
//   console.log(`\n🎉 Enhanced ${enhancedCount} birds with basic attributes!`);
//   console.log(`All birds now have attributes for smart search`);
  
//   mongoose.connection.close();
// }

// enhanceAllBirds().catch(console.error);