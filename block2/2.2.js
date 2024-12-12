const fs = require("node:fs");

const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
async function logFile() {
  try {
    const filePath = resolve('./beispiel.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
}
logFile();



function leseDateiInhalt(logFile) {
  let length = logFile;
  return length
} 




let filepath = resolve("./beispiel.txt");
leseDateiInhalt(filepath)

console.log(filepath)


let text = "Hello";
let length = text.length;
console.log(length)




/* 
Erstellen Sie eine Funktion, die mit Hilfe von Promises den Inhalt einer Datei ausliest und dann dessen Länge ausgibt.

Verwenden Sie das fs Modul von Node.js mit const fs = require('node:fs');
Schreiben Sie eine Funktion leseDateiInhalt(filepath).
Die Funktion soll den Dateiinhalt als Promise zurückgeben.
Verarbeiten Sie die Promise, um die Länge des Dateiinhalts auszugeben.  */