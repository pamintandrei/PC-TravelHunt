import { FormParser } from "./parser/FormParser";
import fetch from 'node-fetch';
import { existsSync, readdirSync, readFileSync } from 'fs';

const directoryPath = "upload"
async function runAdd() {

  const fileNames = readdirSync(directoryPath);
  const parser = new FormParser();

  for (let fileName of fileNames) {
    const details = parser.parseFile(fileName);
    const url = "localhost:3000/Building"
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(details),
      headers: {
        'accept': 'application/json',
        'content-Type': 'application/json'
      },
    });
    if(!response.ok){
      throw new Error(' SERVER Error');
    }
  }
}

runAdd().then(_ => console.log("finished"));