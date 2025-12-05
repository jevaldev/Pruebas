import 'dotenv/config'
import { getFilters } from '../lib/getFilters.js'
import { connection } from '../database/connection.js'

export class ProductsModel {
  static async getProducts ({ category, name, isActive }) {
    const { conditions, params } = getFilters([
      { sql: 'name LIKE ?', value: name ? `%${name}%` : undefined },
      { sql: 'LOWER(category) = ?', value: category?.toLowerCase() },
      { sql: 'isActive = ?', value: isActive }
    ])

    let query = 'SELECT BIN_TO_UUID(id) id, name, description, category, price, stock, isActive FROM products'
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ')

    const [rows] = await connection.query(query, params)
    return rows
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

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`
      INSERT INTO products (id, name, description, category, price, stock, isActive)
      VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`, [uuid, name, description, category, price, stock, isActive])
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const err = new Error('Duplicate entry')
        err.type = 'DUPLICATE'
        throw err
      }
    }

    const [product] = await connection.query(`
      SELECT BIN_TO_UUID(id) AS id, name, description, category, price, stock, isActive
      FROM products
      WHERE id = UUID_TO_BIN(?)
    `, [uuid])

    return product[0]
  }
}
