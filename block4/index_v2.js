const express = require("express");
const https = require("https");
const { DateTime } = require("luxon");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Namen Array
const names = [
  "Max", "Mischa", "Noah", "Beda", "Fabio", "Cyrill", "Miro", "Lairent", "Maté", "Antoine",
  "Finn", "Lorena", "HoneyPuu", "Nino", "Costa", "Cristiano", "Leon", "Eric", "Dave", "Leo"
];

// Objekt für /me Endpunkt
let me = {
  name: "Finn Domeisen",
  age: 16,
  location: "Schweiz"
};

app.get("/now", (req, res) => {
  const tz = req.query.tz || "UTC"; // Standard: UTC

  try {
    // Überprüfung, ob die angegebene Zeitzone gültig ist
    if (!DateTime.local().setZone(tz).isValid) {
      throw new Error("Ungültige Zeitzone");
    }

    const currentTime = DateTime.now().setZone(tz).toISO();
    res.json({ time: currentTime, timezone: tz });
  } catch (error) {
    res.status(400).json({ error: "Ungültige Zeitzone." });
  }
});

// Endpunkt: Weiterleitung zur ZLI-Seite
app.get("/zli", (_, res) => res.redirect("https://www.zli.ch/"));

// Endpunkt: Zufälliger Name aus der Liste
app.get("/name", (_, res) => {
  res.json({ name: names[Math.floor(Math.random() * names.length)] });
});

// Endpunkt: Neuen Namen hinzufügen
app.post("/names", (req, res) => {
  const newName = req.body.name?.trim();
  if (newName) {
    names.push(newName);
    res.status(201).json({ message: "Name hinzugefügt.", names });
  } else {
    res.status(400).json({ error: "Ungültiger Name." });
  }
});

// Endpunkt: Namen aus der Liste entfernen
app.delete("/names", (req, res) => {
  const nameToDelete = req.query.name?.trim();
  const index = names.indexOf(nameToDelete);
  if (index !== -1) {
    names.splice(index, 1);
    res.status(204).send();
  } else if (nameToDelete) {
    res.status(404).json({ error: "Name nicht gefunden." });
  } else {
    res.status(400).json({ error: "Ungültiger Name." });
  }
});

// Endpunkt: Secret2 mit Header Authorization
app.get("/secret2", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "Basic aGFja2VyOjEyMzQ=") {
    res.status(200).send("Authorized");
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Endpunkt: Chuck Norris Witz
app.get("/chuck", (req, res) => {
  const name = req.query.name || "Chuck Norris";
  const url = "https://api.chucknorris.io/jokes/random";

  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const joke = JSON.parse(data).value.replace(/Chuck Norris/g, name);
        res.json({ joke });
      } catch {
        res.status(500).json({ error: "Fehler beim Abrufen des Witzes." });
      }
    });
  }).on("error", () => {
    res.status(500).json({ error: "Fehler beim Abrufen des Witzes." });
  });
});

// Endpunkt: Me-Objekt aktualisieren
app.patch("/me", (req, res) => {
  const updates = req.body;
  if (updates && typeof updates === "object") {
    me = { ...me, ...updates };
    res.json({ message: "Me-Objekt aktualisiert.", me });
  } else {
    res.status(400).json({ error: "Ungültige Daten." });
  }
});

// Übersichtshauptseite
app.get("/", (_, res) => {
  res.send(
    `<h1>Übersicht</h1>
     <ul>
       <li><a href='/now?tz=Europe/Zurich'>/now</a>: Zeigt die aktuelle Zeit (optional ?tz=Zeitzone).</li>
       <li><a href='/zli'>/zli</a>: Weiterleitung zur ZLI-Website.</li>
       <li><a href='/name'>/name</a>: Gibt einen zufälligen Namen zurück.</li>
       <li>/names (POST): Fügt der Liste einen neuen Namen hinzu.</li>
       <li>/names (DELETE): Entfernt einen Namen aus der Liste.</li>
       <li>/secret2: Autorisiert mit Header "Authorization".</li>
       <li><a href='/chuck'>/chuck</a>: Gibt einen Chuck Norris Witz zurück (optional ?name=Name).</li>
       <li>/me (PATCH): Aktualisiert das Me-Objekt.</li>
     </ul>`
  );
});

// Server starten
app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));

