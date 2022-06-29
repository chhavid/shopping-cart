const notFound = (request, response) => {
  response.statusCode = 404;
  response.end('file not found');
  return true;
};

module.exports = { notFound };
