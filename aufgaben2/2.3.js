async function simuliereVerzoegerung(ms) {
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log("Erwartete Ausgabe nach 5 Sekunden: Das Ergebnis ist: " + "result");
}
simuliereVerzoegerung();



function addiereNachVerzoegerung(a, b, ms) {
  console.log("meister")
}


/*Erstellen Sie eine asynchrone Funktion, die zwei Zahlen nach einer simulierten Verzögerung addiert und das Ergebnis ausgibt.

Schreiben Sie eine asynchrone Funktion simuliereVerzoegerung(ms).
Die Funktion soll eine Verzögerung von ms Millisekunden simulieren.
Schreiben Sie eine asynchrone Funktion addiereNachVerzoegerung(a, b, ms).
Die Funktion soll nach der Verzögerung `a` und `b` addieren und das Ergebnis ausgeben. 
addiereNachVerzoegerung(3, 7, 2000);
Erwartete Ausgabe nach 2 Sekunden: "Das Ergebnis ist: 10".*/
