const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const router = express.Router();

const Application = require('../models/application');
const Property = require('../models/property');

router.use(verifyToken);

router.post('/:propertyId', async (req, res) => {
    try {
      
      const Applicant = req.user._id;
      
      const { startDate, endDate } = req.body[0];

      const applicationData = {
        startDate,
        endDate,
        Applicant, 
      };
      
      const application = await Application.create(applicationData);

      const property = await Property.findById(req.params.propertyId);

      property.Applicants.push(application._id);

      await property.save();
  
      application._doc.author = req.user;
      res.status(201).json(application);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  

  //Find all of the properties
  router.get('/', async (req, res) => {
    try {
      const applications = await Application.find({"Applicant": req.user._id})
        .sort({ createdAt: 'desc' });

        
        const properties = await Promise.all(
            applications.map(async (application) => {
              return await Property.find({"Applicants": application._id})
              .populate('Owner')
                .sort({ createdAt: 'desc' });
            })
          );
      res.status(200).json({applications, properties});
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/:applicationId', async (req, res) => {
    try {
      const application = await Application.findById(req.params.applicationId).populate('Applicant');
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.put('/:applicationId', async (req, res) => {
    try {
      const application = await Application.findById(req.params.applicationId);
  
      if (!application.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const updatedApplication = await Application.findByIdAndUpdate(
        req.params.applicationId,
        req.body,
        { new: true }
      );
  
      updatedApplication._doc.author = req.user;
  
      res.status(200).json(updatedApplication);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.delete('/:applicationId', async (req, res) => {
    try {
      const application = await Application.findById(req.params.applicationId);
  
      if (!application.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedApplication = await Application.findByIdAndDelete(req.params.applicationId);
      res.status(200).json(deletedApplication);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  module.exports = router;


  