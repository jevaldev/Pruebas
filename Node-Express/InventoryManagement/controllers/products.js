import { validateProductFilters, validateStatus, validateUpdateProduct, validateCreateProduct } from '../schemas/product.js'

export class ProductsController {
  constructor ({ productsModel }) {
    this.productsModel = productsModel
  }

  getProducts = async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query
      const result = validateProductFilters(req.query)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const parsedLimit = Number(limit)
      const parsedPage = Number(page)
      const offset = (parsedPage - 1) * parsedLimit

      const { category, name, isActive } = result.data
      const { products, totalCount, totalPages } = await this.productsModel.getProducts({ category, name, isActive, limit: parsedLimit, offset })

      return res.json({
        totalCount,
        totalPages,
        currentPage: parsedPage,
        data: products
      })
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
      const result = validateCreateProduct(req.body)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      const newProduct = await this.productsModel.createProduct({ input: result.data })

      return res.status(201).json({ message: 'Product created successfully', data: newProduct })
    } catch (err) {
      next(err)
    }
  }

  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = validateUpdateProduct(req.body)

      if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

      await this.productsModel.updateProduct({ id, input: result.data })

      return res.json({ message: 'Product updated successfully' })
    } catch (err) {
      next(err)
    }
  }

  updateProductStatus = async (req, res, next) => {
    try {
      const { id } = req.params
      const result = validateStatus(req.body)

      if (result.error) return res.status(400).json({ message: JSON.parse(result.error.message) })
      await this.productsModel.updateProductStatus({ id, isActive: result.data.isActive })

      return res.json({ message: 'Product status updated successfully' })
    } catch (err) {
      next(err)
    }
  }

  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params
      await this.productsModel.deleteProduct({ id })

      return res.json('Product deleted successfully')
    } catch (err) {
      next(err)
    }
  }
}
