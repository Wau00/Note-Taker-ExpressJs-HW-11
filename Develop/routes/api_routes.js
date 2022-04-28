const api = require('express').Router();

const {v4: uuid4 } = require('uuid');

const dataBase = require("../db/db.json");

const fs = require('fs');
const util = require(util);
const readFromFile = util.promisify(fs.readFile);
const writeFromFile = util.promisify(fs.writeFile);


//Retrieving all the Notes
api.get('/api/notes', function(req, res){
    readFromFile(dataBase).then((data)=> res.json(JSON.parse(data)))
});

// Submitting all the Notes
api.post('/api/notes', function(req, res){

   
    const newNote = {
        title,
        text,
        id: uuid4(),
    };
        fs.readFile(dataBase, 'UTF-8', (err, data) =>{
        if (err){
           console.log(err);
        } else{
            JSON.parse(data).push(newNote);
            
        }
    })
    
    
    res.json('Note added succesfully!');
    res.json('Error in posting Note');
   


});

api.delete('')