
//Opretter et MongoClient variabel og henter mongodb modulet
var MongoClient = require('mongodb').MongoClient;

//SprogAppChatDB = sacdb
//Opretter variabel med url'en. 
var url = "mongodb://localhost:27017/sprogAppChatDb";

//Database navn: sprogAppChatDb
var dbNavn = "sprogAppChatDb";
//Collection navn: c1
var collectionNavn = "c1";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNavn);
    dbo.collection(collectionNavn).find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log("Collection exists")
        db.close;
    });

});