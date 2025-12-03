import z from 'zod'

const taskSchema = z.object({
  title: z
    .string({ required_error: 'El título es obligatorio' })
    .min(1, 'El título no puede estar vacío')
    .min(10, 'Debe tener al menos 10 caracteres'),
  completed: z.coerce.boolean().default(false)
})

const updateTaskSchema = z.object({
  title: z.string().min(10).max(100).optional(),
  completed: z.string().toLowerCase().transform(JSON.parse).pipe(z.boolean())
})

export function validateTask (object) {
  return taskSchema.safeParse(object)
}

export function validatePartialTask (object) {
  return updateTaskSchema.safeParse(object)
}
