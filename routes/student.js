const express = require("express")
const client = require("../database/MongoConnection")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

const {StudentAuth} = require("../middleware/authenticate")




//************** get Score Card ************** */

router.get("/getScore", StudentAuth, (req, res)=>{

    client.db("schoolDB").collection("scores").findOne({"studentId" : req.body.studentId})
    .then(result=>{
        if(result){
            res.send(result)
        }
        else{
            res.send("no student found with given id")
        }
        
    })
    .catch(err=>{
        res.send("Error : " + err)
    })
})

module.exports = router