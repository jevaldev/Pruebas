import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'

const require = createRequire(import.meta.url)
const products = require('../sample-products.json')

export class ProductsModel {
  static async getProducts () {
    return products
  }

  static async createProduct ({ input }) {
    const newProduct = {
      id: randomUUID,
      ...input
    }

    products.push(newProduct)

    return newProduct
  }
}
