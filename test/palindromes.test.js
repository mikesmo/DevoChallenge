const assert = require('assert');
const expect = require('chai').expect;

require('@babel/register')();

const { isPalindrome } = require('../src/palindromes');

describe('Palindromes Test', () => {
    it('should return false for odd length text', () => {
        let text = 'abbaf';
        let result = isPalindrome(text);
        expect(result).to.be.false;
    });

    it('should return false for "abcd"', () => {
        let text = 'abcd';
        let result = isPalindrome(text);
        expect(result).to.be.false;
    });

    it('should return false for "abca"', () => {
        let text = 'abca';
        let result = isPalindrome(text);
        expect(result).to.be.false;
    });

    it('should return true for "abba"', () => {
        let text = 'abba';
        let result = isPalindrome(text);
        expect(result).to.be.true;
    });
});