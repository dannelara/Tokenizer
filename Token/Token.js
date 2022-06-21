/**
 * Token class to create a token.
 */
 export class Token {
    /**
     * Cunstructor.
     *
     * @param {*} type - The type of the token.
     * @param {*} value The value of the token.
     */
    constructor (type, value) {
      this.type = type
      this.value = value
    }
  }