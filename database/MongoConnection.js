require("dotenv").config();
const {MongoClient} = require("mongodb")

const URI = process.env.MONGO_URI || "mongodb+srv://schoolApi:schoolApi@cluster0.glhvw.mongodb.net/schoolDB?retryWrites=true&w=majority";

const client = new MongoClient(URI);


client.connect().then(()=>{
    console.log("mongo connected:")
}).catch(err=>{
    console.log("mongo conenction failed: " + err) 
})


module.exports = client

