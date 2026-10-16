const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const ImageMapper = require('./imageMapper'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve static files from dataset folders with better error handling
app.use('/train_images', express.static(path.join(__dirname, 'dataset', 'train_images'), {
    fallthrough: false,
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=3600');
    }
}));

app.use('/valid_images', express.static(path.join(__dirname, 'dataset', 'valid_images'), {
    fallthrough: false,
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=3600');
    }
}));

app.use('/train_labels', express.static(path.join(__dirname, 'dataset', 'train_labels')));
app.use('/valid_labels', express.static(path.join(__dirname, 'dataset', 'valid_labels')));

// MongoDB Connection
const MONGODB_URI = "mongodb://localhost:27017/birddb";
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// ADD THIS SECTION - Image Mapper Initialization
const imageMapper = new ImageMapper();

// Database Models
const birdSchema = new mongoose.Schema({
  scientificName: { type: String, required: true },
  commonName: { type: String, required: true },
  family: String,
  order: String,
  conservationStatus: String,
  attributes: {
    size: { type: String, enum: ['very small', 'small', 'medium', 'large', 'very large'] },
    primaryColors: [String],
    habitat: [String],
    diet: [String],
    distinctiveFeatures: [String]
  },
  length: String,
  wingspan: String,
  weight: String
});

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  bird: { type: mongoose.Schema.Types.ObjectId, ref: 'Bird' },
  annotation: {
    xmin: Number, ymin: Number, xmax: Number, ymax: Number
  }
});

const Bird = mongoose.model('Bird', birdSchema);
const Image = mongoose.model('Image', imageSchema);

// ==================== DSA ALGORITHMS IMPLEMENTATION ====================

// ALGORITHM 1: A* SEARCH ALGORITHM
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(item, priority) {
        this.heap.push({ item, priority });
        this.heap.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.heap.shift().item;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}
class AStarSearch {
    constructor() {
        this.openSet = new PriorityQueue();
    }

    // Heuristic function - bird name similarity
    heuristic(bird, query) {
        if (!query) return 50;
        
        const name = bird.commonName.toLowerCase();
        const searchQuery = query.toLowerCase();    
        const exactMatch = name === searchQuery ? 100 : 0;
        const startsWith = name.startsWith(searchQuery) ? 50 : 0;
        const contains = name.includes(searchQuery) ? 25 : 0;
        const lengthSimilarity = 1 / (1 + Math.abs(name.length - searchQuery.length));
        return exactMatch + startsWith + contains + (lengthSimilarity * 10);
    }
    // Cost function - attribute matching
    cost(bird, filters) {
        let cost = 0;
        if (filters.size && bird.attributes && bird.attributes.size !== filters.size) {
            cost += 10;
        }
        if (filters.colors && filters.colors.length > 0 && bird.attributes) {
            const colorMatches = filters.colors.filter(color => 
                bird.attributes.primaryColors.includes(color)
            ).length;
            cost += (filters.colors.length - colorMatches) * 5;
        }       
        return cost;
    }

    // A* search implementation
    search(birds, query, filters = {}) {
        const results = [];
        birds.forEach((bird, index) => {
            const g = this.cost(bird, filters);
            const h = this.heuristic(bird, query);
            const f = g + h;
            const relevanceScore = 100 - Math.min(f, 100);
            results.push({
                bird: bird,
                relevance: Math.max(0, relevanceScore),
                heuristic: h,
                cost: g,
                fScore: f,
                rank: index
            });
        });

        return results.sort((a, b) => {
            if (b.relevance !== a.relevance) return b.relevance - a.relevance;
            return a.rank - b.rank;
        }).slice(0, 10);
    }
}

// ALGORITHM 2: UNION-FIND ALGORITHM
class UnionFind {
    constructor(size) {
        this.parent = new Array(size);
        this.rank = new Array(size);
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
            return true;
        }
        return false;
    }
}

// Helper functions for Union-Find
function shouldUnion(birdA, birdB) {
    if (!birdA.attributes || !birdB.attributes) return false;
    
    let commonCount = 0;
    
    if (birdA.attributes.size === birdB.attributes.size) commonCount++;
    
    if (birdA.attributes.primaryColors && birdB.attributes.primaryColors) {
        const commonColors = birdA.attributes.primaryColors.filter(color =>
            birdB.attributes.primaryColors.includes(color)
        );
        if (commonColors.length > 0) commonCount++;
    }
    
    if (birdA.attributes.habitat && birdB.attributes.habitat) {
        const commonHabitat = birdA.attributes.habitat.filter(habitat =>
            birdB.attributes.habitat.includes(habitat)
        );
        if (commonHabitat.length > 0) commonCount++;
    }
    
    return commonCount >= 2;
}

function findCommonAttributes(birdList) {
    if (!birdList || birdList.length === 0) return {};
    
    const common = {
        sizes: new Set(),
        colors: new Set(),
        habitats: new Set()
    };
    
    birdList.forEach(bird => {
        if (bird.attributes) {
            if (bird.attributes.size) common.sizes.add(bird.attributes.size);
            if (bird.attributes.primaryColors) {
                bird.attributes.primaryColors.forEach(color => common.colors.add(color));
            }
            if (bird.attributes.habitat) {
                bird.attributes.habitat.forEach(habitat => common.habitats.add(habitat));
            }
        }
    });
    
    return {
        sizes: Array.from(common.sizes),
        colors: Array.from(common.colors),
        habitats: Array.from(common.habitats)
    };
}

// ==================== API ROUTES ====================
app.get('/api/birds', async (req, res) => {
  try {
    const birds = await Bird.find().sort({ commonName: 1 });
    res.json(birds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bird/:id', async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    const images = await Image.find({ bird: req.params.id });
    res.json({ bird, images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const birdCount = await Bird.countDocuments();
    const imageCount = await Image.countDocuments();
    res.json({ birds: birdCount, images: imageCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const birds = await Bird.find({
      $or: [
        { commonName: { $regex: query, $options: 'i' } },
        { scientificName: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(birds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== API ROUTES ====================
app.get('/api/birds', async (req, res) => {
  // ... your existing birds endpoint ...
});

// ADD THESE NEW ENDPOINTS:

// Get birds with proper image paths
app.get('/api/birds-with-images', async (req, res) => {
    try {
        const birds = await Bird.find().sort({ commonName: 1 });
        
        const birdsWithImages = birds.map(bird => {
            const imagePath = imageMapper.findImageForBird(bird.commonName);
            return {
                ...bird.toObject(),
                imagePath: imagePath || '/images/placeholder-bird.svg'
            };
        });
        
        res.json(birdsWithImages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Debug endpoint to check image files for a specific bird
app.get('/api/debug-bird-images/:birdName', (req, res) => {
    const birdName = req.params.birdName;
    
    const trainPath = path.join(__dirname, 'dataset', 'train_images');
    const validPath = path.join(__dirname, 'dataset', 'valid_images');
    
    try {
        const trainFiles = fs.existsSync(trainPath) ? fs.readdirSync(trainPath) : [];
        const validFiles = fs.existsSync(validPath) ? fs.readdirSync(validPath) : [];
        
        // Find files that might match this bird
        const searchPattern = birdName.toLowerCase().replace(/\s+/g, '_');
        
        const matchingTrain = trainFiles.filter(file => 
            file.toLowerCase().includes(searchPattern)
        );
        
        const matchingValid = validFiles.filter(file =>
            file.toLowerCase().includes(searchPattern)
        );
        
        // Also try the image mapper
        const mappedPath = imageMapper.findImageForBird(birdName);
        
        res.json({
            birdName,
            searchPattern,
            mappedPath,
            trainImages: matchingTrain,
            validImages: matchingValid,
            allTrainFiles: trainFiles.length,
            allValidFiles: validFiles.length
        });
        
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Smart Search API
app.post('/api/smart-search', async (req, res) => {
  try {
    const { size, colors, habitat, description } = req.body;
    
    let query = {};
    
    if (size) query['attributes.size'] = size;
    if (colors && colors.length > 0) {
      query['$or'] = [
        { 'attributes.primaryColors': { $in: colors } },
        { 'attributes.distinctiveFeatures': { $in: colors } }
      ];
    }
    if (habitat) query['attributes.habitat'] = habitat;
    if (description) {
      const keywords = description.toLowerCase().split(' ');
      query['$or'] = [
        { commonName: { $regex: keywords.join('|'), $options: 'i' } },
        { 'attributes.distinctiveFeatures': { $in: keywords } }
      ];
    }
    
    const birds = await Bird.find(query).limit(20);
    res.json(birds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommendations API
app.get('/api/bird/:id/recommendations', async (req, res) => {
  try {
    const bird = await Bird.findById(req.params.id);
    if (!bird || !bird.attributes) {
      return res.json([]);
    }
    
    const similarBirds = await Bird.find({
      _id: { $ne: bird._id },
      $or: [
        { 'attributes.size': bird.attributes.size },
        { 'attributes.primaryColors': { $in: bird.attributes.primaryColors || [] } },
        { 'attributes.habitat': { $in: bird.attributes.habitat || [] } }
      ]
    }).limit(6);
    
    res.json(similarBirds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== DSA ALGORITHMS API ROUTES ====================

// A* Search Algorithm API
app.get('/api/a-star-search', async (req, res) => {
    try {
        const { query, size, colors } = req.query;
        const allBirds = await Bird.find();
        const aStar = new AStarSearch();
        
        const filters = {
            size: size || '',
            colors: colors ? colors.split(',') : []
        };
        
        const results = aStar.search(allBirds, query, filters);
        
        res.json({
            algorithm: "A* Search Algorithm",
            query: query || 'all birds',
            filters: filters,
            totalResults: results.length,
            results: results.map(r => ({
                bird: r.bird,
                relevance: r.relevance,
                confidence: `${r.relevance}%`,
                explanation: `Heuristic: ${r.heuristic}, Cost: ${r.cost}`
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Union-Find Algorithm API
app.get('/api/bird-categories', async (req, res) => {
    try {
        const birds = await Bird.find();
        const uf = new UnionFind(birds.length);
        
        console.log(`🔄 Union-Find: Processing ${birds.length} birds...`);
        
        let unionsPerformed = 0;
        for (let i = 0; i < birds.length; i++) {
            for (let j = i + 1; j < birds.length; j++) {
                if (shouldUnion(birds[i], birds[j])) {
                    if (uf.union(i, j)) {
                        unionsPerformed++;
                    }
                }
            }
        }

        const categories = new Map();
        for (let i = 0; i < birds.length; i++) {
            const root = uf.find(i);
            if (!categories.has(root)) {
                categories.set(root, []);
            }
            categories.get(root).push(birds[i]);
        }

        const result = Array.from(categories.entries()).map(([root, birdList]) => ({
            categoryId: `category-${root}`,
            size: birdList.length,
            birds: birdList.slice(0, 5),
            commonAttributes: findCommonAttributes(birdList)
        }));

        result.sort((a, b) => b.size - a.size);

        res.json({
            algorithm: "Union-Find (Disjoint Set)",
            totalBirds: birds.length,
            totalCategories: result.length,
            unionsPerformed: unionsPerformed,
            categories: result.slice(0, 10)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Image Debug API
app.get('/api/debug-images/:birdName', async (req, res) => {
    const birdName = req.params.birdName;
    
    try {
        const trainPath = path.join(__dirname, 'dataset', 'train_images');
        const validPath = path.join(__dirname, 'dataset', 'valid_images');
        
        const trainFiles = fs.existsSync(trainPath) ? fs.readdirSync(trainPath) : [];
        const validFiles = fs.existsSync(validPath) ? fs.readdirSync(validPath) : [];
        
        const searchPattern = birdName.toLowerCase().replace(/\s+/g, '_');
        
        const matchingTrain = trainFiles.filter(file => 
            file.toLowerCase().includes(searchPattern)
        );
        
        const matchingValid = validFiles.filter(file =>
            file.toLowerCase().includes(searchPattern)
        );
        
        res.json({
            birdName,
            searchPattern,
            trainImages: matchingTrain.slice(0, 5),
            validImages: matchingValid.slice(0, 5),
            allTrainFiles: trainFiles.length,
            allValidFiles: validFiles.length
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Get actual image paths for a bird
app.get('/api/bird/:id/images', async (req, res) => {
    try {
        const images = await Image.find({ bird: req.params.id });
        const imagePaths = images.map(img => ({
            path: img.path,
            filename: img.filename,
            fullPath: `/train_images/${img.filename}`
        }));
        
        res.json(imagePaths);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Algorithms Demo Page
app.get('/algorithms', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'algorithms.html'));
});

// ==================== PAGE ROUTES ====================
// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// AI Identification Page
app.get('/identify', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'identify.html'));
});

// Advanced Search Page
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// Browse Page
app.get('/browse', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'browse.html'));
});

// Bird Detail Page
app.get('/detail.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

// ==================== DEBUG ROUTES ====================
// Test route to verify server is working
app.get('/test', (req, res) => {
    res.json({ 
        message: 'Server is working!',
        timestamp: new Date().toISOString(),
        routes: ['/', '/identify', '/search', '/browse', '/detail.html', '/algorithms']
    });
});

// Debug route to check file paths
app.get('/debug-files', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    try {
        const files = fs.readdirSync('./public');
        const fileDetails = files.map(file => {
            const filePath = path.join(__dirname, 'public', file);
            return {
                name: file,
                exists: fs.existsSync(filePath),
                path: filePath
            };
        });
        
        res.json({
            publicFolder: path.join(__dirname, 'public'),
            files: fileDetails
        });
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET /api/birds - List all birds`);
  console.log(`   GET /api/bird/:id - Get bird with images`);
  console.log(`   GET /api/stats - Get database statistics`);
  console.log(`   GET /api/search/:query - Search birds by name`);
  console.log(`   POST /api/smart-search - Advanced attribute search`);
  console.log(`   GET /api/bird/:id/recommendations - Get similar birds`);
  console.log(`🎯 DSA ALGORITHMS:`);
  console.log(`   GET /api/a-star-search - A* Search Algorithm`);
  console.log(`   GET /api/bird-categories - Union-Find Algorithm`);
  console.log(`🌐 Pages:`);
  console.log(`   / - Homepage`);
  console.log(`   /identify - AI Bird Identification`);
  console.log(`   /search - Advanced Search`);
  console.log(`   /browse - Browse All Birds`);
  console.log(`   /detail.html - Bird Details`);
  console.log(`   /algorithms - DSA Algorithms Demo`);
});