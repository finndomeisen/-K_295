const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
async function logFile() {
  try {
    const filePath = resolve('./beispiel.txt');
    const contents = await readFile(filePath, { encoding: 'utf8' });

    console.log(contents);
    let text = contents;
    let length = text.length;
    console.log(length);


  } catch (err) {
    console.error(err.message);
  }
}

logFile();

