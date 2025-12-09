import z from 'zod'

const categoriesEnum = [
  'accessories',
  'electronics',
  'furniture',
  'storage'
]

const CategorySchema = z.string()
  .transform(val => val.toLowerCase())
  .refine(val => categoriesEnum.includes(val), {
    message: 'Invalid category'
  })

const BaseProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: CategorySchema,
  price: z.number().positive(),
  stock: z.number().int().min(0),
  isActive: z.number().int().min(0).max(1)
})

const CreateProductSchema = BaseProductSchema.extend({
  description: z.string().default("This item doesn't have a description"),
  isActive: z.number().int().min(0).max(1).default(1)
})

const UpdateProductSchema = BaseProductSchema.partial()

const ProductFilterSchema = z.object({
  name: z.string().optional(),
  category: CategorySchema.optional(),
  isActive: z.coerce.number().int().min(0).max(1).optional()
})

const UpdateStatusSchema = z.object({
  isActive: z.number().int().min(0).max(1)
})

export const validateCreateProduct = obj => CreateProductSchema.safeParse(obj)
export const validateUpdateProduct = obj => UpdateProductSchema.safeParse(obj)
export const validateProductFilters = obj => ProductFilterSchema.safeParse(obj)
export const validateStatus = obj => UpdateStatusSchema.safeParse(obj)
