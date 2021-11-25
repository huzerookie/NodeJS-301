let app = require('./index')
var http = require("http");
var server = http.createServer(app)
const port = process.env.PORT || 3001;

module.exports = server

server.listen(port, () => console.log(`Server started at port ${port}`));


