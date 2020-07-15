const assert = require('assert');
const expect = require('chai').expect;

const { isPalindrome } = require('../src/palindromes');

describe('Palindromes Test', () => {
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

    it('should return true text with white space "abba "', () => {
        let text = 'abba ';
        let result = isPalindrome(text);
        expect(result).to.be.true;
    });

    it('should return true text with white space "abba "', () => {
        let text = 'nurses run';
        let result = isPalindrome(text);
        expect(result).to.be.true;
    });
});