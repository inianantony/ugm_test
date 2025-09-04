const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;

http.createServer((req, res) => {
  // Parse the URL to separate path from query parameters
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;
  
  // Always serve index.html for root path, regardless of query parameters
  if (pathname === '/' || pathname === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // 404 for anything else
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
