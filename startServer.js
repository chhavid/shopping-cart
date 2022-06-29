const { startServer } = require('./src/server/server');
const { cartHandler } = require('./src/app/handler');
const { notFound } = require('./src/app/notFound');
const { serveFile } = require('./src/app/serveFile');


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
