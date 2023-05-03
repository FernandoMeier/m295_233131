// to start server type into terminal: 
//`cd /workspaces/m295_233131/express_helloworld`
//`node index.js`

//this is the server

const express = require("express")
const cors = require("cors")

const app = express();
const port = 3030;

app.use(cors())
app.use(express.json())

const names = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Emma',
    'Frank',
    'Grace',
    'Henry',
    'Isabella',
    'Jack',
    'Kate',
    'Liam',
    'Mia',
    'Noah',
    'Olivia',
    'Peter',
    'Quinn',
    'Rachel',
    'Sophia',
    'Thomas'
];

const me = JSON.parse(
    '{"Vorname" : "Fernando", "Nachname" : "Meier", "Alter" : "17", "Wohnort" : "Wald ZH", "Augenfarbe" : "Grün-Braun"}'
)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/now", (req, res) => {
    const tz = req.query.tz || "Europe/Berlin";
    res.send(new Date().toLocaleString("de-CH", { timeZone: tz }));
})

app.get("/zli", (req, res) => {
    res.redirect("https://moodle.zli.ch/")
})

app.get("/name", (req, res) => {
    res.send(names[Math.floor(Math.random() * 21)])
})

app.get("/html", (req, res) => {
    res.sendFile("/workspaces/m295_233131/express_helloworld/index.html")
})

app.get('/image', (req, res) => {
    res.sendFile("/workspaces/m295_233131/express_helloworld/Bob.png")
})

app.get('/teapot', (req, res) => {
    res.sendStatus(418)
})

app.get('/user-agent', (req, res) => {
    res.send(req.get("user-agent"))
})

app.get('/secret', (req, res) => {
    res.sendStatus(403)
})

app.get('/xml', (req, res) => {
    res.sendFile("/workspaces/m295_233131/express_helloworld/index.xml")
})

app.get('/me', (req, res) => {
    res.send(me)
})

app.listen(port, () => {
    console.log("server started")
})