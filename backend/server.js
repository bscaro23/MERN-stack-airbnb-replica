const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const profilesRouter = require('./controllers/profiles');
const usersRouter = require('./controllers/users');
const propertyRouter = require('./controllers/property');
const applicationRouter = require('./controllers/application');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());

app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/property', propertyRouter);
app.use('/apply', applicationRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
