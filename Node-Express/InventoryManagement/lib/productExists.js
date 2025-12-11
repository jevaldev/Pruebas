import { connection } from '../database/connection.js'
import { ProductNotFound } from '../errors/products.js'

export const productExists = async (id) => {
  const [product] = await connection.query('SELECT * FROM products WHERE BIN_TO_UUID(id) = ?', [id])
  if (product.length === 0) throw new ProductNotFound("This product doesn't exists in the database")
}
