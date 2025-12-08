import { validateFiltersProduct, validateProduct } from '../schemas/product.js'

export class ProductsController {
  constructor ({ productsModel }) {
    this.productsModel = productsModel
  }

  getProducts = async (req, res, next) => {
    try {
      const result = validateFiltersProduct(req.query)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const { category, name, isActive } = result.data
      const products = await this.productsModel.getProducts({ category, name, isActive })

      return res.json({ total: products.length, data: products })
    } catch (err) {
      next(err)
    }
  }

  getProductById = async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await this.productsModel.getProductById({ id })
      return res.json({ message: 'Product found successfully', data: product })
    } catch (err) {
      next(err)
    }
  }

  createProduct = async (req, res, next) => {
    try {
      const result = validateProduct(req.body)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const newProduct = await this.productsModel.createProduct({ input: result.data })

      return res.status(201).json({ message: 'Product created successfully', data: newProduct })
    } catch (err) {
      next(err)
    }
  }
}
