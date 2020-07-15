#!/usr/bin/env node

const { program } = require('commander');
const { isPalindrome } = require('../src/palindromes');
const { kComplementary } = require('../src/k-complementary');
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
    .option('-k, --k <k>', 'k value.')
    .option('-f, --file <file>', 'A json file containing an array of integers.')
    .action(function (cmd) {
        let array  = require(`../${cmd.file}`);

        kComplementary(array, cmd.k, (err, result) => {
            if (err !== null) {
                console.log(err);
                return [];
            }
            console.log(result);
            return result;
        });
    });

program
    .command('tdidf')
    .option('-d, --dir <dir>', 'Directory of documents.')
    .option('-n, --num <num>', 'The number of top results to show.')
    .option('-p, --period <period>', 'The period in milliseconds to sample the directory.')
    .option('-t, --terms <terms>', 'A list of terms to be analyzed, separated by a white space.')
    .action(function (cmd) {
        let limit = parseInt(cmd.num);
        if (isNaN(limit)) {
            return console.log(`-n '${cmd.num}' is not an integer.`)
        }

        let period = parseInt(cmd.period);
        if (isNaN(period)) {
            return console.log(`-p '${cmd.period}' is not an integer.`)
        }

        let terms = cmd.terms.split(" ");

        let tf = new TermFrequency(cmd.dir, 64);

        let tdIdfDaemon = async (dir) => {
            await tf.scan();

            let files = tf.orderByTfIdf(terms, limit);
            files.forEach(file => {
                console.log(`${file.fileName} ${file.tfidf}`);
            });
            console.log('');
        }

        tdIdfDaemon(cmd.dir);
        setInterval(() => {
                tdIdfDaemon(cmd.dir);
            }, period); 

    });

program.parse(process.argv);
