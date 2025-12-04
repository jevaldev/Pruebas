import { validateProduct } from '../schemas/product.js'

export class ProductsController {
  constructor ({ productsModel }) {
    this.productsModel = productsModel
  }

  getProducts = async (req, res) => {
    const products = await this.productsModel.getProducts()
    return res.json({ total: products.length, data: products })
  }

  createProduct = async (req, res) => {
    const result = validateProduct(req.body)

    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const newProduct = await this.productsModel.createProduct({ input: result.data })

    return res.status(201).json({ message: 'Product created successfully', data: newProduct })
  }
}
