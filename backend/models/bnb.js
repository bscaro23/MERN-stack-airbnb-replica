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
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property', // Referencing another collection (if applicable)
    },
  ],
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Details', // Referencing another collection (if applicable)
  },
});

bnbSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword; // Remove sensitive info from JSON output
  },
});

const BnB = mongoose.model('BnB', bnbSchema);

module.exports = BnB;
