const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send("getData");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});





async function getData() {

  const url = "https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=882000";


  try {
    const response = await fetch(url)
    if (response.code !== 200) {
      console.error(response.code)
      
    }
    else {
      const data = await response.json()
      //console.log(data)
      //console.log(temperature)
      console.log("linganguli guli wata lingang gu lingang gu")
    }
  } catch(error) {
    console.error(error)
  }


    fetch(url)
  .then(function() {

  })
  .catch(function() {

  });


  const ul = document.getElementById('temperature');


}

getData();








