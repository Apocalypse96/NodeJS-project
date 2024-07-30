const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const logger = require('./utils/logger');
const config = require('./config/config');

const app = express();

app.use(express.json());

app.use('/api/data', dataRoutes);

app.use((err, req, res, next) => {
  logger.error('Global error handler: ' + err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

module.exports = app;