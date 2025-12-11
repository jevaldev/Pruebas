import z from 'zod'

const inventorySchema = z.object({
  quantity: z.number().int().positive()
})

export const validateInventorySchema = (object) => (
  inventorySchema.safeParse(object)
)
