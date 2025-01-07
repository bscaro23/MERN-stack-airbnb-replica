// models/user.js
const mongoose = require('mongoose');

// Define the traveller schema
const travellerSchema = new mongoose.Schema({
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
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application', 
    },
  ],
  accepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accepted', 
    },
  ],
  completed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Completed', 
    },
  ],
});

travellerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword; 
  },
});

const Traveller = mongoose.model('Traveller', travellerSchema);

module.exports = Traveller;
