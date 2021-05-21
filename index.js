const app = require('./app'); // require the express app 
const http = require('http');
const logger = require('./utils/logger'); 

// use http to create a server
const server = http.createServer(app);

const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
    logger.info(`Server is running on ${PORT}`)
})
