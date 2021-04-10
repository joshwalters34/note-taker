const express = require('express');
const path = require('path');
const fs = require('fs');
const {default:ShortUniqueId} = require('short-unique-id');

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//API ROUTES
app.get('/api/notes', (req, res) => res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8"))));

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    console.log(id)

    res.end();
});
// res.json(newNote));
    // let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
    // res.json(savedNotes[Number(req.params.id)])

app.post('/api/notes',(req, res) =>  {
//    var note = {
//    title: req.body.title,
//    text: req.body.text
// }
    const uid = new ShortUniqueId();
    const note = 
    {
        "title": req.body.title,
        "text": req.body.text,
        "id": uid()
    }

    const currentArr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
   
   currentArr.push(note);

   fs.writeFileSync("./db/db.json", JSON.stringify(currentArr));
   
    console.log("This is line 34" + currentArr);
    
    res.json(true)
    })
//HTML ROUTES
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
//need to post each saved note




app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));