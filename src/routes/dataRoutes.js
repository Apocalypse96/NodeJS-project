const express = require('express');
const router = express.Router();
const { fetchData, filterAndSortData } = require('../services/dataService');
const logger = require('../utils/logger');
const { query, validationResult } = require('express-validator');

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

router.get('/', validateRequest, async (req, res) => {
  try {
    const data = await fetchData();
    const { sort, filter } = req.query;

    const filteredAndSortedData = filterAndSortData(data, { sort, filter });

    if (filteredAndSortedData.length === 0) {
      return res.status(404).json({ error: 'No data found for the given filter.' });
    }

    res.json(filteredAndSortedData);
  } catch (error) {
    logger.error('Error handling request: ' + error.message);

    let statusCode = 500;
    if (error.message.includes('reading data')) {
      statusCode = 500; // Internal Server Error if reading data fails
    } else if (error.message.includes('sort order')) {
      statusCode = 400; // Bad Request if sort order is invalid
    } else if (error.message.includes('Data is not an array')) {
      statusCode = 500; // Internal Server Error if data is not an array
    }

    res.status(statusCode).json({ error: error.message });
  }
});

module.exports = router;