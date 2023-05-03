const express = require("express")
const cors = require("cors")
const multer = require("multer")

const app = express();
const port = 3003;

app.use(cors())
app.use(express.json())

let namelist = [];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.delete('/newname', multer().none(), (req, res) => {
    console.log(req.body.name + " deleted")
    namelist = namelist.filter((n) => n !== req.body.name);
    console.log(namelist);
    res.sendStatus(204)
})

app.post('/newname', multer().none(), (req, res) => {
    console.log(req.body.name + " posted")
    namelist.push(req.body.name)
    res.sendStatus(204)
})

app.get('/newname', (req, res) => {
    res.send(namelist)
})

//FIXME:
app.get('/secret2', (req, res) => {
    if(req.headers.authorization != "aGFja2VyOjEyMzQ=") {
        res.sendStatus(401)
    } else {
        res.send("Yoink")
    }
})

app.listen(port, () => {
    console.log("server started")
})