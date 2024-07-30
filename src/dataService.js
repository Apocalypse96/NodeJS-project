const fetch = require('node-fetch'); // Ensure node-fetch is installed

/**
 * Fetches data from the API.
 * @async
 * @function
 * @returns {Promise<Object[]>} - A promise that resolves to an array of data objects.
 * @throws {Error} - Throws an error if the fetch fails or the data is not an array.
 */
const fetchData = async () => {
  try {
    const apiUrl = 'http://microsoftedge.github.io/Demos/json-dummy-data/256KB.json'; 
    const response = await fetch(apiUrl, { timeout: 5000 }); // Set timeout for fetch request

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error('Error parsing JSON data');
    }

    if (!Array.isArray(data)) {
      throw new Error('Fetched data is not an array');
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

/**
 * Filters and sorts the data based on the provided criteria.
 * @function
 * @param {Object[]} data - The array of data objects to filter and sort.
 * @param {Object} criteria - The filter and sort criteria.
 * @param {string} [criteria.filter] - The filter condition in the format 'key:value'.
 * @param {string} [criteria.sort] - The sort condition in the format 'key:order' where order is 'asc' or 'desc'.
 * @returns {Object[]} - The filtered and sorted array of data objects.
 * @throws {Error} - Throws an error if the data is not an array, the filter or sort format is invalid, or the key does not exist in the data.
 */
const filterAndSortData = (data, { filter, sort }) => {
  if (!Array.isArray(data)) {
    throw new Error('Data is not an array');
  }

  let filteredData = [...data];

  // Handle filtering
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

  // Handle sorting
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
