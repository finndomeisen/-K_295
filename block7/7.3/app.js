const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session-Konfiguration
app.use(session({
    secret: "meinGeheimnis", // Wählen Sie ein sicheres Geheimnis
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Setzen Sie "true" in einer HTTPS-Umgebung
}));

// JSON-Dateipfade
const booksFilePath = path.join(__dirname, "books.json");
const lendsFilePath = path.join(__dirname, "lends.json");

// Hilfsfunktionen
function loadJSON(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Middleware zum Schutz der geschützten Endpunkte
function isAuthenticated(req, res, next) {
  if (!req.session.authenticated) {
    return res.status(401).json({ error: "Nicht authentifiziert. Bitte einloggen." });
  }
  next();
}

// Login-Endpunkt
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Beispielhafte Anmeldung (ersetzen durch echte Benutzerprüfung, ggf. aus einer Datenbank)
  if (email === "desk@library.example" && password === "m295") {
    req.session.authenticated = true;
    req.session.email = email; // Speichern der E-Mail in der Session
    return res.status(201).json({ message: "Erfolgreich eingeloggt." });
  } else {
    return res.status(401).json({ error: "Ungültige E-Mail oder Passwort." });
  }
});

// Logout-Endpunkt
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Fehler beim Abmelden." });
    }
    res.status(200).json({ message: "Erfolgreich abgemeldet." });
  });
});

// Name-Endpunkte
app.post("/name", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name ist erforderlich." });
  }
  req.session.name = name;
  res.status(200).json({ message: "Name in der Session gespeichert." });
});

app.get("/name", (req, res) => {
  if (!req.session.name) {
    return res.status(404).json({ error: "Kein Name in der Session gefunden." });
  }
  res.status(200).json({ name: req.session.name });
});

app.delete("/name", (req, res) => {
  if (!req.session.name) {
    return res.status(404).json({ error: "Kein Name in der Session vorhanden." });
  }
  delete req.session.name;
  res.status(200).json({ message: "Name aus der Session gelöscht." });
});

// Bücher-Endpunkte
app.get("/books", (_, res) => {
  const booksData = loadJSON(booksFilePath);
  res.json(booksData.books);
});

app.get("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const booksData = loadJSON(booksFilePath);
  const book = booksData.books.find((b) => b.isbn === isbn);

  if (!book) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  res.json(book);
});

// Ausleihen-Endpunkte (geschützt)
app.get("/lends", isAuthenticated, (_, res) => {
  const lendsData = loadJSON(lendsFilePath);
  res.json(lendsData.lends);
});

app.get("/lends/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const lendsData = loadJSON(lendsFilePath);
  const lend = lendsData.lends.find((l) => l.id === id);

  if (!lend) {
    return res.status(404).json({ error: "Ausleihe nicht gefunden" });
  }

  res.json(lend);
});

app.post("/lends", isAuthenticated, (req, res) => {
  const { customer_id, isbn } = req.body;
  if (!customer_id || !isbn) {
    return res.status(422).json({ error: "customer_id und isbn sind erforderlich." });
  }

  const booksData = loadJSON(booksFilePath);
  const lendsData = loadJSON(lendsFilePath);

  const book = booksData.books.find((b) => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ error: "Buch nicht gefunden" });
  }

  const isBookLent = lendsData.lends.some((l) => l.isbn === isbn && !l.returned_at);
  if (isBookLent) {
    return res.status(409).json({ error: "Buch ist bereits ausgeliehen." });
  }

  const customerLends = lendsData.lends.filter((l) => l.customer_id === customer_id && !l.returned_at);
  if (customerLends.length >= 3) {
    return res.status(409).json({ error: "Ein Kunde kann maximal drei offene Ausleihen haben." });
  }

  const newLend = {
    id: (lendsData.lends.length + 1).toString(),
    customer_id,
    isbn,
    borrowed_at: new Date().toISOString(),
    returned_at: null
  };

  lendsData.lends.push(newLend);
  saveJSON(lendsFilePath, lendsData);

  res.status(201).json(newLend);
});

app.delete("/lends/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  const lendsData = loadJSON(lendsFilePath);
  const lendIndex = lendsData.lends.findIndex((l) => l.id === id);

  if (lendIndex === -1) {
    return res.status(404).json({ error: "Ausleihe nicht gefunden" });
  }

  if (lendsData.lends[lendIndex].returned_at) {
    return res.status(409).json({ error: "Buch wurde bereits zurückgebracht." });
  }

  lendsData.lends[lendIndex].returned_at = new Date().toISOString();
  saveJSON(lendsFilePath, lendsData);

  res.status(200).json(lendsData.lends[lendIndex]);
});

// Server starten
app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
