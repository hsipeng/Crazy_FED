

export class InputError {
    constructor (screenId, error) {
      this.screenId = screenId
      this.error = error || {}
      this.code = this.screenId
      this.message = Array.from(
        Object.entries(this.error),
        ([k, v]) => `${k}: ${v.join('; ')}`
      ).join(' | ')
    }
  
    toString () {
      return `${this.code} ${this.message}`
    }
  }
  
  export class ApiHttpError {
    constructor (code, message) {
      this.code = code
      this.message = message
    }
  
    toString () {
      return `${this.code} ${this.message}`
    }
  }
  
  export class ApiResultError {
    constructor (code, message, data) {
      this.code = code
      this.message = message
      this.data = data
    }
  
    toString () {
      return `${this.code} ${this.message}`
    }
  }
  