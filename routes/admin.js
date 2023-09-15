
const express = require("express")
const client = require("../database/MongoConnection")
const router = express.Router()
const ObjectId = require('mongodb').ObjectId

const {AdminAuth} = require("../middleware/authenticate")


const {classModel, teacherModel, studentModel} = require("../models/schemas") 



                                            //********  class crud  ***********/

// 1. add new class to database
router.post("/addClass", AdminAuth, async(req, res)=>{

    const newClass = new classModel({
        id : req.body.id,
        className : req.body.className
    })

    client.db("schoolDB").collection("classes").insertOne(newClass)
    .then((result)=>{

        res.send(req.body.className + " class inserted with id : " + 
        result.insertedId)

    })
    .catch(err=>{
        res.send("new class not added to database..  Error : " + err)
    })

})


// update class
router.put("/updateClass", AdminAuth, (req, res)=>{

   
    client.db("schoolDB").collection("classes").updateOne({"id": req.body.id}, {$set: {
        className : req.body.className
    }})
    .then(result=>{
        res.send("successfully updated")
    })
    .catch(err=>{
        res.send("not updated.. something went wrong")
    })
})


// delete class
router.delete("/deleteClass", AdminAuth, (req, res)=>{

    client.db("schoolDB").collection("classes").deleteOne({"id": (req.body.id)})
    .then(result=>{
        res.send("deletion successfully")
    })
    .catch(err=>{
        res.send("deletion failed")
    })
})







                                                //*********  teachers crud ***************/

// get teachers
router.post("/getTeachers", AdminAuth, (req, res)=>{
  
    client.db("schoolDB").collection("teachers").find().toArray()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send("something went wrong")
    })

})


// add teacher to database
router.post("/addTeacher", AdminAuth, async (req, res)=>{

    const newTeacher = new teacherModel({
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        subject : req.body.subject,
        class : req.body.class || "not assigned"
    })

    client.db("schoolDB").collection("teachers").insertOne(newTeacher)
    .then((result)=>{
        res.send("teacher added to database with id: " + result.insertedId)
    })
    .catch(err=>{
        res.send("teacher didn't added to database, check errors if any")
    })
    
   
})


// delete teacher
router.delete("/deleteTeacher/:id", AdminAuth, (req,res)=>{

    client.db("schoolDB").collection("teachers").deleteOne({"id": (req.params.id.toString())})
    .then((result)=>{
        res.send("teacher with id " + req.params.id.toString() + " has deleted")
    })

})


// map teachet to class
router.post("/mapTeacher/teacher/:teacherId/class/:classId", AdminAuth, async(req, res)=>{


    client.db("schoolDB").collection("teachers").findOne({"id" : (req.params.teacherId.toString())})
    .then(teacher=>{
       
        client.db("schoolDB").collection("classes").findOne({"id" : (req.params.classId.toString())})
        .then((classData)=>{
           
        
            client.db("schoolDB").collection("teachers").updateOne({"id": (req.params.teacherId.toString())}, {$set: {class : classData.className}})
            .then((result)=>{
                res.send("teacher with id: <" + req.params.teacherId + "> mapped to class id: <" + req.params.classId + ">")
            })
            .catch(err=>{
                res.send("something went wrong.. check errors if any")
            })
           
        })
        .catch(err=>{
            res.send("class with provided id not found")
        })
    })
    .catch(err=>{
        res.send("teacher with provided id not found");
    })



    
})





                                            //************* student crud  ****************/
        

// add student to database
router.post("/addStudent", AdminAuth, (req, res)=>{

    const newStudent = new studentModel({
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        class : req.body.class
    })

    client.db("schoolDB").collection("students").insertOne(newStudent)
    .then(result=>{
        res.send("student added with id: " + result.insertedId)
    })
    .catch(err=>{
        res.send("student not added... error: "  + err)
    })
})


//get students list
router.get("/getStudents", AdminAuth, (req, res)=>{

    client.db("schoolDB").collection("students").find().sort({"name" : 1}).toArray()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        res.send("Error: " + err)
    })
}) 


// map student to class
router.post("/mapStudent/student/:studentId/class/:classId", AdminAuth, (req, res)=>{
    
    client.db("schoolDB").collection("students").findOne({"id" : (req.params.studentId)})
    .then((studentData)=>{
        client.db("schoolDB").collection("classes").findOne({"id" : (req.params.classId)})
        .then((classData)=>{

            client.db("schoolDB").collection("students").updateOne({"id" : (req.params.studentId)}, {$set: {
                class : classData.className
            }})
            .then(()=>{
                res.send("student with id " + req.params.studentId + " mapped to class with id " + req.params.classId);
            })
            .catch(err=>{
                res.send("Error : " + err)
            })
        })
        .catch(err=>{
            res.send("class with provided id not found")
        })
    })
    .catch(err=>{
        res.send("student with provided id not found")
    })
})





module.exports = router