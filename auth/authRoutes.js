const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../data/db");

router.post("/login", async (req, res)=>{
    
});

router.post("/signup", async (req, res)=>{
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
});

module.exports = router;
