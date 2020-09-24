const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../data/db");

router.post("/login", async (req, res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password) res.status(400).json({message: "Username and password are required"});
        
        const user = await db("users").where({username: username}).first();
        if(!user) return res.status(401).json({message: "Incorrect username or password"});
        if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: "Incorrect username or password"});
        const token = generateToken(user);
        res.status(200).json({message: "Login successful", token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred"});
    }
});

router.post("/signup", async (req, res)=>{
    try{
    const {username, department, password} = req.body;
    if(!username || !department || !password) return res.status(400).json({message: "All fields are required"});
    let hash = bcrypt.hashSync(password, 14);

    const userExists = await db("users").where({username: username}).first();
    if(userExists) return res.status(400).json({message: "User exists already"});
    
    db("users").insert({username, department, password: hash}).then(newUser=>{
        const id = newUser[0]
        res.status(201).json({message: "User created", user: {id, ...req.body}});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message: "A server error occurred"});
    });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred"});
    }
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, "SDFAWAISEFJD0SJFNWAFAWIE09JEFSDOJFS0", options);
}

module.exports = router;
