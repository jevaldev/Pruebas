import { Router } from 'express'
import { InventoryController } from '../controllers/inventoryMovements.js'

export const createInventoryRouter = ({ inventoryModel }) => {
  const inventoryRouter = Router()

  const inventoryController = new InventoryController({ inventoryModel })

  inventoryRouter.post('/:productID/entry', inventoryController.inventoryEntry)
  inventoryRouter.post('/:productID/exit', inventoryController.inventoryExit)
  inventoryRouter.get('/:productID', inventoryController.getInventoryMovements)

  return inventoryRouter
}
