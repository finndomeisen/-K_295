const express = require("express");
const path = require("path");
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
app.get("/", (_, res) => res.redirect("/books"));


app.get("/books", (_, res) => {
  const booksHtml = booksData.books
    .map(
      (book) =>
        `<li>
          Eindeutige ID des Buches: <strong>${book.isbn}</strong>
          Titel des Buches: <strong>${book.title}</strong>
          Erscheinungsjahr des Buches: <strong>${book.year}</strong>
          Name des Autors: <strong>${book.author}</strong>
          
         </li> `
    )

    .join("");

  res.send(`
    <h1>Übersicht</h1>
    <ul>${booksHtml}</ul>
  `);  
});



app.get("/api/books", (_, res) => {
  res.json(booksData);
});

// Server starten
app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
