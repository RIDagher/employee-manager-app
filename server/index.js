const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Establish database connection
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello world!' });
});

app.listen(PORT, () => {
  console.log(`Server is up and running ${PORT}`);
});

//
