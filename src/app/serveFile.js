const fs = require("fs");

const contentType = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  png: 'image/png'
};

const determineContentType = (fileName) => {
  const extension = fileName.split('.').slice(-1);
  return contentType[extension] || 'text/plain';
};

const serveFile = ({ url }, response) => {
  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  const fileName = './public' + pathname;
  try {
    response.setHeader('content-type', determineContentType(fileName));
    const content = fs.readFileSync(fileName);
    response.end(content);
  } catch (error) {
    return false;
  }
  return true;
};

module.exports = { serveFile };
