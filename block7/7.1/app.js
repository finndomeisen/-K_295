const express = require("express");
const basicAuth = require("express-basic-auth");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();

// Middleware-Konfiguration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Umgebungsvariablen oder Standardwerte
const USERNAME = process.env.AUTH_USER || "zli";
const PASSWORD = process.env.AUTH_PASS || "zli1234";

// Basic Auth Middleware
const authMiddleware = basicAuth({
  users: { [USERNAME]: PASSWORD },
  challenge: true, // Fordert den Browser zur Eingabe von Anmeldedaten auf
  unauthorizedResponse: (req) => "Zugriff verweigert: Ungültige Anmeldedaten",
});

// Swagger-UI einrichten
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Öffentlicher Endpunkt
app.get("/public", (req, res) => {
  res.json({ message: "Willkommen im öffentlichen Bereich!" });
});

// Privater Endpunkt
app.get("/private", authMiddleware, (req, res) => {
  res.json({ message: "Willkommen im privaten Bereich!" });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
