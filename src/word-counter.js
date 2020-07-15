"use strict";

const fs  = require('fs');

/**
 * Description. Class for counting the frequency of a word in a document.
 */
export class WordCounter {

    /**
     * @param  {String} file      File path of the target file.
     * @param  {String} chuckSize The number of characters to buffer in memory while scanning a document.
     */
    constructor(file, {chunkSize}) {
        this.file = file;
        this.chunkSize = chunkSize;
        this.lastChunk = "";
        this.totalWords = 0;
        this.words = new Map();
    }

    /**
     * Description. Returns the number of words in the document.
     * @return {Integer}   The total number of words.
     */
    get wordCount() {
        return this.totalWords;
    }

    /**
     * Description. Returns the number of words in the document.
     */
    matches(word) {
        let matches = this.words.get(word);
        if (matches === undefined) {
            return 0;
        }
        return matches;
    }

    /**
     * Description. Returns a Map of terms and their calculated tf values.
     * @param  {Array<String>}  terms   The terms.
     * @return {Map<String, Integer>}   Map of terms and their calculated tf values.
     */
    calcTfMap(terms) {
        let tfMap = new Map();

        terms.forEach(term => {
            let tf = this.calcTf(term);
            tfMap.set(term, tf)
        });

        return tfMap;
    }

    /**
     * Description. Returns the calculated tf value for the given term.
     * @param  {String}  term   The term.
     * @return {Number}  The calculated tf value.
     */
    calcTf(term) {
        return this.matches(term) / this.totalWords;
    }

    /**
     * Description. Reads the file, adding each unique word in memory.
     */
    async readFile() {
        let reader = fs.createReadStream(this.file, {highWaterMark: this.chunkSize });

        reader.on('data', (data) => this.onFileData(data));

        return new Promise((resolve, reject) => {
            reader.on('close', () => this.onFileClose(resolve));
		});
    }

    /**
     * Description. Reads a block of text, and adds each unique word in memory.
     * @param  {String}  data   A block of text.
     */
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

    /**
     * Description. Adds the last word to memory
     * @param  {String}  data     A block of text.
     * @param {Function} resolve  promise callback.
     */
    onFileClose(resolve) {
        this.addWord(this.lastChunk);
        resolve();
    }

    /**
     * Description. Records a new word with the number of times it has occured.
     * @param  {String}  word  The word.
     */
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
