import z from 'zod'

const categoriesEnum = [
  'accessories',
  'electronics',
  'furniture',
  'storage'
]

const productSchema = z.object({
  name: z.string(),
  description: z.string().default("This item doesn't have a description"),
  category: z.string()
    .transform(val => val.toLowerCase())
    .refine(val =>
      categoriesEnum.includes(val),
    { message: 'Invalid category' }
    ),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  isActive: z.number().int().min(0).max(1).default(1)
})

const productFilterSchema = z.object({
  name: z.string().optional(),
  category: z.string()
    .transform(val => val?.toLowerCase())
    .refine(val => !val || categoriesEnum.includes(val), { message: 'Invalid category' })
    .optional(),
  isActive: z.number().int().min(0).max(1).optional()
})

export function validateProduct (object) {
  return productSchema.safeParse(object)
}

export function validateFiltersProduct (object) {
  return productFilterSchema.partial().safeParse(object)
}
