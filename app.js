//Needed Packages

const express = require('express'); //Express for Routing
const bodyParser = require('body-parser'); //Handling HTTP Requests
const mongoose = require('mongoose'); //Handling MondoDB

//Connecting to DataBase
mongoose.connect('mongodb://todolist:assignment1@ds155934.mlab.com:55934/todo_list');
//DB Schema
var todoListSchema = new mongoose.Schema({
  item: String
});
//Creating a model for the Schema
var todoDB = mongoose.model('Todo_List', todoListSchema);

//Setting up Express App
var app = express();
//Using EJS as our Template Engine
app.set('view engine', 'ejs');
//Access to Static Files
app.use(express.static('public'));

//Middleware to parse POST Requests
var urlencodedParser = bodyParser.urlencoded({extended:false});

//Handling all the Requests
app.get('/list', function(req, res){
  //Get data from the DataBase, and display it to the user
  todoDB.find({}, function(err, data){
    if(err) throw err;
    res.render('todolist', {todos: data});
  })
});

app.post('/list', urlencodedParser, function(req, res){
  //update the Database with new data, and print new data to the screen.
  //'newTodoItem' come's from 'req.body'
  var newTodoItem = todoDB(req.body).save(function(err, data){
    res.json(data);
  });
});//Handle Post Command

app.delete('/list', urlencodedParser, function(req, res){
  todoDB.find({item: req.body.item}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });
  // console.log(req.body);
});//Handle Delete Command

//app is listening on port 3001. Address -> localhost:3001
app.listen(3001);
console.log('Listening on port 3001...........');
