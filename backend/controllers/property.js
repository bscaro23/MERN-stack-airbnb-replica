// controllers/property.js

const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const BnB = require('../models/bnb.js')
const Property = require('../models/property.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);



router.post('/', async (req, res) => {
    try {
      req.body.Owner = req.user._id;
      const property = await Property.create(req.body);
      
      property._doc.author = req.user;
      res.status(201).json(property);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const properties = await Property.find({})
        .populate('Owner')
        .sort({ createdAt: 'desc' });
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get('/:propertyId', async (req, res) => {
    try {
      const property = await Property.findById(req.params.propertyId).populate('Owner');
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get('/myproperty', async (req, res) => {
    try {
      const myProperty = await Property.find({ Owner: req.user._id })
        .populate({
          path: 'Owner', 
          select: 'username' 
        })
        .populate({
          path: 'Applicants', 
          populate: { path: 'Applicant', select: 'username' } 
        });
  
      res.status(200).json(myProperty);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.put('/:propertyId', async (req, res) => {
    try {
      
      const property = await Property.findById(req.params.propertyId);
  
 
      if (!property.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  

      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.propertyId,
        req.body,
        { new: true }
      );
  
      updatedProperty._doc.author = req.user;
  

      res.status(200).json(updatedProperty);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  router.delete('/:propertyId', async (req, res) => {
    try {
      const property = await Property.findById(req.params.propertyId);
  
      if (!property.author.equals(req.user._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedProperty = await Property.findByIdAndDelete(req.params.propertyId);
      res.status(200).json(deletedProperty);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post('/:propertyId/applications', async (req, res) => {
    try {
      req.body.author = req.user._id;
      const property = await Property.findById(req.params.propertyId);
      property.comments.push(req.body);
      await property.save();
  
      const newApplication = property.comments[property.comments.length - 1];
  
      newApplication._doc.author = req.user;
  
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json(error);
    }
  });
module.exports = router;
