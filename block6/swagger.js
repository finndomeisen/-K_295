const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Bibliothek API',
    description: 'API für das Verwalten von Büchern und Ausleihen.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js']; // Der Hauptserver-Code

swaggerAutogen(outputFile, endpointsFiles);


