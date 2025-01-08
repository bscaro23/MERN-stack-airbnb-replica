// models/bnb.js

const mongoose = require('mongoose');

// Define the BnB schema
const bnbSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Details', 
  },
});

bnbSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword; 
  },
});

const BnB = mongoose.model('BnB', bnbSchema);

module.exports = BnB;
