


const express = require("express")
const jwt = require("jsonwebtoken")
const client = require("../database/MongoConnection")
require("dotenv").config()
require("mongodb")

const router = express.Router();




// admin login 

router.get("/admin", (req, res)=>{

    const email  = req.body.email
    const password = req.body.password

    client.db("schoolDB").collection("admins").findOne({email:email})
    .then((result)=>{
        
        if(result.password===password){
            const token = jwt.sign({name: result.name}, "adminSecretKey", {expiresIn: '24hr'})
            res.send("Admin logged in with token id: " + token);
        }
        else{
            res.status(401).send("error 401 : wrong password")
        }
    })
    .catch(err=>{
        res.status(401).send("error 401 : wrong email ")
    })

})




// teacher login

router.get("/teacher", (req, res)=>{

    const email  = req.body.email
    const password = req.body.password

    client.db("schoolDB").collection("teachers").findOne({email:email})
    .then((result)=>{
        
        if(result.password===password){
            const token = jwt.sign({name: result.name}, "teacherSecretKey", {expiresIn: '24hr'})
            res.send("Teacher logged in with token id: " + token);
        }
        else{
            res.status(401).send("error 401 : wrong password")
        }
    })
    .catch(err=>{
        res.status(401).send("error 401 : wrong email ")
    })

})




//student login

router.get("/student", (req, res)=>{

    const email  = req.body.email
    const password = req.body.password
 
    client.db("schoolDB").collection("students").findOne({email:email})
    .then((result)=>{
        
        if(result.password===password){
            const token = jwt.sign({name: result.name}, "studentSecretKey", {expiresIn: '24hr'})
            res.send("Student logged in with token id: " + token);
        }
        else{
            res.status(401).send("error 401 : wrong password")
        }
    })
    .catch(err=>{
        res.status(401).send("error 401 : wrong email")
    })
})




module.exports = router