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
    saveUninitialized: false,
    cookie: {}
}))

const secretAdminCredentials = { email: "desk@library.example", password: "m295" }

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

let lends = [
    {
        "id": "1",
        "customer_id": "e",
        "isbn": "e",
        "borrowed_at": "e",
        "returned_at": "e"
    },
    {
        "id": "2",
        "customer_id": "e",
        "isbn": "e",
        "borrowed_at": "e",
        "returned_at": "e"
    }
]

app.get('/', (request, res) => {
    request.session.views = (request.session.views || 0) + 1;
    console.log(request.session)
    res.send(`You were here ${request.session.views} times this session!`)
})

app.get('/books', (req, res) => {
    res.send(books)
})

app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const found = books.filter((b) => b.isbn == isbn)

    res.send(found)
})

app.get('/lends', (req, res) => {
    console.log(lends.length);
    res.send(lends)
})

app.get('/lends/:id', (req, res) => {
    const id = req.params.id
    const found = lends.filter((l) => l.id == id)

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

app.post('/lends', (req, res) => {
    // id der ausleihe
    // customer_id
    // isbn
    // borowed_at
    // returned_at

    const newLend = {
        "id": lends.length + 1,
        "customer_id": req.query.customer_id,
        "isbn": req.query.isbn,
        "borowed_at": req.query.borrowed_at,
        "returned_at": req.query.returned_at
    }

    lends = [...lends, newLend]

    res.send(lends)
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

app.patch('/lends/:id', (req, res) => {
    const lend = {
        "id": req.params.id,
        "customer_id": req.query.customer_id,
        "isbn": req.query.isbn,
        "borowed_at": req.query.borrowed_at,
        "returned_at": req.query.returned_at
    }

    lends = lends.map((l) => l.id == lend.id ? lend : l)
    res.send(lends)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})