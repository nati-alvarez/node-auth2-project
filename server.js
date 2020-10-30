const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");

server.use(express.json());

//routing
const authRoutes = require("./auth/authRoutes");
const db = require("./data/db");
server.use("/api", authRoutes);

server.get("/api/users", checkToken, async (req, res)=>{
    try {
        const users = await db("users").where({department: req.user.department});
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({message: "A server error occurred"});
    }
});

function checkToken(req, res, next){
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message: "You shall not pass!"});
    try{
        const user = jwt.verify(token, "SDFAWAISEFJD0SJFNWAFAWIE09JEFSDOJFS0");
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({message: "You shall not pass!"});
    }
}

module.exports = server;