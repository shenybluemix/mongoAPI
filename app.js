var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
//var bodyParser = require('body-parser');

// Connection URL
var mongoAtlasURL = 'mongodb://chris:hZVJq2qoSkSu6Twe@cluster0-shard-00-00-9gjqg.mongodb.net:27017,cluster0-shard-00-01-9gjqg.mongodb.net:27017,cluster0-shard-00-02-9gjqg.mongodb.net:27017/sample?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'


var findDocuments = function(db,fil, callback) {
  // Get the documents collection
  var collection = db.collection('peoples');

  // Find some documents with the Filter  {"first_name": "Ye"}
  collection.find(fil).toArray(function(err, docs) {
    assert.equal(err, null);
    mongoAtlasDocument = docs;
    console.log("Found " + docs.length+ " records at: " + collection.collectionName);
    console.log(docs)
    callback(docs);
  });
}


// Use connect method to connect to the server
MongoClient.connect(mongoAtlasURL, function(err, db) {

  assert.equal(null, err);
  mongoAtlasDB = db;
  console.log("Connected successfully to Atlas server");
  console.log("Connected successfully to database: " + db.databaseName);

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

});


// GET method route
app.get("/people", function(req, res) {

  var collection = mongoAtlasDB.collection('peoples');

  // Find some documents with the Filter  {"first_name": "Ye"}
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    mongoAtlasDocument = docs;
    console.log("Found " + docs.length+ " records at: " + collection.collectionName);
    console.log(docs);
    res.json(docs);
  });
});

// GET method route
app.get("/people/:first_name", function(req, res) {

  var filter = {"first_name": req.params.first_name}

  findDocuments(mongoAtlasDB,filter,function(docs){
    res.json(docs);
  });

});


// POST method rout
app.post("/contacts", function(req, res) {
});
