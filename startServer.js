const { startServer } = require('./src/server');
const { cartHandler } = require('./src/handler');
const { notFound } = require('./src/notFound');
const { serveFile } = require('./src/serveFile');


const createHandlers = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  }
};

const handlers = [cartHandler('src/product.json'), serveFile, notFound];
startServer(9999, createHandlers(handlers));
