import { TaskModel } from '../models/task.js'
import { validatePartialTask, validateTask } from '../schemas/task.js'

export class TaskController {
  static async getTasks (req, res) {
    const tasks = await TaskModel.getTasks()
    return res.json({ total: tasks.length, data: tasks })
  }

  static async createTask (req, res) {
    const result = validateTask(req.query)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const newTask = await TaskModel.createTask({ input: result })

    return res.status(201).json({ message: 'new task created', data: newTask })
  }

  static async getTaskByID (req, res) {
    const { ID } = req.params
    const task = await TaskModel.getTaskByID({ ID })
    if (!task) return res.status(404).json({ error: 'No existe la tarea especificada' })
    return res.json({ data: task })
  }

  static async updateTask (req, res) {
    const { ID } = req.params
    const result = validatePartialTask(req.query)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const updatedTask = await TaskModel.updateTask({ ID, input: result.data })

    if (updatedTask === false) return res.status(404).json({ error: 'No existe la tarea especificada' })

    return res.json({ message: 'Tarea actualizada correctamente', data: updatedTask })
  }

  static async deleteTask (req, res) {
    const { ID } = req.params

    const task = await TaskModel.deleteTask({ ID })
    if (!task) return res.status(404).json({ error: 'La tarea no existe' })

    return res.json({ message: 'Tarea eliminada correctamente' })
  }
}
