# BirdBase Pro – Advanced Bird Identification Platform

BirdBase Pro is a web application built to make bird identification and bird information easier to access. Users can browse different bird species, search using their characteristics, view detailed information, and upload bird images for AI-based identification.

I developed this project as part of my MCA coursework at VIT Chennai. The main idea was to combine web development, MongoDB, data structures and algorithms, and image classification in one application.

## Features

- **Bird Search:** Search for bird species by name and find relevant results.
- **AI Identification:** Upload a bird image to get a species prediction using TensorFlow.js.
- **Browse Birds:** Explore bird species and view their details.
- **Advanced Filters:** Filter birds using attributes such as size, color, and habitat.
- **Image Annotations:** Display bounding boxes using information from XML annotation files.
- **Bird Information:** Store and retrieve species details and other attributes from MongoDB.
- **DSA Implementation:** Use A* search, Union-Find, and a priority queue for search and categorization tasks.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **AI:** TensorFlow.js
- **Data Processing:** JavaScript, XML parsing with `xml2js`

## Dataset

The project uses the CUB-200-2011 bird dataset, which contains 200 bird species and 11,787 images with annotations.

The dataset is not included in this repository because of its size. You will need to download it separately and place the files in the expected folders before importing the data.

Expected structure:

```text
dataset/
├── train_images/
├── train_labels/
├── valid_images/
└── valid_labels/
```

Dataset source: [CUB-200-2011](https://www.vision.caltech.edu/datasets/cub_200_2011/)

## Project Structure

```text
bird-finder/
├── public/              # Frontend pages and assets
├── server.js            # Main server
├── importData.js        # Dataset import script
├── imageMapper.js       # Image path mapping
├── enhanceData.js       # Bird attribute processing
├── checkBirds.js        # Database checking script
├── package.json         # Project dependencies
├── package-lock.json
├── .gitignore
└── README.md
```

## Running the Project Locally

### Requirements

- Node.js and npm
- MongoDB Community Server

### 1. Clone the repository

```bash
git clone https://github.com/abhayverma2025-ship-it/BirdBase-Pro-Advanced-Bird-Identification-Platform.git
cd BirdBase-Pro-Advanced-Bird-Identification-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start MongoDB

Make sure your local MongoDB server is running. The application is configured to use:

```text
mongodb://localhost:27017/birddb
```

### 4. Import the bird data

After placing the dataset in the correct folders, run:

```bash
npm run import
```

### 5. Start the server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Algorithms Used

**A* Search:** Used for ranking bird search results based on name similarity and matching attributes.

**Union-Find:** Used to group species that share selected characteristics.

**Priority Queue:** Used to manage the order of candidate results during search operations.

## Future Improvements

- Improve identification accuracy with a bird-specific model.
- Add bird sound recognition.
- Include maps for bird sightings and habitats.
- Allow users to save favorite species and sightings.

## Author

**Abhay Verma**  
MCA, Vellore Institute of Technology, Chennai

---

This project was developed to explore how web technologies, databases, algorithms, and AI can work together in a practical bird identification application.
