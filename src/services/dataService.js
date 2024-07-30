const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
const config = require('../config/config');

const dataFilePath = path.join(__dirname, '../../data/dummyData.json');

const fetchData = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading data: ${error.message}`);
  }
};

const filterAndSortData = (data, { filter, sort }) => {
  if (!Array.isArray(data)) {
    throw new Error('Data is not an array');
  }

  let filteredData = [...data];

  if (filter) {
    const [key, value] = filter.split(':');
    if (!key || !value) {
      throw new Error('Invalid filter format. Use key:value');
    }
    filteredData = filteredData.filter(item => {
      if (!item.hasOwnProperty(key)) {
        throw new Error(`Filter key "${key}" does not exist in data`);
      }
      return item[key] && item[key].toLowerCase() === value.toLowerCase();
    });
  }


  if (sort) {
    const [key, order] = sort.split(':');
    if (!key || !order) {
      throw new Error('Invalid sort format. Use key:order (asc or desc)');
    }
    if (order !== 'asc' && order !== 'desc') {
      throw new Error('Invalid sort order. Use "asc" or "desc"');
    }
    filteredData.sort((a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        throw new Error(`Sort key "${key}" does not exist in data`);
      }
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filteredData;
};

module.exports = { fetchData, filterAndSortData };