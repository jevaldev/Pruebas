import { Router } from 'express'
import { ProductsController } from '../controllers/products.js'

export const createProductRouter = ({ productsModel }) => {
  const productRouter = Router()

  const productController = new ProductsController({ productsModel })

  productRouter.get('/', productController.getProducts)
  productRouter.post('/', productController.createProduct)

  productRouter.get('/:id', productController.getProductById)
  productRouter.put('/:id', productController.updateProduct)
  productRouter.patch('/:id', productController.updateProductStatus)
  productRouter.delete('/:id', productController.deleteProduct)

  return productRouter
}
