const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4 } = require('uuid');
const app = express()

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
    fs.readFile('./db/db.json', 'utf-8', function(err, data) {
        if (err) throw err
        res.json(JSON.parse(data))
    })
});

app.post('/api/notes', function(req, res) {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    fs.readFile('./db/db.json', 'utf-8', function(err, data) {
        if (err) throw err
        let db = JSON.parse(data)
        db.push(note)

        fs.writeFile('./db/db.json', JSON.stringify(db), function(err) {
            if (err) throw err;
            console.log('new note saved');
        })
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    })
    
})

app.delete('/api/notes/:id', function (req, res) {
    let clicked = req.params.id

    fs.readFile('./db/db.json', 'utf-8', function(err, data) {
        if (err) throw err
        let db = JSON.parse(data)
        let newDb = db.filter(item => item.id !== clicked)

        fs.writeFile('./db/db.json', JSON.stringify(newDb), function(err) {
            if (err) throw err;
            console.log('note deleted');
        })
        res.sendFile(path.join(__dirname, "/public/notes.html"));
    })

})

app.listen(PORT, function () {
    console.log('Listening on ' + 'http://localhost:3001');
    console.log('Heroku Test Correct');
})
