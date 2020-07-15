const assert = require('assert');
const expect = require('chai').expect;

import { TermFrequency } from '../src/term-frequency';

describe('Term Frequency Test', () => {
    it('should count number of docs that contain "dog"', async () => {
        let tf = new TermFrequency('./data/tdIdf', 16);
        await tf.scan();
        let dog = tf.countDocs('dog');
        expect(dog).to.equal(2);
    });

    it('should count number of docs that contain "zebra"', async () => {
        let tf = new TermFrequency('./data/tdIdf', 16);
        await tf.scan();
        let dog = tf.countDocs('zebra');
        expect(dog).to.equal(0);
    });

    it('should calculate idf', async () => {
        let tf = new TermFrequency('./data/tdIdf', 16);
        await tf.scan();
        let idf = tf.calcIdf('fox');

        expect(idf).to.equal(Math.log(2/1));
    });

    it('should calculate idf 0 for missing term', async () => {
        let tf = new TermFrequency('./data/tdIdf', 16);
        await tf.scan();
        let idf = tf.calcIdf('zebra');

        expect(idf).to.equal(0);
    });

    it('should calculate idf for multiple terms', async () => {
        let expected = [
            { term: 'fox', idf: Math.log(2/1) }, 
            { term: 'zebra', idf: 0}];

        let tf = new TermFrequency('./data/tdIdf', 16);
        await tf.scan();
        let result = tf.calcIdfForTerms(['fox', 'zebra']);

        expect(result).to.eql(expected);
    });


    it('should order by tf-idf', async () => {
        let expected = [ 
            { fileName: 'doc2.txt', tfidf: 0.11 },
            { fileName: 'doc1.txt', tfidf: 0 } ];

        let tf = new TermFrequency('./data/tdIdf');
        await tf.scan();
        let result = tf.orderByTfIdf(['our']);
        
        expect(result).to.eql(expected);
    });

    it('should order by tf-idf and limit to 1 result', async () => {
        let expected = [ 
            { fileName: 'doc2.txt', tfidf: 0.11 }];

        let tf = new TermFrequency('./data/tdIdf');
        await tf.scan();
        let result = tf.orderByTfIdf(['our'], 1);
        
        expect(result).to.eql(expected);
    });

    it('should order by tf-idf for multiple terms', async () => {
        let expected = [ 
            { fileName: 'doc1.txt', tfidf: 0.04 },
            { fileName: 'doc2.txt', tfidf: 0 } ];

        let tf = new TermFrequency('./data/tdIdf');
        await tf.scan();
        let result = tf.orderByTfIdf(['jumped', 'over']);
        
        expect(result).to.eql(expected);
    });
});

