const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const config = require('../src/config/config');

const dataFilePath = path.join(__dirname, '../data/dummyData.json');

async function initializeData() {
  try {
    console.log('Fetching data from API...');
    const response = await fetch(config.DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    console.log('Writing data to file...');
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));

    console.log('Data initialization complete.');
  } catch (error) {
    console.error('Error initializing data:', error.message);
    process.exit(1);
  }
}

initializeData();