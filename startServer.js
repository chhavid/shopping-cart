const { startServer } = require('./src/server');
const { handlers } = require('./src/handler');

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

startServer(9999, createHandlers(handlers));
