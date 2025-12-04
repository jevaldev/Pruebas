import { Router } from 'express'
import { ProductsController } from '../controllers/products.js'

export const createProductRouter = ({ productsModel }) => {
  const productRouter = Router()

  const productController = new ProductsController({ productsModel })

  productRouter.get('/', productController.getProducts)
  productRouter.post('/', productController.createProduct)

  return productRouter
}
