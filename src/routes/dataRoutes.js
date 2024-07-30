const express = require('express');
const router = express.Router();
const { fetchData, filterAndSortData } = require('../dataService');
const logger = require('../logger');
const { query, validationResult } = require('express-validator');

/**
 * Middleware to validate and sanitize query parameters.
 * @function
 */
const validateRequest = [
  query('sort').optional().isString().trim().escape(),
  query('filter').optional().isString().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * GET endpoint to fetch, filter, and sort data.
 * @name GET/
 * @function
 * @memberof module:router~router
 * @inner
 * @param {string} [sort] - Sort criteria in the format 'key:order'.
 * @param {string} [filter] - Filter criteria in the format 'key:value'.
 * @returns {Object[]} - The filtered and sorted data.
 * @throws {Error} - Throws an error if the fetch fails or the data is not an array.
 */
router.get('/', validateRequest, async (req, res) => {
  try {
    const data = await fetchData();
    const { sort, filter } = req.query;

    // Filter and sort data
    const filteredAndSortedData = filterAndSortData(data, { sort, filter });

    // Check if filtered data is empty
    if (filteredAndSortedData.length === 0) {
      return res.status(404).json({ error: 'No data found for the given filter. Try adding valid data.' });
    }

    res.json(filteredAndSortedData);
  } catch (error) {
    logger.error('Error handling request: ' + error.message);

    let statusCode = 500;
    if (error.message.includes('fetch')) {
      statusCode = 502; // Bad Gateway if fetching data fails
    } else if (error.message.includes('sort order')) {
      statusCode = 400; // Bad Request if sort order is invalid
    } else if (error.message.includes('Data is not an array')) {
      statusCode = 500; // Internal Server Error if data is not an array
    }

    res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;
