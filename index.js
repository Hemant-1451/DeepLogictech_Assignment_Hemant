const http = require('http');
const scrapper = require('./scrapper');


// Creating HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === '/getTimeStories' && req.method === 'GET') {

    const data = await scrapper.ScarpData();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});