const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send("getData");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
return parent.appendChild(el);
}

const ul = document.getElementById('temperature');
const url = 'https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=882000';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
let temperature = data.results;
return temperature.map(function(temperature) {
  let li = createNode('li');

  let span = createNode('span');

  span.innerHTML = `${temperature.name.first} ${temperature.name.last}`;

  append(li, span);
  append(ul, li);
})
})
.catch(function(error) {
console.log(error);
});


