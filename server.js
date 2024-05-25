/**
 * Express.js server to fetch and serve NVIDIA stock data.
 * 
 * This server uses Axios to fetch historical stock data for NVIDIA from Yahoo Finance
 * and serves it through a REST API endpoint. The data is filtered and formatted before
 * being sent to the client.
 */

const express = require('express'); // Import Express.js framework
const axios = require('axios'); // Import Axios for making HTTP requests
const cors = require('cors'); // Import CORS middleware
const app = express(); // Initialize an Express application

app.use(cors()); // Enable CORS for all incoming requests

/**
 * GET /nvidia-stock
 * 
 * Fetches historical stock data for NVIDIA from Yahoo Finance and returns it in JSON format.
 * 
 * @returns {Object[]} Array of stock data objects
 * @returns {string} return[].date - Date of the stock data
 * @returns {string} return[].open - Opening price
 * @returns {string} return[].high - Highest price
 * @returns {string} return[].low - Lowest price
 * @returns {string} return[].close - Closing price
 * @returns {string} return[].adjClose - Adjusted closing price
 * @returns {string} return[].volume - Trading volume
 */
app.get('/nvidia-stock', async (req, res) => {
  try {
    // Fetch stock data from Yahoo Finance
    const response = await axios.get('https://query1.finance.yahoo.com/v7/finance/download/NVDA?period1=0&period2=9999999999&interval=1d&events=history');
    
    // Split the response data by newline to get individual records
    const lines = response.data.split('\n');
    
    // Process each line to extract stock data fields
    const result = lines.slice(1).map(line => {
      const [date, open, high, low, close, adjClose, volume] = line.split(',');
      return { date, open, high, low, close, adjClose, volume };
    });
    
    // Send the processed stock data as JSON
    res.json(result);
  } catch (error) {
    // Handle errors and send a 500 response
    res.status(500).send('Error fetching stock data');
  }
});

/**
 * Start the server and listen on port 3000
 */
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
