const express = require("express");
const bodyParser = require("body-parser");


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/customers');
const db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeded");
});

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.post('/sign_up', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var Data = {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone
    }

    db.collection('registration').insertOne(Data, function(err, result){
        if(err){
            console.error("Error inserting record:", err);
            return res.status(500).send("Internal Server Error");
        }else{

            console.log("Record inserted successfully");
        }
        
    });
    return res.redirect('success.html')
    
})
 
app.get('/', function (req, res){
    res.header('Access-Control-Allow-Origin', '*');
    return res.redirect('index.html');
});

const port = 5000;
app.listen(port, function (){
    console.log(`server listining at port : ${port}`);
});