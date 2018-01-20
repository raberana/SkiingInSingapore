import * as fs from 'fs';

export class FileHelper {

    filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    parseContent(): number[] {
        console.log(`Loading ${this.filePath} ....`);
        var contents = fs.readFileSync(this.filePath, 'utf8'); // yes, i know, this is bad
        contents = '[' + contents.replace(/\n| /g, ',').slice(0, -1) + ']';
        return JSON.parse(contents);
    }
}
