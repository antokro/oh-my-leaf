const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

try {
  const localConfig = dotenv.parse(fs.readFileSync('.env.local'));
  process.env = {
    ...process.env,
    ...localConfig
  };
} catch (error) {
  console.log('no .env.local found');
}

module.exports = function() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'build')));

  app.listen(process.env.PORT || 4000, err => {
    err ? console.log(err) : console.log('Server ready');
  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  return app;
};
