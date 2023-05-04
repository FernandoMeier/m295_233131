const express = require("express")
const cors = require("cors")
const session = require("express-session")

const app = express();
const port = 3300;

app.use(cors())
app.use(express.json())
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}
))

const adminCreds = { "email": "desk@library.example", "password": "m295" }

let books = [
    {
        "title": "1984",
        "author": "George Orwell",
        "year": "1949",
        "isbn": "9780451524935",
        "lent": false
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "year": "1960",
        "isbn": "9780446310789",
        "lent": false
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": "1925",
        "isbn": "9780743273565",
        "lent": false
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "year": "1813",
        "isbn": "9780486284736",
        "lent": false
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "year": "1951",
        "isbn": "9780316769488",
        "lent": false
    }
];

app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    console.log(req.session)
    res.send(`You were here ${req.session.views} times this session!`)
})

// --------------- start of login --------------------

app.post('/login', function (request, response) {
    const { email, password } = request.body

    // Check the credentials against store
    if (email?.toLowerCase() == secretAdminCredentials.email && password == secretAdminCredentials.password) {

        // Link email to session
        request.session.email = email

        return response.status(200).json({ email: request.session.email })
    }

    return response.status(401).json({ error: "Invalid credentials" })
})

app.get('/verify', function (request, response) {

    // Check if email is set in session
    if (request.session.email) {
        return response.status(200).json({ email: request.session.email })
    }

    return response.status(401).json({ error: "Not logged in" })
})

app.delete('/logout', function (request, response) {

    // Check if email is set in session
    if (request.session.email) {

        // Reset link of session to email
        request.session.email = null

        return response.status(204).send()
    }

    return response.status(401).json({ error: "Not logged in" })
})

// --------------- end of login --------------------

app.get('/books', (req, res) => {
    res.send(books)
})

app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const found = books.filter((b) => b.isbn == isbn)

    res.send(found)
})

app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    books = books.filter((b) => b.isbn != isbn)

    res.send(books)
})

app.post('/books/:title', (req, res) => {
    if (req.params.title && req.query.author && req.query.year && req.query.isbn) {
        const book = {
            "title": req.params.title,
            "author": req.query.author,
            "year": req.query.year,
            "isbn": req.query.isbn,
            "lent": false
        }
        books = [...books, book]

        res.send(books)
    } else {
        res.sendStatus(422)
    }
})

app.put('/books/:isbn', (req, res) => {
    if (req.query.title && req.query.author && req.query.year && req.params.isbn) {
        const book = {
            "title": req.query.title,
            "author": req.query.author,
            "year": req.query.year,
            "isbn": req.params.isbn,
            "lent": false
        }

        books = books.map((b) => b.isbn == book.isbn ? book : b)
        res.send(books)
    } else {
        res.sendStatus(422)
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})