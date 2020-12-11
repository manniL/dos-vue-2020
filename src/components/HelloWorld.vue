<template>
  <div>
    {{ msg }}
    <button @click="sendChangeEvent">Send Change</button>
    <br>
    <input v-model="text" type="text">
    Text: {{ text }}
    <button @click="text = ''"> Reset Text</button>
    <br>
    <br>
    Length: {{ textLength }}
    <br>
    <br>
    <br>
    <div>
      <ul>
        <TodoListItem
            v-for="(todo, i) in todos"
            :todo="todo"
            :key="i"
            @finish="finishTodo(i)" />
      </ul>
      {{ todos }}
    </div>
    <div>
      <input v-model="todoText" type="text">
      <button @click="addTodo">Add Todo</button>
    </div>
    <div>
      Finished Todos
      {{ finishedTodos }}
    </div>
    <br><br>
    <div>
      <SlotParagraph>
        <template #heading>
          <h1>Heading</h1>
        </template>
      </SlotParagraph>
    </div>
    <br>
    <br>
    Interval: {{ intervalText }}
    <br>
    <br>
    {{ mountains }}
    <br><br>
    <br>
    <h1>Mountain</h1>
    {{ mountain }}
  </div>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'
import SlotParagraph from '@/components/SlotParagraph'
import { ref, computed, watch, onMounted } from 'vue'
import { useTodos } from '@/composables/useTodos'
import { useInterval } from '@/composables/useInterval'
import useRepository from '@/composables/useRepository'

export default {
  name: 'HelloWorld',
  components: { SlotParagraph, TodoListItem },
  props: {
    msg: String
  },
  setup (props, ctx) {
    /* const data = reactive({
      text: '',
      todoText: '',
      todos: []
    }) */

    const text = ref('aajdsiasdioasjdioasjdoaisjoiaoi')
    const textLength = computed(() => text.value.length)
    watch(textLength, (newVal) => {
      if (newVal > 15) {
        text.value = `${text.value.slice(0, 15)}...`
      }
    }, { immediate: true })
    /*watchEffect(() => {
      if(textLength.value > 15) {
        text.value = `${text.value.slice(0, 15)}...`
      }
    })*/

    const { todoText, todos, finishedTodos, finishTodo, addTodo } = useTodos()

    const intervalText = ref(10)
    useInterval(5, () => {
      intervalText.value += 5
    })

    const sendChangeEvent = () => {
      console.log('nichts')
      ctx.emit('change')
    }

    const repository = useRepository('https://api.nuxtjs.dev/mountains')
    const mountains = repository.index()
    const mountain = repository.show('aconcagua')
    onMounted(async () => {
      console.log('I am there')
    })

    return { text, todoText, todos, textLength, finishedTodos, finishTodo, addTodo, sendChangeEvent, intervalText, mountains, mountain }
  },
}
</script>
