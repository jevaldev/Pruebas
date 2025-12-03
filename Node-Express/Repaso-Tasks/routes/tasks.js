import { TaskController } from '../controllers/tasks.js'
import { Router } from 'express'

export const tasksRouter = Router()

tasksRouter.get('/', TaskController.getTasks)
tasksRouter.post('/', TaskController.createTask)

tasksRouter.get('/:ID', TaskController.getTaskByID)
tasksRouter.patch('/:ID', TaskController.updateTask)
tasksRouter.delete('/:ID', TaskController.deleteTask)
