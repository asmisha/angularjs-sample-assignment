"use strict";
var express = require('express');
var path    = require("path");
var fs      = require('fs');
var http    = require('http');
var randomstring = require("randomstring");

var app     = express();
var bodyParser = require('body-parser')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var users = [];
var authorized = false;

app.use(express.static('src/static'));

var port    = 8002;

app.listen(port, function() {
    console.log('App is running on port', port);
});


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/register', function (req, res) {
    var user = req.body;
    if (!user || !user.login || !user.password){
        res.statusCode = 500;
        res.end('Login and password required');
    }
    else{
        user.id = randomstring.generate(7);
        users.push(user);
        res.sendStatus(200);
    }
});

app.post('/auth', function (req, res) {
    var user = req.body;
    if (!user || !user.login || !user.password){
        res.statusCode = 500;
        res.end('Login and password required');
    }
    else{
        for(var i = 0; i < users.length; i++){
            if (user.login == users[i].login && user.password == users[i].password){
                authorized = true;
                res.status(200).send({id: users[i].id});
            }
        }
        res.statusCode = 404;
        res.end('Incorrect login or password');
    }
});

app.post('/logout', function(req,res){
    authorized = false;
    res.sendStatus(200);
});

app.get('/user', function (req, res) {
    var id = req.query['id'];
    if (!authorized){
        res.statusCode = 500;
        res.end('You are not authorized!');
    }
    else{
        for(var i = 0; i < users.length; i++){
            if (id == users[i].id){
                res.status(200).send({user: users[i]})
            }
        }
        res.statusCode = 404;
        res.end('User not found');
    }
});









