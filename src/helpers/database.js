// import mongoose from "mongoose";
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://citcetserver:citserve2377$@cluster0.sq8mu.mongodb.net/citcet",{ 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connect("mongodb+srv://adminjakdata:adminjakdata@jakdatadb.2chyhbr.mongodb.net/jakdata", { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
setTimeout(function() {
    mongoose.connect(
      'mongodb+srv://adminjakdata:adminjakdata@jakdatadb.2chyhbr.mongodb.net/jakdata',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
      );
  }, 60000);

const db = mongoose.connection;
// console.log(db)
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connecteds'));

module.exports = db;