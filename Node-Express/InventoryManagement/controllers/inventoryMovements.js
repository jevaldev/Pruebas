import { validateInventorySchema } from '../schemas/inventoryMovements.js'

export class InventoryController {
  constructor ({ inventoryModel }) {
    this.inventoryModel = inventoryModel
  }

  inventoryEntry = async (req, res, next) => {
    try {
      const { productID } = req.params
      const result = validateInventorySchema(req.body)

      if (result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })

      await this.inventoryModel.inventoryEntry({ id: productID, quantity: result.data.quantity })

      return res.status(201).json({ message: 'Entry movement log successfully' })
    } catch (err) {
      next(err)
    }
  }

  inventoryExit = async (req, res, next) => {
    try {
      const { productID } = req.params
      const result = validateInventorySchema(req.body)

      if (result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })

      await this.inventoryModel.inventoryExit({ id: productID, quantity: result.data.quantity })

      return res.status(201).json({ message: 'Exit movement log successfully' })
    } catch (err) {
      next(err)
    }
  }

  getInventoryMovements = async (req, res, next) => {
    try {
      const { productID } = req.params

      const productMovements = await this.inventoryModel.getInventoryMovements({ id: productID })

      return res.json({ total: productMovements.length, data: productMovements })
    } catch (err) {
      next(err)
    }
  }
}
