import { existsSync, readdirSync, readFileSync } from 'fs';

export class FormParser {

    constructor() {}

    public parseFile(fileName: string) {
        console.log(fileName);
        if (!existsSync(`upload/${fileName}`)) {
            console.log("nu exista fisierul");
            return;
        }
        const rawData = readFileSync(`upload/${fileName}`, 'utf-8');
        const data = rawData.split('\n');
        const globalIndex = 0;
        const details: any = {};

        for (let i = globalIndex; i <= 6; i++) {
            const result = data[i].split('=');
            details[result[0].trim()] = result[1].trim();
        }
        return details;
    }
}