import { createApp } from './app.js'
import { InventoryModel } from './models/inventoryMovements.js'
import { ProductsModel } from './models/product.js'

createApp({ productsModel: ProductsModel, inventoryModel: InventoryModel })
