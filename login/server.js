

//https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd

//Note to self: killall -9 node ---listen EADDRINUSE :::8080

//HUSK AT START MONGOD før programmet køres.
//-->sudo service mongod start<--
//-->sudo service mongod stop<--

//programmet køres med >npm run start<
var clienttoserver = require('./clienttoserver')
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
  
//Routes til scripts
var opretRouter = require('./ModelControllerRoute/opretBruger');
//var loginRouter = require('./Clientside/logintoServer');

app.get('/login', function(req,res){
  res.sendFile(__dirname + '/Clientside/login.html')
})
//Henter fra roden af URL og til indholdet af opretBruger.html
app.get('/opretBruger', function(req, res){
  res.sendFile(path.join(__dirname + '/views/opretBruger.html'));
});

app.use('/css/style.css', function(req, res){
  res.sendFile(__dirname + '/css/style.css');
});

app.get('/kursistside',function(req, res){
  res.sendFile(__dirname + '/menu/kursist/kursistside.html');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//fixer Cross-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


  //var routes = require('../ModelControllerRoute/routes'); //importing route
//routes(app); //register the route


app.route('/Clientside/login').post(clienttoserver.login_as_client);

//Fortæller hvilket route skal hentes indhold fra, og hente scripts fra
app.use('/opretBruger', opretRouter);
//app.use('/login', loginRouter);

//Middleware : Skriver hvis den ikke kan finde siden.
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });


app.listen(8080,function(){
  console.log("Started on PORT 8080");
})



console.log('todo list RESTful API server started on: ' + port);
