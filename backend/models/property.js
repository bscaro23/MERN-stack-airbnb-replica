//models/property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BnB',
    required: true,
  },
  Name: {
    type: String,
    required: true
  },
  PriceMin: {
    type: Number,
    required: true,
    min: 0 
  },
  PriceMax: {
    type: Number,
    required: true
  },
  NoOfRooms: {
    type: Number,
    required: true,
    min: 0 
  },
  Location: {
    type: String,
    required: true,
    enum: [ 
      'Paris', 'New York', 'London', 'Tokyo', 'Dubai',
      'Rome', 'Bangkok', 'Barcelona', 'Singapore', 'Istanbul',
      'Sydney', 'Los Angeles', 'Cape Town', 'Bali', 'Hong Kong',
      'Amsterdam', 'Prague', 'Moscow', 'Las Vegas', 'Rio de Janeiro'
    ]
  },
  Vibe: {
    type: String,
    required: true,
    enum: [ 
      'Romantic', 'Family-Friendly', 'Luxurious', 'Rustic',
      'Modern', 'Cozy', 'Beachy', 'Adventure-Ready',
      'Eco-Friendly', 'Urban Chic'
    ]
  },
  Applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Applicant' 
    }
  ],
  Accepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    }
  ],
  Completed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction' 
    }
  ]
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
