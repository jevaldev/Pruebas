import { connection } from '../database/connection.js'
import { DatabaseConnectionError, DatabaseQueryError } from '../errors/database.js'
import { ProductNotFound } from '../errors/products.js'

export class InventoryModel {
  static async inventoryEntry ({ id, quantity }) {
    try {
      const [newEntry] = await connection.query(`
        UPDATE products
        SET stock = stock + ?
        WHERE id = UUID_TO_BIN(?)
        `, [quantity, id])

      if (newEntry.affectedRows === 0) throw new ProductNotFound()

      await connection.query(`
        INSERT INTO inventory_movements (product_id, type, quantity)
        VALUES (UUID_TO_BIN(?), 'entry', ?)`, [id, quantity])
    } catch (err) {
      if (err instanceof ProductNotFound) throw err
      if (err.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      throw new DatabaseQueryError()
    }
  }

  static async inventoryExit ({ id, quantity }) {
    try {
      const newExit = await connection.query(`
        UPDATE products
        SET stock = stock - ?
        WHERE id = UUID_TO_BIN(?) AND stock - ? >= 0 `, [quantity, id, quantity])
      console.log(newExit)

      if (newExit.affectedRows === 0) throw new ProductNotFound()

      await connection.query(`
            INSERT INTO inventory_movements (product_id, type,quantity)
            VALUES (UUID_TO_BIN(?), 'exit', ?)`, [id, quantity])
    } catch (err) {
      if (err instanceof ProductNotFound) throw err
      if (err.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      throw new DatabaseQueryError()
    }
  }

  static async getInventoryMovements ({ id }) {
    try {
      const [product] = await connection.query('SELECT * FROM products WHERE BIN_TO_UUID(id) = ?', [id])
      if (product.length === 0) throw new ProductNotFound("This product doesn't exists in the database")
      const [productMovements] = await connection.query(`
        SELECT im.type, im.quantity, im.created_at, p.name as product_name
        FROM inventory_movements as im
        INNER JOIN products as p ON p.id = im.product_id
        WHERE im.product_id = UUID_TO_BIN(?)`, [id])
      if (productMovements.length === 0) throw new ProductNotFound("This product doesn't have any inventory movement")
      return productMovements
    } catch (err) {
      if (err instanceof ProductNotFound) throw err
      if (err.code === 'ECONNREFUSED') throw new DatabaseConnectionError()
      throw new DatabaseQueryError()
    }
  }
}
