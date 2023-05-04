const books = [
    {
        "title": "1984",
        "author": "George Orwell",
        "year": "1949",
        "isbn": "9780451524935"
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "year": "1960",
        "isbn": "9780446310789"
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": "1925",
        "isbn": "9780743273565"
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "year": "1813",
        "isbn": "9780486284736"
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "year": "1951",
        "isbn": "9780316769488"
    }
];

module.exports = function findAll() {
    return books
}
/*
module.exports = function findByID(isbn) {
    return books.find((b) => b.isbn === isbn)
}

module.exports = function replace(book) {
    books = books.map((b) => b.isbn === book.isbn ? book : b)
}

module.exports = function addnew(book) {
    books = {...books, book}
}

module.exports = function remove(isbn) {
    books = books.filter((b) => b.isbn != isbn)
}*/