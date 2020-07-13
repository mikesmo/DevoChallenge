"use strict";

const fs  = require('fs');

export class WordCounter {

    constructor(file, {chunkSize}) {
        this.file = file;
        this.chunkSize = chunkSize;
        this.lastChunk = "";
        this.totalWords = 0;
        this.words = new Map();
    }

    get wordCount() {
        return this.totalWords;
    }

    matches(word) {
        let matches = this.words.get(word);
        if (matches === undefined) {
            return 0;
        }
        return matches;
    }

    calcTf(word) {
        return this.matches(word) / this.totalWords;
    }

    async readFile() {
        let reader = fs.createReadStream(this.file, {highWaterMark: this.chunkSize });

        reader.on('data', (data) => this.onFileData(data));

        return new Promise((resolve, reject) => {
            reader.on('close', () => this.onFileClose(resolve));
		});
    }    

    onFileData(data) {
        let dataStr = data.toString();
        dataStr = dataStr.replace(/\W/g, " ");
        let chunks = dataStr.toString().split(" ");

        let word = this.lastChunk + chunks[0];
        this.addWord(word);
        for (let i = 1; i < chunks.length - 1; i++) {
            word = chunks[i];
            this.addWord(word);
        }
        this.lastChunk = chunks[chunks.length - 1];     
    }

    onFileClose(resolve) {
        this.addWord(this.lastChunk);
        resolve();
    }

    addWord(word) {
        if (word.length === 0) {
            return;
        }

        word = word.toLowerCase();

        let wordCount = this.words.get(word);
        if (wordCount === undefined) {
            this.words.set(word, 1);
        } else {
            this.words.set(word, ++wordCount);
        }

        this.totalWords++;
    }
}