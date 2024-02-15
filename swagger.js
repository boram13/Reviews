const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Review API Documentation',
      version: '1.0.0',
      description: 'API documentation for Review application',
    },
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);


module.exports = specs