const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://Maxime:6BrL9iCWKzeGO8ky@cluster0.m9mpdo7.mongodb.net/tickethack'

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
