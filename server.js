const express = require("express");
const server = express();

server.use(express.json());

//routing
const authRoutes = require("./auth/authRoutes");
server.use("/api", authRoutes);
server.get("/api/users", (req, res)=>{

});

module.exports = server;