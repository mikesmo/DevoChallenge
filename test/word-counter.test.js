const assert = require('assert');
const expect = require('chai').expect;

import { WordCounter } from '../src/word-counter';

let resolve = () => {};

describe('Word Counter Test', () => {
    it('should count total words', () => {
        let counter = new WordCounter('file', {chunkSize: 16});
        counter.onFileData('hello world');
        counter.onFileClose(resolve);

        expect(counter.wordCount).to.equal(2)
    });

    it('should only count words with alphabetical characters', () => {
        let counter = new WordCounter('file', {chunkSize: 16});
        counter.onFileData('hello world\n John doe.');
        counter.onFileClose(resolve);

        let worldMatch = counter.matches("world");
        let johnMatch = counter.matches("john");
        let doeMatch = counter.matches("doe");

        expect(worldMatch).to.equal(1);
        expect(johnMatch).to.equal(1);
        expect(doeMatch).to.equal(1);
    });

    it('should count the number of times a word matches', () => {
        let counter = new WordCounter('file', {chunkSize: 16});
        counter.onFileData('hello world hello.');
        counter.onFileClose(resolve);

        let matches = counter.matches("hello");

        expect(matches).to.equal(2)
    });

    it('should calcuate TF', () => {
        let counter = new WordCounter('file', {chunkSize: 16});
        counter.onFileData('hello world hello.');
        counter.onFileClose(resolve);

        let tf = counter.calcTf("hello");

        expect(tf).to.equal(2/3)
    });

    it('should generate TF Map for array of terms', () => {
        let expected = { 
            hello: 2/3,
            world: 1/3 };

        let counter = new WordCounter('file', {chunkSize: 16});
        counter.onFileData('hello world hello.');
        counter.onFileClose(resolve);

        let result = counter.calcTfMap(['hello', 'world']);

        let resultObj = Object.fromEntries(result.entries());
        expect(resultObj).to.eql(expected);
    });
});