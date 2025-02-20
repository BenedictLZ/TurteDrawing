const express = require("express");

const server = express();
server.use(express.static(__dirname));
server.use(express.json());

server.listen(81, () => console.log("Please go to the url 'localhost:81' now."));