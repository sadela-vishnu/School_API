

const jwt = require("jsonwebtoken")
require("dotenv").config()


// admin authentication verification using jwt
const AdminAuth = (req, res, next)=>{
   
    try{     
        const token = req.body.token
        const decode = jwt.verify(token, "adminSecretKey")
        req.user = decode
        next()
    }
    catch(err){
        res.status(403).send("error 403: " + err)      
    }
  
}



// student authentication verification using jwt
const StudentAuth = (req, res, next)=>{
   
    try{
        const token = req.body.token
        const decode = jwt.verify(token, "studentSecretKey")
        req.user = decode
        next()
    }
    catch(err){
        res.status(403).send("error 403: " + err)      
    }
  
}



// student authentication verification using jwt
const TeacherAuth = (req, res, next)=>{
   
    try{ 
        const token = req.body.token
        const decode = jwt.verify(token, "teacherSecretKey")
        req.user = decode
        next()
    }
    catch(err){    
        res.status(403).send("here error 403: " + err)      
    }
  
}



module.exports = {
    AdminAuth, StudentAuth, TeacherAuth
}