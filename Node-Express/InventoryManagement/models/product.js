import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { getFilters } from '../lib/getFilters.js'
import { connection } from '../database/connection.js'
import { DatabaseConnectionError, DatabaseQueryError } from '../errors/database.js'
import { ProductNotFound, DuplicatedProduct } from '../errors/products.js'

export class ProductsModel {
  static async getProducts ({ category, name, isActive }) {
    const { conditions, params } = getFilters([
      { sql: 'name LIKE ?', value: name ? `%${name}%` : undefined },
      { sql: 'LOWER(category) = ?', value: category?.toLowerCase() },
      { sql: 'isActive = ?', value: isActive }
    ])

    let query = 'SELECT BIN_TO_UUID(id) id, name, description, category, price, stock, isActive FROM products'
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ')

    try {
      const [rows] = await connection.query(query, params)

      if (!rows.length) {
        if (conditions > 0) throw new ProductNotFound('No products match your filter')
        throw new ProductNotFound()
      }

      return rows
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof ProductNotFound) throw error

      throw new DatabaseQueryError()
    }
  }

  static async createProduct ({ input }) {
    const {
      name,
      description,
      category,
      price,
      stock,
      isActive
    } = input

    const uuid = randomUUID()

    try {
      await connection.query(`
      INSERT INTO products (id, name, description, category, price, stock, isActive)
      VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`, [uuid, name, description, category, price, stock, isActive])

      const [product] = await connection.query(`
        SELECT BIN_TO_UUID(id) AS id, name, description, category, price, stock, isActive
        FROM products
        WHERE id = UUID_TO_BIN(?)
      `, [uuid])
      return product[0]
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') throw new DuplicatedProduct('Product already exits')
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      throw new DatabaseQueryError()
    }
  }
}
