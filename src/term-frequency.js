"use strict";

const fs = require('fs');
import { WordCounter } from './word-counter';

export class TermFrequency {

    constructor(directory) {
        this.directory = directory;
        this.files = new Map();
        this.words = new Map();
    }

    async refresh() {
        let files = fs.readdirSync(this.directory);

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            let filePath = `${this.directory}/${fileName}`

            let file = new WordCounter(filePath, {chunkSize: 16});
            await file.readFile();
            this.files.set(fileName, file);
        }
    }

    fileNames() {
        return this.files.keys();
    }

    countDocs(term) {
        let count = 0;
        for (let file of this.files.values()) {
            if (file.matches(term)) {
                count++;
            }
        }
        return count;
    }

    calcIdf(term) {
        let termDocCount = this.countDocs(term);
        if (termDocCount === 0) {
            return 0;
        }

        let numOfDocs = this.files.size;
        return Math.log(numOfDocs / termDocCount);
    }

    orderByTfIdf(term) {
        let values = [];       
        let idf = this.calcIdf(term);
        for (let fileName of this.fileNames()) {
            let file = this.files.get(fileName);
            let tf = file.calcTf(term);
            let tfidf = idf * tf;
            tfidf = Math.floor(tfidf * 100) / 100;
            values.push({fileName, tfidf});
        }
        return values.sort((a, b) => (a.tfidf < b.tfidf));
    }

}