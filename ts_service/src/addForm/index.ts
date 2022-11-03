import { FormParser } from "./parser/FormParser";
import { existsSync, readdirSync, readFileSync } from 'fs';

const directoryPath="upload"
async function runAdd() {

    const fileNames = readdirSync(directoryPath);
    const parser=new FormParser();

    for ( let fileName of fileNames) {
        const details=parser.parseFile(fileName);
        //await insert to database
        console.log(details);
      }
}

runAdd().then(_=> console.log("finished"));