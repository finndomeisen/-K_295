function verdoppeln(num) {
  let sum = num * 2;
  return sum;
}

let result = verdoppeln (5);
verdoppeln(result)

console.log(result);



/*

Schreiben Sie eine Funktion verdoppeln(zahl, callback).
Die Funktion soll zahl verdoppeln.
Anschliessend soll die callback-Funktion aufgerufen werden.
Die callback-Funktion soll das Ergebnis ausgeben:
verdoppeln(5, function(ergebnis) {
  console.log('Das Ergebnis ist:', ergebnis);
});

*/