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
    Length: {{ textLength }} {{ watchedTextLength }}
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
  </div>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'
import SlotParagraph from '@/components/SlotParagraph'

export default {
  name: 'HelloWorld',
  components: { SlotParagraph, TodoListItem },
  props: {
    msg: String
  },
  data () {
    return {
      text: '',
      watchedTextLength: 0,
      todoText: '',
      todos: []
    }
  },
  watch: {
    textLength(newVal) {
      if(newVal > 15) {
        this.text = `${this.text.slice(0, 15)}...`
      }
    }
  },
  computed: {
    textLength () {
      console.log('calculate length')
      return this.text.length
    },
    finishedTodos () {
      return this.todos
          .filter(todo => todo.isFinished)
    }
  },
  methods: {
    sendChangeEvent () {
      console.log('nichts')
      this.$emit('change')
    },
    addTodo () {
      this.todos.push({
        text: this.todoText,
        isFinished: false
      })
      this.todoText = ''
    },
    finishTodo (i) {
      this.todos[i].isFinished = true
    }
  },
  mounted () {
    console.log('I am there')
  }
}
</script>
