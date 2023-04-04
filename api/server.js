const express = require("express");

const tariflerRouter = require("./tarifler/tarifler-router.js");

const server = express();

server.use(express.json());
server.use("/api/tarifler", tariflerRouter);

module.exports = server;
