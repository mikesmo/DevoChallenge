#!/usr/bin/env node

require('@babel/register')();

const program = require('commander');
const {
    isPalindrome,
} = require('../src/palindromes');

program
    .version('0.1.0')
    .command('palindrome <text>')
    .action(function (text) {
        let result = isPalindrome(text);    
        console.log('%s', result);
    });

program.parse(process.argv);
