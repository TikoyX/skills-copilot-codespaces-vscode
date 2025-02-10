// Create web server
// 1. Import required modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// 2. Create server
const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url);
    // Extract the path
    let pathname = `.${parsedUrl.pathname}`;
    // Check the file extension to determine the Content-Type
    const ext = path.parse(pathname).ext;
    // Default Content-Type is text/html
    let contentType = 'text/html';
    // Check the file extension and set the Content-Type
    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    // Read the file
    fs.readFile(pathname, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        return res.end();
    });
});
// 3. Listen for incoming requests
server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
// 4. Handle comments
const comments = [];
// Add a comment
function addComment(comment) {
    comments.push(comment);
}
// Get all comments
function getComments() {
    return comments;
}