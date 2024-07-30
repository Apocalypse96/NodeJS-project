const express = require('express');
const dataRoutes = require('./src/routes/dataRoutes');
const logger = require('./src/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Global error handler: ' + err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

/**
 * Start the server
 * @function
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
