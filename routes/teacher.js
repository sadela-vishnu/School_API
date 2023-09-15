const express = require("express")
const client = require("../database/MongoConnection")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

const {TeacherAuth} = require("../middleware/authenticate")
const { scoreModel } = require("../models/schemas")




//***********  add student  *****************/

router.get("/getStudents", TeacherAuth, (req, res)=>{
    client.db("schoolDB").collection("students").find().sort({name : 1}).toArray()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send("Error: " + err)
    })
}) 



// post a new score card into the database
router.post("/createScoreCard", TeacherAuth, (req, res)=>{


    const scoreCard = new scoreModel({
        studentName: req.body.name,
        studentId : req.body.id,
        subjects : {
            maths : {
                score : req.body.math.score,
                date : req.body.math.date
            },
            physics : {
                score : req.body.physics.score,
                date : req.body.physics.score
            },
            chemistry : {
                score : req.body.chemistry.score,
                date : req.body.chemistry.score
            }
        },
        dateOfScoreCard : req.body.dateOfScoreCard,
        totalScore  : req.body.totalScore,
        comments : req.body.comments
    })

    
    client.db("schoolDB").collection("scores").insertOne(scoreCard)
    .then(result=>{
       res.send("scoreCard uploaded with id: " + result.insertedId)
    })
    .catch(err=>{
        res.send("Error : " + err)
    })
})


// get students sorted accoring to names
router.get("/getStudentsByRank", TeacherAuth, (req, res)=>{

    client.db("schoolDB").collection("scores").find().sort({"score" : -1}).toArray()
    .then(result=>{
        res.send(result);
    })
    .catch(err=>{
        res.send("Error : " + err)
    })
})



module.exports = router