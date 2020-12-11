import { ref, computed } from 'vue'

export const useTodos = () => {
  const todoText = ref('')
  const todos = ref([])
  const finishedTodos = computed(() => todos.value.filter(todo => todo.isFinished))
  const finishTodo = (i) => { todos.value[i].isFinished = true }
  const addTodo = () => {
    todos.value.push({
      text: todoText.value,
      isFinished: false
    })
    todoText.value = ''
  }

  return {
    todoText,
    todos,
    finishedTodos,
    finishTodo,
    addTodo
  }
}
