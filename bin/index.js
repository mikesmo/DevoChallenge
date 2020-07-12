#!/usr/bin/env node

require('@babel/register')();

const program = require('commander');
const { isPalindrome } = require('../src/palindromes');
const { isKComplementary } = require('../src/k-complementary');


program
    .command('palindrome <text>')
    .action(function (text) {
        let result = isPalindrome(text);  
        console.log(result);

        if (result) {
            return 0;
        } 
        return 1;
    });

program
    .command('kcomplementary')
    .option('--k <k>', 'k value.')
    .option('--file <file>', 'a json file containing an array of integers.')
    .action(function (cmd) {
        let array  = require(`../${cmd.file}`);

        isKComplementary(array, cmd.k, (err, result) => {
            if (err !== null) {
                console.log(err);
                return [];
            }
            console.log(result);
            return result;
        });
    });

program.parse(process.argv);
