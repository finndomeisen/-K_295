const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// Pfad zur JSON-Datei
const booksFilePath = path.join(__dirname, "books.json");

// Funktion zum Laden der Bücher-Daten
function loadBooks() {
  const data = fs.readFileSync(booksFilePath, "utf-8");
  return JSON.parse(data);
}

// Funktion zum Speichern der Bücher-Daten
function saveBooks(data) {
  fs.writeFileSync(booksFilePath, JSON.stringify(data, null, 2));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Redirect root to the /books endpoint
app.get("/", (_, res) => res.redirect("/books"));

// Endpoint to get all books in JSON format
app.get("/books", (_, res) => {
  const booksData = loadBooks();
  res.json(booksData.books);
});

// Endpoint to get a single book by ISBN
app.get("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const booksData = loadBooks();
  const book = booksData.books.find((b) => b.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  res.json(book);
});

// Endpoint to create a new book
app.post("/books", (req, res) => {
  const { isbn, title, year, author } = req.body;

  if (!isbn || !title || !year || !author) {
    return res.status(422).json({ error: "Alle Felder sind erforderlich." });
  }

  const booksData = loadBooks();
  const newBook = { isbn, title, year, author };
  booksData.books.push(newBook);
  saveBooks(booksData);

  res.status(201).json(newBook);
});

// Endpoint to update a book by overwriting it
app.put("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { title, year, author } = req.body;

  if (!title || !year || !author) {
    return res.status(422).json({ error: "Alle Felder sind erforderlich." });
  }

  const booksData = loadBooks();
  const bookIndex = booksData.books.findIndex((b) => b.isbn === isbn);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  const updatedBook = { isbn, title, year, author };
  booksData.books[bookIndex] = updatedBook;
  saveBooks(booksData);

  res.json(updatedBook);
});

// Endpoint to delete a book by ISBN
app.delete("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const booksData = loadBooks();
  const bookIndex = booksData.books.findIndex((b) => b.isbn === isbn);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  booksData.books.splice(bookIndex, 1);
  saveBooks(booksData);

  res.status(204).send();
});

// Endpoint to partially update a book
app.patch("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { title, year, author } = req.body;
  const booksData = loadBooks();
  const book = booksData.books.find((b) => b.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  if (title) book.title = title;
  if (year) book.year = year;
  if (author) book.author = author;

  saveBooks(booksData);
  res.json(book);
});

// Server starten
app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));


