const mongoose = require("mongoose")


const classSchema = mongoose.Schema({
    id :{
        type: String,
        required: true,
        unique : true
    },
    className:{
        type: String,
        required: true,
        unique: true
    }
})

const classModel = mongoose.model("Class", classSchema)


const teacherSchema = mongoose.Schema({
    id :{
        type: String,
        required: true,
        unique : true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    subject : String,
    class : String
})

const teacherModel = mongoose.model("Teacher", teacherSchema);


const studentSchema = mongoose.Schema({
    id:{
        type : String,
        required : true,
        unique : true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required: true
    },
    class : {
        type: String,
    }

})

const studentModel = mongoose.model("Student", studentSchema)

const scoreSchema = mongoose.Schema({
    studentName:{
        type : String,
        required: true
    },
    studentId : {
        type : String,
        required: true
    },
    subjects : {
        maths : {
            score : Number,
            date : String
        },
        physics : {
            score : Number,
            date : String
        },
        chemistry : {
            score : Number,
            date : String
        }
    },
    dateOfScoreCard : {
        type : String,
        required: true
    },
    totalScore  : {
        type: Number,
        required: true
    },
    comments : {
        type: String
    }
})

const scoreModel = mongoose.model("Score", scoreSchema);



module.exports = {
    classModel, teacherModel, studentModel, scoreModel
}