const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kishan8178:32OoM7V8wGunPtpc@hisab.w43hl.mongodb.net/';

mongoose.connect(mongoURI, {

});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
