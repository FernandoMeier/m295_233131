const express = require("express")

const app = express()
const port = 3030

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
    'Thomas',
    'cumpooper'
  ];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/now", (req, res) => {
    res.send(new Date().toISOString())
})

app.get("/zli", (req, res) => {
    res.redirect("https://moodle.zli.ch/")
})

app.get("/name", (req, res) => {
    res.send(names[Math.floor(Math.random() * 21)])
})

app.get('/image', (req, res) => {
    res.write("<img src = https://www.tagesspiegel.de/images/shrek/alternates/BASE_21_9_W1000/shrek.jpeg>")
    res.send()
})

app.get('/teapot', (req, res) => {
    res.sendStatus(418)
})

app.listen(port, () => {
    console.log("server started")
})