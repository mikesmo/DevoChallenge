# Coding Challenge

## Requirements
- node: >= 12.16.1
- npm: >= 6

Install nvm package for exact node / nvm versions.
```
$ wget -qO- 
https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ nvm install 12.16.1
$ nvm use 12.16.1
```

## Tests

To run unit tests
```
$ npm test
```

## Palindrome

Detemines whether the input string is a palindrome. A string is a palindrome if the string matches the reverse of string. 
See: https://en.wikipedia.org/wiki/Palindrome

Complexity is O(n/2), where `n` is the number of characters.

To run:
```
$ node . palindrome 'nurses run'
```

## K-complementary 

Produces the K-complementary pairs for an array of integers.
Given Array A, pair (i, j) is K- complementary if K = A[i] + A[j];

Complexity is O(2n), where `n` is the size of the input array.

input parameters:
- k:  K-complementary value
- f, file: The input data for the command.

To run:
```
$ node . kcomplementary -k 7 -f ./data/test.json
```

## Tf/idf 

Tf/idf (term frequency / inverse document frequency) is an statistic that reflects the importance of a term T in a document D (or the relevance of a document for a searched term) relative to a document set S. 

https://en.wikipedia.org/wiki/Tf%E2%80%93idf

This algorithm has been extended to calculate tf/idf for a list of terms. The calulation for a document is the accumulated Tf/idf result of each term.
The program watches for new documents, and dynamically updates the computed tf/idf for each document and the inferred ranking. While scanning a document, it buffers 32 characters in memory, for more efficient use of memory.

Complexity is O(n*t), where `n` is the number of words in all the documents being sampled and `t` is the number of terms.

input parameters:
- d, dir:  The directory containing files to sample.
- n, num: The number of top results to show.
- p, period: The period in milliseconds to sample the directory.
- t, terms: A list of terms to be analyzed, separated by a white space.

To run:
```
$ node . tdidf -d ./data/tdidf -n 2 -p 5000 -t jumped house
```

Then in another console, add another document to the target directory.
```
$ cp ./data/doc3.txt ./data/tdIdf
```

Clean up
```
$ rm ./data/tdIdf/doc3.txt
```