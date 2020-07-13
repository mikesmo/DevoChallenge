const assert = require('assert');
const expect = require('chai').expect;

import { TermFrequency } from '../src/term-frequency';

describe('Term Frequency Test', () => {
    it('should count number of docs that contain "dog"', async () => {
        let tf = new TermFrequency('./data/tdIdf');
        await tf.refresh();
        let dog = tf.countDocs('dog');
        expect(dog).to.equal(2);
    });

    it('should count number of docs that contain "zebra"', async () => {
        let tf = new TermFrequency('./data/tdIdf');
        await tf.refresh();
        let dog = tf.countDocs('zebra');
        expect(dog).to.equal(0);
    });

    it('should calculate idf', async () => {
        let tf = new TermFrequency('./data/tdIdf');
        await tf.refresh();
        let idf = tf.calcIdf('fox');
        expect(idf).to.equal(Math.log(2/1));
    });

    it('should calculate idf', async () => {
        let tf = new TermFrequency('./data/tdIdf');
        await tf.refresh();
        let idf = tf.calcIdf('zebra');
        expect(idf).to.equal(0);
    });

    it('should order by tf-idf', async () => {
        let expected = [ 
            { fileName: 'doc2.txt', tfidf: 0.11 },
            { fileName: 'doc1.txt', tfidf: 0 } ];

        let tf = new TermFrequency('./data/tdIdf');
        await tf.refresh();
        let result = tf.orderByTfIdf('our');
        
        expect(result).to.eql(expected);
    });
});

