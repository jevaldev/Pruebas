import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { getFilters } from '../lib/getFilters.js'
import { connection } from '../database/connection.js'
import { DatabaseConnectionError, DatabaseQueryError } from '../errors/database.js'
import { ProductNotFound, DuplicatedProduct, BlankInputValues } from '../errors/products.js'

export class ProductsModel {
  static async getProducts ({ category, name, isActive, limit, offset }) {
    const { conditions, params } = getFilters([
      { sql: 'name LIKE ?', value: name ? `%${name}%` : undefined },
      { sql: 'LOWER(category) = ?', value: category?.toLowerCase() },
      { sql: 'isActive = ?', value: isActive }
    ])

    let countQuery = 'SELECT COUNT(*) AS Total FROM products'
    let query = 'SELECT BIN_TO_UUID(id) as id, name, description, category, price, stock, isActive FROM products'

    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ')
      countQuery += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' LIMIT ? OFFSET ?'

    try {
      const [products] = await connection.query(query, [...params, limit, offset])
      const [countRows] = await connection.query(countQuery, params)
      const total = countRows[0].Total
      const totalPages = Math.ceil(total / limit)

      if (!products.length) {
        if (conditions.length) throw new ProductNotFound('No products match your filter')
        throw new ProductNotFound()
      }

      return {
        products,
        totalCount: total,
        totalPages
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (error instanceof ProductNotFound) throw error

      throw new DatabaseQueryError()
    }
  }

  static async getProductById ({ id }) {
    try {
      const [product] = await connection.query('SELECT BIN_TO_UUID(id) as id, name, description, category, price, stock, isActive FROM products WHERE BIN_TO_UUID(id) = ?', id)

      if (!product.length) throw new ProductNotFound()

      return product
    } catch (err) {
      if (err.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      if (err instanceof ProductNotFound) throw err
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
        SELECT BIN_TO_UUID(id) as id, name, description, category, price, stock, isActive
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

  static async updateProduct ({ id, input }) {
    try {
      const fields = Object.keys(input)

      if (fields.length === 0) throw new BlankInputValues()

      const setClause = fields.map(field => `${field} = ?`).join(' ,')
      const values = fields.map(field => input[field])

      const [productUpdated] = await connection.query(
        `
        UPDATE products
        SET ${setClause}
        WHERE BIN_TO_UUID(id) = ?
        `,
        [...values, id]
      )

      if (productUpdated.affectedRows === 0) throw new ProductNotFound()

      return productUpdated
    } catch (err) {
      if (err instanceof ProductNotFound || err instanceof BlankInputValues) throw err
      if (err.code === 'ER_DUP_ENTRY') throw new DuplicatedProduct('The name of that product already exists')
      if (err.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      throw new DatabaseQueryError()
    }
  }
}
