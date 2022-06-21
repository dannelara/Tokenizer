import { Token } from "./Token/Token.js"
/**
 * Tokenizer class.
 */
export class Tokenizer {
  #allowedTokens
  #string
  #activeToken
  #tokensHistory = []
  /**
   * Class constructor.
   *
   * @param {Array} tokensToMatch - Array with the tokens and regex to match in string.
   * @example [{ type: 'WORD', regExp: /^[\w|åäöÅÄÖ]+/ }, { type: 'DOT', regExp: /^\./ }]
   * @param {string} string - The string to find tokens in.
   * @example "This string contains words and dots."
   */
  constructor(tokensToMatch, string) {
    this.#allowedTokens = tokensToMatch
    this.#string = string
  }



  /**
   * Public method to get the previus token. This method checks if we are inside of the tokens history or to search for a new token
   * in the string.
   *
   * @returns {object} - The previus token in the tokens history.
   */
  setPrevTokenActive() {
    if (!this.#isFirstTokenInHistory()) {
      const currentActiveTokenIndex = this.#getIndexOfCurrentActiveTokenInHistory()
      this.#activeToken = this.#tokensHistory[currentActiveTokenIndex - 1]
    }
  }

  /**
   * Method to get the next token depending if we are inside of the token history or in the current string.
   *
   * @returns {object} - The next token.
   */
  setNextTokenActive() {
 
        if (this.#currentTokenInHistory()) {
          this.#activeToken = this.#tokensHistory[this.#getIndexOfCurrentActiveTokenInHistory() + 1]
        } else {
          this.#activeToken = this.#getFirstTokenMatchInString()
          this.#tokensHistory.push(this.#activeToken)
        }
  }
   

  /**
   * Method to get the current active token. If there's no active token call for loadFirstToken method and return the value from it {active token}.
   *   
   * @returns {object} - The current active token.
   */
  getActiveToken() {
    if (this.#activeToken.type === "Error") {
      throw new TypeError(`No lexical element found for: >${this.#string}`)
    }
    return this.#activeToken
  }

  /**
   * Method to loadFirstToken the tokenizer by loading the first token in the string and save it to the tokens history.
   */
   loadFirstToken() {
    this.#activeToken = this.#getFirstTokenMatchInString()
    if (this.#tokensHistory.length === 0) {
      this.#tokensHistory.push(this.#activeToken)
    }
  }


  #getIndexOfCurrentActiveTokenInHistory() {
    return this.#tokensHistory.indexOf(
      this.#tokensHistory.find(
        (token) => token.value === this.#activeToken.value
      )
    )
  }


  #currentTokenInHistory() {
    return  this.#getIndexOfCurrentActiveTokenInHistory() !== this.#tokensHistory.length - 1
  }


  #isFirstTokenInHistory() {
    return this.#getIndexOfCurrentActiveTokenInHistory() === 0
  }

  
  #sliceString(amountToRemove) {
    this.#string = this.#string.slice(amountToRemove)
  }

  
  #getLongestMatchAndSliceString(tokens) {
    return tokens.reduce((prev, current) => prev.value.length > current.value.length ? prev : current)
  }

  
  #getTokenAndSliceString(tokens) {
    let tokenToReturn

    if (this.#string.length === 0) {

      tokenToReturn = new Token('END', '')

    } else if (tokens.length > 0) {

      tokenToReturn = this.#getLongestMatchAndSliceString(tokens)
      this.#sliceString(tokenToReturn.value.length)  

    } else if(tokens.length === 0) {
      
      tokenToReturn = new Token('Error', '')     
    } 
    return tokenToReturn
  }


  #checkForWhiteSpacesAndRemove(){
    while (this.#string[0] === " ") {
      this.#string = this.#string.slice(1)
    }
  } 




   #getFirstTokenMatchInString () {
    this.#checkForWhiteSpacesAndRemove()

      const types = []

      for (const { type, regExp } of this.#allowedTokens) {
        if (this.#string.match(regExp)) {
          types.push(new Token(type, this.#string.match(regExp)[0]))
        }
      }

    return this.#getTokenAndSliceString(types)
  }


}
