// Bei CommonJS (Standard in älteren Node.js-Versionen)
const fetch = require('node-fetch'); // Stelle sicher, dass `node-fetch` installiert ist

async function getData() {
  const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=818000";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const temperature = json.currentWeather.temperature;
    console.log(`In 8180 ist es aktuell ${temperature}°C Grad.`);

  } catch (error) {
    console.error(`Fehler: ${error.message}`);
  }
}

getData();

