const assert = require('assert');
const expect = require('chai').expect;

require('@babel/register')();

const { isKComplementary } = require('../src/k-complementary');

describe('K-Complementary Test', () => {
    it('should return err when k is less than any of the array values', () => {
        let array = [6];

        isKComplementary(array, 5, (err, result) => {
            expect(err).to.eql("array value 6 at index 0 is less than k of 5");
            expect(result).to.equal(null);
        });
    });

    it('should set null for value with no complement', () => {
        let array = [2, 0, 3];
        let expected = [ 2, null, 0];

        isKComplementary(array, 5, (err, result) => {
            expect(err).to.equal(null);
            expect(result).to.eql(expected);
        });
    });

    it('should return k-complementary array', () => {
        let array = [0, 2, 3, 4, 5, 7];
        let expected = [ 5, 4, 3, 2, 1, 0 ];

        isKComplementary(array, 7, (err, result) => {
            expect(err).to.equal(null);
            expect(result).to.eql(expected);
        });
    });
});