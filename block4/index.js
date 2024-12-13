const express = require("express");
const { DateTime } = require("luxon"); // Luxon importieren
const app = express();

app.use(express.urlencoded({ extended: true })); // Middleware für Form-Daten

//now für Zeit mit optionaler Zeitzone
app.get("/now", (req, res) => {
  const tz = req.query.tz || "UTC"; // Standardmässig UTC verwenden
  
  try {
    const date = DateTime.now().setZone(tz);
    res.json({ time: date.toISO(), timezone: tz }); // ISO-Zeitformat und Zeitzone zurückgeben
  } catch (error) {
    res.status(400).json({ error: "Ungültige Zeitzone." }); // Fehler bei ungültiger Zeitzone
  }
});

//zli für Zli-Seite
app.get("/zli", (req, res) => {
  res.redirect("https://www.zli.ch/");
});

//Namen Array für Random Name
const names = [
  "Max", "Mischa", "Noah", "Beda", "Fabio", "Cyrill", "Miro", "Lairent", "Maté", "Antoine",
  "Finn", "Lorena", "HoneyPuu", "Nino", "Costa", "Cristiano", "Leon", "Eric", "Dave", "Leo"
];

//name für Random Name
app.get("/name", (req, res) => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  res.json({ name: randomName });
});

// POST /names fügt einen neuen Namen hinzu
app.post("/names", (req, res) => {
  const newName = req.body.name;
  if (newName && typeof newName === "string" && newName.trim() !== "") {
    names.push(newName.trim());
    res.status(201).json({ message: "Name hinzugefügt.", names });

  } else {

    res.status(400).json({ error: "Ungültiger Name." });
  }
});


// DELETE /names entfernt einen Namen
app.delete("/names", (req, res) => {
  const nameToDelete = req.query.name;
  if (nameToDelete && typeof nameToDelete === "string" && nameToDelete.trim() !== "") {
    const index = names.indexOf(nameToDelete.trim());
    if (index !== -1) {
      names.splice(index, 1);
      res.status(204).send(); // Kein Inhalt zurückgeben
    } else {
      res.status(404).json({ error: "Name nicht gefunden." });
    }
  } else {
    res.status(400).json({ error: "Ungültiger Name." });
  }
});


//Übersicht auf Hauptseite
app.get("/", (req, res) => {
  res.send(
    "<h1>Übersicht</h1>" +
      "<ul>" +
      "<li><a href='/now'>/now</a>: Zeigt die aktuelle Zeit an (optional ?tz=Zeitzone).</li>" +
      "<li><a href='/zli'>/zli</a>: Leitet zur ZLI-Website weiter.</li>" +
      "<li><a href='/name'>/name</a>: Gibt einen zufälligen Namen zurück.</li>" +
      "<li>/names (POST): Fügt der Liste einen neuen Namen hinzu.</li>" +
      "<li>/names (DELETE): Entfernt einen Namen aus der Liste.</li>" +
      "</ul>"
  );
});

//startet Server
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});

