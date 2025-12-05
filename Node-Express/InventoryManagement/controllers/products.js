import { validateFiltersProduct, validateProduct } from '../schemas/product.js'

export class ProductsController {
  constructor ({ productsModel }) {
    this.productsModel = productsModel
  }

  getProducts = async (req, res) => {
    try {
      const result = validateFiltersProduct(req.query)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const { category, name, isActive } = result.data
      const products = await this.productsModel.getProducts({ category, name, isActive })

      return res.json({ total: products.length, data: products })
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  createProduct = async (req, res) => {
    try {
      const result = validateProduct(req.body)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const newProduct = await this.productsModel.createProduct({ input: result.data })

      return res.status(201).json({ message: 'Product created successfully', data: newProduct })
    } catch (err) {
      if (err.type === 'DUPLICATE') {
        return res.status(409).json({
          message: 'A product with the same unique field already exists'
        })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
