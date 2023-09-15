const bodyParser = require("body-parser")
const express  = require("express")
const {MongoClient} = require("mongodb")
require("dotenv").config()
require("../database/MongoConnection")
const router = express.Router()
const authenticate = require("../middleware/authenticate")

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(router)

const loginRoute = require("../routes/login")
const adminRoute = require("../routes/admin")
const teacherRoute = require("../routes/teacher")
const studentRoute = require("../routes/student")


const port = 3000 || process.env.PORT 



app.get('/', (req, res)=>{
    res.send("Hi I am school API");
})



app.use("/login", loginRoute)
app.use("/admin", adminRoute)
app.use("/teacher", teacherRoute)
app.use("/student", studentRoute)



app.listen(port, ()=>{
    console.log("server started at port : " + port)
})




