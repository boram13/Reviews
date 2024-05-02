const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const default = require('./confon');
const config = require('config');

const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//integrate components
app.use('/auth', authRoutes);
app.use('/review', reviewRoutes);
app.use('/user', userRoutes);
app.use('/events', eventRoutes);
app.use('/tick', (req, res) => res.status(200).send('tok'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((error, req, res, next) => {
  console.error("Unhandled exception:", error);
  const message = error.message;
  const data = error.data;
  res.status(500).json({ message: message, data: data });
});

console.log('asdasdasdasda')

mongoose.connect(config.get('db.url'))//getbd url dhe kthen nje string 
.then(() => {
  console.log(`MongoDB connected`);
  return Cache.connect({
    url:config.get('redis.url')
    // url: `redis://${config.get('redis.url')}:${config.get('redis.port')}`
  });
})
.then(() => {
  console.log('Redis connected');
  app.listen(config.get('server.port'), () => {
    console.log(`Server started on port: ${config.get('server.port')}`);
  });
})
.catch((err) => {
  console.log('- - - - - - -')
  console.error('Connection error:', err)
  process.exit(1)
});


module.exports = app