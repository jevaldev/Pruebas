import z from 'zod'

const productSchema = z.object({
  name: z.string().min(5),
  description: z.string().default("This item doesn't have a description"),
  category: z.enum(['Accessories', 'Electronics', 'Furniture', 'Storage']),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  is_active: z.number().min(0).max(1).default(0)
})

export function validateProduct (object) {
  return productSchema.safeParse(object)
}
