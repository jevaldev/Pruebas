import express from 'express'
import { createProductRouter } from './routes/products.js'
import { ZodError } from 'zod'
import { createInventoryRouter } from './routes/inventoryMovements.js'

export const createApp = ({ productsModel, inventoryModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? 3000

  app.disable('x-powered-by')
  app.use(express.json())
  app.use('/products', createProductRouter({ productsModel }))
  app.use('/inventory', createInventoryRouter({ inventoryModel }))

  app.use((req, res) => {
    return res.status(404).json({ error: 'Resource not found. Check the URL' })
  })

  app.use((err, req, res, next) => {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: true,
        type: 'ValidationError',
        fields: err.errors.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      })
    }
    return res.status(err.status || 500).json({
      error: true,
      type: err.name || 'InternalServerError',
      message: err.message || 'Unexpected error'
    })
  })

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
}
