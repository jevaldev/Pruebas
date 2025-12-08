export class DatabaseConnectionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DatabaseConnectionError'
    this.status = 500
  }
}

export class DatabaseQueryError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DatabaseQueryError'
    this.status = 500
  }
}
