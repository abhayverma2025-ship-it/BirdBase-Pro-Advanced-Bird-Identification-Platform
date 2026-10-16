const mongoose = require('mongoose');
const { parseString } = require('xml2js');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = "mongodb://localhost:27017/birddb";

const Bird = mongoose.model('Bird', new mongoose.Schema({
  scientificName: { type: String, required: true },
  commonName: { type: String, required: true }
}));

const Image = mongoose.model('Image', new mongoose.Schema({
  filename: String,
  path: String,
  bird: { type: mongoose.Schema.Types.ObjectId, ref: 'Bird' },
  annotation: {
    xmin: Number, ymin: Number, xmax: Number, ymax: Number
  }
}));

// Helper function to parse XML with promises
function parseXML(xmlData) {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Improved function to find matching image file
function findMatchingImageFile(xmlFilename, imageFiles) {
  // Remove .xml extension from XML filename
  const baseName = xmlFilename.replace('.xml', '');
  
  // Try exact match first
  if (imageFiles.includes(baseName + '.jpg')) return baseName + '.jpg';
  if (imageFiles.includes(baseName + '.JPG')) return baseName + '.JPG';
  if (imageFiles.includes(baseName + '.jpeg')) return baseName + '.jpeg';
  if (imageFiles.includes(baseName + '.JPEG')) return baseName + '.JPEG';
  if (imageFiles.includes(baseName + '.png')) return baseName + '.png';
  if (imageFiles.includes(baseName + '.PNG')) return baseName + '.PNG';
  
  // Try matching without any extension (some datasets have no extensions)
  if (imageFiles.includes(baseName)) return baseName;
  
  // Try case-insensitive matching
  const lowerBase = baseName.toLowerCase();
  for (const imageFile of imageFiles) {
    const imageBase = imageFile.split('.')[0].toLowerCase();
    if (imageBase === lowerBase) {
      return imageFile;
    }
  }
  
  return null;
}

async function importData() {
  console.log('Starting Complete Bird Data Import');
  console.log('This will import all available images with proper matching');
  
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB Connected for Data Import');

  const datasets = [
    { name: 'train', images: 'train_images', labels: 'train_labels' },
    { name: 'valid', images: 'valid_images', labels: 'valid_labels' }
  ];

  let totalBirds = 0;
  let totalImages = 0;
  let skippedFiles = 0;
  let processedBirds = new Set();

  for (const dataset of datasets) {
    console.log('\n=== Processing ' + dataset.name.toUpperCase() + ' dataset ===');
    
    const labelsPath = path.join(__dirname, 'dataset', dataset.labels);
    const imagesPath = path.join(__dirname, 'dataset', dataset.images);
    
    if (!fs.existsSync(labelsPath)) {
      console.log('ERROR: Labels folder not found: ' + labelsPath);
      continue;
    }

    if (!fs.existsSync(imagesPath)) {
      console.log('ERROR: Images folder not found: ' + imagesPath);
      continue;
    }

    // Get all XML files and image files
    const allFiles = fs.readdirSync(labelsPath);
    const xmlFiles = allFiles.filter(file => file.endsWith('.xml'));
    const imageFiles = fs.readdirSync(imagesPath);

    console.log('Found ' + xmlFiles.length + ' XML files in ' + dataset.labels);
    console.log('Found ' + imageFiles.length + ' image files in ' + dataset.images);

    // Create a mapping of base filenames to actual image files
    const imageMap = new Map();
    imageFiles.forEach(imgFile => {
      const baseName = imgFile.split('.')[0]; // Remove extension
      imageMap.set(baseName.toLowerCase(), imgFile);
    });

    console.log('Created image mapping with ' + imageMap.size + ' entries');

    let datasetImages = 0;
    let datasetSkipped = 0;

    // Process ALL XML files
    for (const xmlFile of xmlFiles) {
      const filePath = path.join(labelsPath, xmlFile);
      
      try {
        const xmlData = fs.readFileSync(filePath, 'utf8');
        const result = await parseXML(xmlData);
        
        const annotation = result.annotation;
        const birdName = annotation.object[0].name[0];
        
        const bndbox = annotation.object[0].bndbox[0];
        const xmin = parseInt(bndbox.xmin[0]);
        const ymin = parseInt(bndbox.ymin[0]);
        const xmax = parseInt(bndbox.xmax[0]);
        const ymax = parseInt(bndbox.ymax[0]);

        // Get the expected filename from XML
        let expectedFilename = annotation.filename[0];
        // Remove .jpg extension if present (XML often has it but actual files might not)
        expectedFilename = expectedFilename.replace('.jpg', '');

        // Create or find bird in database
        let bird = await Bird.findOne({ scientificName: birdName });
        if (!bird) {
          bird = new Bird({ 
            scientificName: birdName, 
            commonName: birdName 
          });
          await bird.save();
          processedBirds.add(birdName);
          console.log('✓ New bird: ' + birdName);
        }

        // Check if image already exists in database
        const existingImage = await Image.findOne({ filename: expectedFilename, bird: bird._id });
        if (existingImage) {
          continue; // Skip if already imported
        }

        // Find matching image file using our mapping
        const baseName = expectedFilename.toLowerCase();
        const actualImageFile = imageMap.get(baseName);

        if (!actualImageFile) {
          console.log('✗ No image found for: ' + expectedFilename);
          datasetSkipped++;
          skippedFiles++;
          continue;
        }

        // Use correct path for web serving
        const imagePath = '/' + dataset.images + '/' + actualImageFile;
        
        const image = new Image({
          filename: expectedFilename,
          path: imagePath,
          bird: bird._id,
          annotation: { xmin, ymin, xmax, ymax }
        });

        await image.save();
        datasetImages++;
        totalImages++;
        
        // Show progress for every 100 files
        if (datasetImages % 100 === 0) {
          console.log('  Progress: ' + datasetImages + ' images imported...');
        }

      } catch (error) {
        console.log('ERROR processing ' + xmlFile + ': ' + error.message);
        datasetSkipped++;
        skippedFiles++;
      }
    }

    console.log('✓ ' + dataset.name + ' dataset: ' + datasetImages + ' images imported, ' + datasetSkipped + ' skipped');
  }

  totalBirds = processedBirds.size;
  
  console.log('\n=== IMPORT COMPLETE ===');
  console.log('Total Birds: ' + totalBirds + ' species');
  console.log('Total Images: ' + totalImages + ' successfully imported');
  console.log('Skipped Files: ' + skippedFiles + ' (no matching image found)');
  console.log('Success Rate: ' + Math.round((totalImages / (totalImages + skippedFiles)) * 100) + '%');
  
  // Show some imported birds as examples
  const sampleBirds = Array.from(processedBirds).slice(0, 5);
  console.log('Sample imported birds: ' + sampleBirds.join(', '));
  
  await mongoose.connection.close();
  console.log('Database connection closed.');
}

// Run the import
importData().catch(console.error);