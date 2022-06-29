const { startServer } = require('./src/server');
const { handler } = require('./src/handler');

startServer(9999, handler('./src/product.json'));
