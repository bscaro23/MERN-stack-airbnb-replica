const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  Charge: {
    type: Number,
    required: true
  },
  Applicant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    }
  ]
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
