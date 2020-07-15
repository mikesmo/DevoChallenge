"use strict";

const fs = require('fs');
import { WordCounter } from './word-counter';

/**
 * Description. Class for calculating the (term frequency / inverse document frequency) of terms in documents for a given directory. 
 */
export class TermFrequency {

    /**
    * @param  {String} directory Target file directory of text documents to analyse.
    * @param  {String} chuckSize The number of characters to buffer in memory while scanning a document.
    */
    constructor(directory, chuckSize) {
        this.directory = directory;
        this.files = new Map();
        this.words = new Map();
        this.chuckSize = chuckSize;
    }

    /**
    * Description. Scans a the target directory and reads each text file once.  
    */
    async scan() {
        let files = fs.readdirSync(this.directory);

        // Ignore hidden files.
        files = files.filter(file => !(/(^|\/)\.[^\/\.]/g).test(file));

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            let filePath = `${this.directory}/${fileName}`;

            // Ignore files that have already been analysed.
            if (this.files.get(fileName)) {
                break;
            }

            let file = new WordCounter(filePath, {chunkSize: this.chuckSize});
            await file.readFile();
            this.files.set(fileName, file);
        }
    }

    /**
    * Description. Returns the file names of files in the target directory.
    * @return {Array<String>} file names.
    */
    fileNames() {
        return this.files.keys();
    }

    /**
    * Description. Counts how many documents contain a term.
    * @return {Integer} The number of documents.
    */
    countDocs(term) {
        let count = 0;
        for (let file of this.files.values()) {
            if (file.matches(term)) {
                count++;
            }
        }
        return count;
    }

    /**
     * Description. Calculates the idf for the given array of terms for the target directory of documents.
     * @param  {Array<String>}  An array of terms.
     * @return {Array<Object>} An array of idf term values.
     */
    calcIdfForTerms(terms) {
        return terms.map(t => { 
                return {term: t, idf: this.calcIdf(t)}; 
            });
    }

    /**
     * Description. Calculates the idf for a term across all documents in the target directory.
     * @param  {String}     The term.
     * @return {Number}     The calculated idf value.
     */
    calcIdf(term) {
        let termDocCount = this.countDocs(term);
        if (termDocCount === 0) {
            return 0;
        }

        let numOfDocs = this.files.size;
        return Math.log(numOfDocs / termDocCount);
    }

    /**
     * Description. Orders the documents by their tf/idf value. Highest being first.
     * @param  {Array<String>}  An array of terms.
     * @param  {Integer}        Limits the resulting documents to be returned.
     * @return {Array<Object>}  An array of document file names and their calculated tf/idf values.
     */
    orderByTfIdf(terms, limit) {

        // If not limit parameter is defined then don't limit the result.
        if (limit === undefined) {
            limit = this.files.size;
        }

        let values = [];

        // Calculates the idf values for each terms in the target directory of documents.
        let idfArray = this.calcIdfForTerms(terms);

        for (let fileName of this.fileNames()) {
            let file = this.files.get(fileName);

            // Generate a map of tf values for the given terms.
            let tfMap = file.calcTfMap(terms);

            let tfidf = 0;
            idfArray.forEach(item => {
                let idf =  item.idf;
                let tf = tfMap.get(item.term);

                // accumulate the calculated tf/idf value for this file.
                tfidf =+ idf * tf;
            });

            // limit the calculated tf/idf value to 2 decimal places
            tfidf = Math.floor(tfidf * 100) / 100;

            values.push({fileName, tfidf});
        }

        // return the sorted result that is limited by the top values.
        return values.sort(v => -1 * v.tfidf).slice(0, limit);
    }
}
