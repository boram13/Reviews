const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/review', reviewRoutes);
app.use('/tick', (req, res) => res.status(200).send('tok'))

app.use((error, req, res, next) => {
  console.log(error);
  const message = error.message;
  const data = error.data;
  res.json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://Boraa:BoraMenerja@cluster0.srxilpa.mongodb.net/messages?retryWrites=true'
  )
  .then(() => {
    console.log('Mongodb connected')
    app.listen(4000, () => {
      console.log('Started server on port :4000')
    });
  })
  .catch(err => console.log(err));