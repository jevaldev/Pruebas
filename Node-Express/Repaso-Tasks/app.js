import express from 'express'
import { tasksRouter } from './routes/tasks.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by')
app.use(express.json())
app.use('/tasks', tasksRouter)

app.use((req, res) => {
  return res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
