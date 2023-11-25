export const navigateTo = (router, path, options = {}) => {
  router.push(path, undefined, options)
}
