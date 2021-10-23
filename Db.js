
const mongose = require('mongoose');

// "mongodb+srv://sAYSHRvrRd9qdZbT:sAYSHRvrRd9qdZbT@cluster0.vdbqq.mongodb.net/icloud";

// mongodb+srv://sAYSHRvrRd9qdZbT:sAYSHRvrRd9qdZbT@cluster0.ruse6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://sAYSHRvrRd9qdZbT:sAYSHRvrRd9qdZbT@cluster0.ruse6.mongodb.net/test
const mongoURI = "mongodb+srv://sAYSHRvrRd9qdZbT:sAYSHRvrRd9qdZbT@cluster0.ruse6.mongodb.net/test";
const connectToMongo = ()=>{
    mongose.connect(mongoURI, ()=>{
        console.log("connected");
       
    })
}
module.exports =connectToMongo;