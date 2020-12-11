<template>
  <li>
    {{ todo.text }}
    <span>{{ todo.isFinished ? 'X' : 'O' }}</span>
    <button v-if="!todo.isFinished" @click="finish">Finish</button>
  </li>
</template>

<script>
import mountedMixin from '@/mountedMixin'

export default {
  mixins: [mountedMixin],
  props: {
    todo: Object
  },
  methods: {
    finish () {
      this.$emit('finish')
      this.log()
    },
    log () {
      console.log('log')
    }
  }
}
</script>
