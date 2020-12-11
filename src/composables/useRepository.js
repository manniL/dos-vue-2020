import { useFetch } from '@/composables/useFetch'

export default (resource) => ({
  index() {
    return useFetch(resource)
  },

  create(payload) {
    return useFetch(`${resource}`, 'POST', payload)
  },

  show(id) {
    return useFetch(`${resource}/${id}`)
  },


  update(payload, id) {
    return useFetch(`${resource}/${id}`, 'PUT', payload)
  },

  delete(id) {
    return useFetch(`${resource}/${id}`, 'DELETE')
  }

})

