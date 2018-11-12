var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chatOverview.html');
  //res.sendFile(__dirname + '/tsmtest.js');
});
app.get('/chatside', function(req,res){
  res.sendFile(__dirname + '/chatSide.html');

  
})
//hvordan vi sender js filer,  den nedenunder skal i html 
//  <script src= "http://localhost:3000/tsmtest"></script>

app.get('/tsmtest', function(req, res){
  res.sendFile(__dirname + '/tsmtest.js')

})

//fixer Cro$s-Origin Resource Sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//get alle brugerens chats
app.get('/getChats',function(req,res){
  //Her skal vi have lavet noget, så den sender en list over id'er på hvem man chatter med.
  //Det er en json, der skal hentes fra DB
  var sendListe = {arr :[{"id":"ajjskkksk123ws","name":"Hans"}, {"id":"ajjskodaoksdko2","name":"Johan"},{"id":"woolololololol","name":"Frank"},{"id":"ajjsk2daoksdko2","name":"Ulla"}]};
  res.send(sendListe);

});

var chatDummy = {arr: [ { "besked": 'Johan : Hej Johan' },
{ "besked": 'Johan : Hej' },
{ "besked": 'Johan : virker' },
{ "besked": 'Johan : dette' },
{ "besked": 'Johan : mon' },
{ "besked": 'Johan : jo' },
{ "besked": 'Johan : det tror jeg' },
{ "besked": 'Johan : eller' } ]};

app.get('/getChat', function(request, res){
  res.send(chatDummy);
})





http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    socket.on('new_client',function(username){
    socket.broadcast.emit('new_client', username);
    socket.broadcast.emit('new_client', socket.id);
    socket.username = username;
    socket.id = username;
    console.log(socket.id)
  console.log(username +' connected');
 
  
});

//
socket.on('disconnect',function(username){
  console.log( socket.username+' disconnected');
});

//En listener der venter på at 'chat message' eventet forekommer
  socket.on('chat message', function(msg){

    //Opretter et MongoClient variabel og henter mongodb modulet
    var MongoClient = require('mongodb').MongoClient;

    //SprogAppChatDB = sacdb
    //Opretter variabel med url'en. 
    var url = "mongodb://localhost:27017/sprogAppChatDb";

    //Database navn: sprogAppChatDb
    var dbNavn = "sprogAppChatDb";
    //Collection navn: c1
    var collectionNavn = "c1";

    //Connecting til databasen
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
        if(err) throw err;
        //Database navnet den skal connecte til
        var dbo = db.db(dbNavn);
        //Jsonfilen der skal insættes i databasen
        var jsonEnkelt = {brugernavn:socket.username, besked:msg};

        //Vælger hvilken collection der skal indsættes data i og insætter data. 
        dbo.collection(collectionNavn).insertOne(jsonEnkelt, function(err, db){
            if(err) throw err;
            console.log("Besked: " + msg + " tilføjet til databasen");
            });
        });
        io.emit('chat message', msg)
    
        console.log(socket.username +' skriver til ' + msg);  
    });
    



}); 
