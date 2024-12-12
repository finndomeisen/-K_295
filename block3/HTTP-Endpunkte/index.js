/*
Implementieren Sie folgende Endpunkte mit express.js. Beachten Sie dabei die korrekten HTTP Status-Codes und Content-Types in den Header zu definieren.

Einen Endpunkt /now, der die aktuelle Zeit zurück gibt.
Einen Endpunkt /zli, der den Benutzer auf die ZLI Webseite https://www.zli.ch weiterleitet.
Einen Endpunkt /name, der aus einer Liste von mindestens 20 Namen einen auswählt und zurückgibt.
Einen Endpunkt /html, der statisches HTML aus einer Datei vom Server zurück gibt.
Einen Endpunkt /image, der ein Bild zurückgibt, welches im Browser angezeigt wird.
Einen Endpunkt /teapot, der den Status 418 zurück gibt.
Einen Endpunkt /user-agent, der den Browser aus dem Request ausliest und zurück gibt.
Einen Endpunkt /secret, der immer den Status 403 zurück gibt.
Einen Endpunkt /xml, der eine statische XML Datei vom Server zurück gibt.
Einen Endpunkt /me, der ein JSON Objekt zurück gibt mit den Properties Vor- und Nachname, Alter, Wohnort und Augenfarbe.
*/

//const fetch = require('node-fetch'); // Stelle sicher, dass `node-fetch` installiert ist

const express = require('express');
const app = express();
const PORT = 3000;

// Without middleware
app.get('/', function (req, res) {
  res.send("Geben sie die gewünsche Seite ein.")
});


app.get("/now", function (req, res) {
  function aktuelle_zeit() {
    let jetzt = new Date();
    let uhrzeit = jetzt.toLocaleTimeString();
    console.log(uhrzeit); 
    return uhrzeit; // Return the time as a string
  }
  res.send(aktuelle_zeit()); // Call the function and send its return value
});



app.get('/zli', (req, res) => {
  res.redirect('https://www.google.com');
});




app.get('/user', function (req, res) {
  res.send("Redirected to User Page");
});



app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});








