'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log(`server started on port ${port}`);
    }
});

app.get("/", function(req,res){
    //insert({data: "data"});
    res.send("works!");

});

app.post("/", function(req,res){
    console.log(req.body.data);
    let data = req.body.data;
    insert({data: data},function(err,resp){
        if(err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            console.log(resp);
            res.sendStatus(200);
        }
    });
    
});

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://testapp:password@ds229648.mlab.com:29648/gsapp';
var db;
var insert = function(){}

MongoClient.connect(url, function(err, db){
    if(err) {
        console.log('Error connecting to the database');
        console.log(err);
    }
    else {
        console.log('database connected');
        db = db.db('gsapp');

        insert=function(data, callback){
            var collection = db.collection('gsapp');
            collection.insert(data, function(error, result){
                if(error) {
                    callback(error);
                }
                else {
                    callback(null, 'success');
                }
            });
        }
    }
});