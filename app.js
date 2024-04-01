const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./swagger');
const request = require('supertest');
const Cache = require('./service/cache');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//integrate components
app.use('/auth', authRoutes);
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/events', eventRoutes);
app.use('/tick', (req, res) => res.status(200).send('tok'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((error, req, res, next) => {
  console.log("unhandled exception:", error);
  const message = error.message;
  const data = error.data;
  res.json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://Boraa:BoraMenerja@cluster0.srxilpa.mongodb.net/messages?retryWrites=true'  )
  .then(() => {
    console.log('Mongodb connected')
    return Cache.connect({
      url: 'redis://@localhost:6379'
    })
    .then(() => {
      console.log('Redis connected')
      app.listen(4004, () => {
        console.log('Started server on port :4004')
      });
    })
  })
  .catch(err => console.log(err));

module.exports = app