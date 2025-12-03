import { randomUUID } from 'node:crypto'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const tasks = require('../tasks.json')

export class TaskModel {
  static async getTasks () {
    return tasks
  }

  static async createTask ({ input }) {
    const newTask = {
      id: randomUUID(),
      ...input
    }

    tasks.push(newTask)
    return newTask
  }

  static async getTaskByID ({ ID }) {
    const task = tasks.find(task => task.id === ID)
    return task
  }

  static async updateTask ({ ID, input }) {
    const taskIndex = tasks.findIndex(task => task.id === ID)

    if (taskIndex === -1) return false

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...input
    }

    return tasks[taskIndex]
  }

  static async deleteTask ({ ID }) {
    const taskIndex = tasks.findIndex(task => task.id === ID)

    if (taskIndex === -1) return false
    tasks.splice(taskIndex, 1)
    return true
  }
}
