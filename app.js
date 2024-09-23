require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const connection = require('./config/db'); 
const routers = require('./src/routers/index');
dotenv.config();

const app = express();
app.use(express.json());
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routers);



connection.query('SELECT 1') 
  .then(([results, fields]) => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
      console.log('Database connected successfully');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.stack);
  });