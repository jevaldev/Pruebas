import express from 'express'
import { createProductRouter } from './routes/products.js'

export const createApp = ({ productsModel }) => {
  const app = express()
  const PORT = process.env.PORT ?? 3000

  app.disable('x-powered-by')
  app.use(express.json())
  app.use('/products', createProductRouter({ productsModel }))

  app.use((req, res) => {
    return res.status(404).json({ error: 'Resource not found. Check the URL' })
  })

  app.use((err, req, res, next) => {
    const statusCode = err.status || 500

    return res.status(statusCode).json({
      error: true,
      type: err.name || 'InternalServerError',
      message: err.message || 'Unexpected error'
    })
  })

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
}
