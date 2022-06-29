const { startServer } = require('./src/server');
const { handler, addRequest } = require('./src/handler');
const { notFound } = require('./src/notFound');


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

const handlers = [addRequest('src/product.json'), handler(), notFound];
startServer(9999, createHandlers(handlers));
