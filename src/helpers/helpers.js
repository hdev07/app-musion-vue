export const paramsToString = (query = {}) => {
  let queryParams = ''

  Object.keys(query).forEach((queryKey, index) => {
    if (query[queryKey] == null) return
    if (queryParams === '') queryParams += `${queryKey}=${query[queryKey]}`
    else queryParams += `&${queryKey}=${query[queryKey]}`
  })

  return queryParams
}
