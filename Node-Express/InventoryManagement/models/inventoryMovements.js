import { connection } from '../database/connection.js'
import { DatabaseConnectionError, DatabaseQueryError } from '../errors/database.js'
import { ProductNotFound } from '../errors/products.js'
import { productExists } from '../lib/productExists.js'

export class InventoryModel {
  static async inventoryEntry ({ id, quantity }) {
    try {
      await productExists(id)
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
      await productExists(id)
      const [newExit] = await connection.query(`
        UPDATE products
        SET stock = stock - ?
        WHERE id = UUID_TO_BIN(?) AND stock - ? >= 0 `, [quantity, id, quantity])
      console.log(newExit)

      if (newExit.affectedRows === 0) throw new ProductNotFound("The stock can't be less than 0")

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
      await productExists(id)
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
