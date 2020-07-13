#!/usr/bin/env node

const { program } = require('commander');
const { isPalindrome } = require('../src/palindromes');
const { isKComplementary } = require('../src/k-complementary');
const fs = require('fs');

import { TermFrequency } from '../src/term-frequency';
import { WordCounter } from '../src/word-counter';

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
        let files = fs.readdirSync(cmd.dir);
        files = files.map(file => `${cmd.dir}/${file}`);

        //let freq = new WordCounter(files[0], {chunkSize: 16});
        //freq.readFile();

        test(cmd);
    });

async function test(cmd) {
    let tf = new TermFrequency(cmd.dir);
    await tf.refresh();
    let sort = tf.orderByTfIdf('our');
    console.log({sort});
}

program.parse(process.argv);
