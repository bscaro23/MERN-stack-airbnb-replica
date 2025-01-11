// controllers/users.js

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Traveller = require('../models/traveller');
const BnB = require('../models/bnb');

const SALT_LENGTH = 12;

router.post('/signup', async (req, res) => {
    try {

      const traveller = await Traveller.findOne({ username: req.body.username });
      const bnb = await BnB.findOne({ username: req.body.username });
      
        if (bnb || traveller) {
            return res.status(400).json({error:'Username already taken.'});
        }
    
        const user = await Traveller.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        const token = jwt.sign(
          { username: user.username, _id: user._id, userType: 'traveller' },
          process.env.JWT_SECRET
        );
        res.status(201).json({ user, token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed.', details: error.errors });
        } else if (error.code === 11000) {
            return res.status(400).json({ error: 'Username already exists (duplicate error).' });
        } else {
            console.error('Server error:', error);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
});

router.post('/signup/BnB', async (req, res) => {
  try {
    
    
    const traveller = await Traveller.findOne({ username: req.body.username });
    const bnb = await BnB.findOne({ username: req.body.username });
    if (traveller || bnb) {
      return res.status(400).json({ error: 'Username already taken.' });
    }


    const user = await BnB.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
    });

    
    const token = jwt.sign(
      { username: user.username, _id: user._id, userType: 'bnb' },
      process.env.JWT_SECRET
    );

  
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed.', details: error.errors });
    } else if (error.code === 11000) {
      return res.status(400).json({ error: 'Username already exists (duplicate error).' });
    } else {
      console.error('Server error:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
});

router.post('/signin', async (req, res) => {
  try {
    const traveller = await Traveller.findOne({ username: req.body.username });
    const bnb = await BnB.findOne({ username: req.body.username });

    // Determine which user model the user belongs to
    const user = traveller || bnb;
    
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const userType = traveller ? 'traveller' : 'bnb';
      const token = jwt.sign(
        { username: user.username, _id: user._id, userType: userType },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


  module.exports = router;


 