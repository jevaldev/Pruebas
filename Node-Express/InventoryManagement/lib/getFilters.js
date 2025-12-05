export const getFilters = (filters) => {
  const conditions = []
  const params = []

  for (const f of filters) {
    if (f.value !== undefined) {
      conditions.push(f.sql)
      params.push(f.value)
    }
  }

  return { conditions, params }
}
