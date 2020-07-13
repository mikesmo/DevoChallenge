#!/usr/bin/env node

require('@babel/register')();

const program = require('commander');
const { isPalindrome } = require('../src/palindromes');
const { isKComplementary } = require('../src/k-complementary');

import { TermFrequency } from '../src/term-frequency';

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

program
    .command('tdIdf')
    .option('--dir <dir>', 'Directory of documents.')
    .action(function (cmd) {
        let fs = require('fs');
        console.log(cmd.dir);
        let files = fs.readdirSync(cmd.dir);
        console.log(files);
        let freq = new TermFrequency(files);
        let x = freq.getFiles();
        console.log({x});
    });

program.parse(process.argv);
