export class ProductNotFound extends Error {
  constructor (message = 'No products were found') {
    super(message)
    this.name = 'ProductNotFound'
    this.status = 404
  }
}

export class DuplicatedProduct extends Error {
  constructor (message = 'Product already exists') {
    super(message)
    this.name = 'DuplicatedProduct'
    this.status = 409
  }
}

export class BlankInputValues extends Error {
  constructor (message = 'No fields provided to update the product') {
    super(message)
    this.name = 'BlankInputValues'
  }
}
