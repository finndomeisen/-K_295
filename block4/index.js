const express = require("express");
const { DateTime } = require("luxon"); // Luxon importieren
const app = express();

//now für Zeit mit optionaler Zeitzone
app.get("/now", (req, res) => {
  const tz = req.query.tz || "UTC"; // Standardmäßig UTC verwenden
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

//Übersicht auf Hauptseite
app.get("/", (req, res) => {
  res.send(
    "<h1>Übersicht</h1>" +
      "<ul>" +
      "<li><a href='/now'>/now</a>: Zeigt die aktuelle Zeit an (optional ?tz=Zeitzone).</li>" +
      "<li><a href='/zli'>/zli</a>: Leitet zur ZLI-Website weiter.</li>" +
      "<li><a href='/name'>/name</a>: Gibt einen zufälligen Namen zurück.</li>" +
      "</ul>"
  );
});

//startet Server
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
