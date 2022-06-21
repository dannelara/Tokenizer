# Tokenizer-backend

## Description

This library helps tokenize a string into tokens with the help of the user given grammar. With the created object, you can traverse all created tokens.

## How to use

Run the following npm command to install the npm package:

```
npm install mytokenizerdaniel --save
```

NOTE!:
In order to make it work with react you'll have to set the react target to es6.

```js
import { Tokenizer } from 'myTokenizerDaniel'

const grammar = [{ type: 'NUMBER', regExp: /^[0-9]+(\.([0-9])+)?/ }, { type: 'ADD', regExp: /^[+]/ }]

const mathTokenizer = new Tokenizer(mathGrammar,'3.14 + 5')

      try {

     // Load the first token in the string,
    mathTokenizer.loadFirstToken()
    let activeToken = matTokenizer.getActiveToken()
    // Set the next token in line to active.
    mathTokenizer.setNextTokenActive()
    // Sets previus token to the active.
    mathTokenizer.setPrevTokenActive()

        } catch(err) (
          console.err(err.message)
        )

```

## Methods and their use

| Method Name                             | Class name | Used when                                                                                                                                                                                                                                                              |
| --------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getActiveToken`                        | Tokenizer  | we want to get the active token.                                                                                                                                                                                                                                       |
| `setNextTokenActive`                    | Tokenizer  | we want to set the token next in line to active.                                                                                                                                                                                                                       |
| `setPrevTokenActive`                    | Tokenizer  | we want to set the previus token active token.                                                                                                                                                                                                                         |
| `getFirstTokenMatchInString`            | Tokenizer  | we want to scan the string's first word and match it for a token type.                                                                                                                                                                                                 |
| `getLongestMatchAndSliceString`         | Tokenizer  | a word matches multiple types, this method will filter the one with the longest match.                                                                                                                                                                                 |
| `loadFirstToken`                        | Tokenizer  | we want to load the first token in the string.                                                                                                                                                                                                                         |
| `isFirstTokenInHistory`                 | Tokenizer  | when we call prevToken method this will check if the current active token is the first element inside of history array.                                                                                                                                                |
| `currentTokenInHistory`                 | Tokenizer  | nextToken method is called, this will tell us if the index of the active token is inside of the token history or not. This will help when we reach the end of the history and decide if we create a new token from the string or return the next token in the history. |
| `getIndexOfCurrentActiveTokenInHistory` | Tokenizer  | we want to know the index of the active token inside of the history.             