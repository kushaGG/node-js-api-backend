const path = require('path')

module.exports = {
  openapi: '3.0.0',
  info: {
    // API informations (required)
    title: 'Node.js API 1.0', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'CRUD API' // Description (optional)
  },
  servers: [
    { url: 'http://0.0.0.0:3000' }
  ],
  apis: [path.join(__dirname, './routes/*.js')]
}