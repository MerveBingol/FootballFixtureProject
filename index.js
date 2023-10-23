const express = require('express');
const dotenv = require('dotenv');
//const fs = require('fs');
const path = require('path')
const app = express();

app.use(express.static("public"));
dotenv.config();



app.get('/', function(req, res) {
    res.render("index.ejs");
 });
//app.get('/',(req,res)=>{
  //  fs.readFile("/views/index.html"),(err,html)=>{
      //res.write("html");
          
   // };    
//});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log("server is running on:5000");
})