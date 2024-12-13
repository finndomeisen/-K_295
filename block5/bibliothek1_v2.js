const express = require("express");
const app = express();

const booksData = require("./books.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
isbn: Eindeutige ID des Buches
title: Titel des Buches
year: Erscheinungsjahr des Buches
author: Name des Autors
*/

// Redirect root to the /books endpoint
app.get("/", (_, res) => res.redirect("/books"));

// Endpoint to get all books in JSON format
app.get("/books", (_, res) => {
  res.json(booksData.books);
});

// Endpoint to get a single book by ISBN
app.get("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const book = booksData.books.find((b) => b.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  res.json(book);
});

// Server starten
app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
