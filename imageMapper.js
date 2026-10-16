const fs = require('fs');
const path = require('path');

// This will map bird names to actual file names
class ImageMapper {
    constructor() {
        this.imageCache = new Map();
        this.trainPath = path.join(__dirname, 'dataset', 'train_images');
        this.validPath = path.join(__dirname, 'dataset', 'valid_images');
        this.initializeCache();
    }

    initializeCache() {
        console.log('🔄 Initializing image cache...');
        
        // Read all files from both directories
        const trainFiles = fs.existsSync(this.trainPath) ? fs.readdirSync(this.trainPath) : [];
        const validFiles = fs.existsSync(this.validPath) ? fs.readdirSync(this.validPath) : [];
        
        const allFiles = [...trainFiles, ...validFiles];
        
        // Create mapping based on bird names
        allFiles.forEach(filename => {
            const birdName = this.extractBirdName(filename);
            if (birdName && !this.imageCache.has(birdName)) {
                this.imageCache.set(birdName, filename);
            }
        });
        
        console.log(`✅ Image cache initialized with ${this.imageCache.size} mappings`);
    }

    extractBirdName(filename) {
        // Remove file extension and numbers to get bird name
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
        
        // Remove trailing numbers and underscores
        const cleanName = nameWithoutExt
            .replace(/_\d+$/, "")  // Remove _0001, _0002, etc.
            .replace(/_/g, " ")    // Replace underscores with spaces
            .trim();
        
        return cleanName;
    }

    findImageForBird(birdName) {
        const searchName = birdName.toLowerCase().replace(/\s+/g, " ");
        
        // Try exact match first
        for (let [cachedName, filename] of this.imageCache.entries()) {
            if (cachedName.toLowerCase() === searchName) {
                return this.getFullPath(filename);
            }
        }
        
        // Try partial match
        for (let [cachedName, filename] of this.imageCache.entries()) {
            if (cachedName.toLowerCase().includes(searchName) || 
                searchName.includes(cachedName.toLowerCase())) {
                return this.getFullPath(filename);
            }
        }
        
        return null;
    }

    getFullPath(filename) {
        // Check which folder contains the file
        if (fs.existsSync(path.join(this.trainPath, filename))) {
            return `/train_images/${filename}`;
        }
        if (fs.existsSync(path.join(this.validPath, filename))) {
            return `/valid_images/${filename}`;
        }
        return null;
    }

    // Debug function to see all mappings
    debugMappings() {
        console.log('\n📋 Current Image Mappings:');
        this.imageCache.forEach((filename, birdName) => {
            console.log(`  ${birdName} -> ${filename}`);
        });
    }
}

module.exports = ImageMapper;