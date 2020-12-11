import { ref } from 'vue'
import { onBeforeMount } from 'vue'

export const useFetch = (url) => {
  const result = ref(null)

  onBeforeMount(async () => {
    result.value = await fetch(url).then(r => r.json())
  })

  return result
}
