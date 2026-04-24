<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const todos = ref([])
const newTodo = ref('')
const filter = ref('all')

onMounted(() => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  }
})

watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.completed)
  } else if (filter.value === 'completed') {
    return todos.value.filter(t => t.completed)
  }
  return todos.value
})

const activeCount = computed(() => todos.value.filter(t => !t.completed).length)
const completedCount = computed(() => todos.value.filter(t => t.completed).length)

function addTodo() {
  const text = newTodo.value.trim()
  if (text) {
    todos.value.unshift({
      id: Date.now(),
      text,
      completed: false
    })
    newTodo.value = ''
  }
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function deleteTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearCompleted() {
  todos.value = todos.value.filter(t => !t.completed)
}

function handleKeydown(e) {
  if (e.key === 'Enter') {
    addTodo()
  }
}
</script>

<template>
  <div class="todo-container">
    <div class="header">
      <h1>✨ My Todos</h1>
      <p>Stay organized and productive</p>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">{{ activeCount }}</div>
        <div class="stat-label">Active</div>
      </div>
      <div class="stat">
        <div class="stat-value">{{ completedCount }}</div>
        <div class="stat-label">Done</div>
      </div>
    </div>

    <div class="input-group">
      <input 
        v-model="newTodo" 
        @keydown="handleKeydown"
        placeholder="What needs to be done?"
        type="text"
      />
      <button class="add-btn" @click="addTodo">Add</button>
    </div>

    <div class="todo-list" v-if="filteredTodos.length > 0">
      <div 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <div 
          class="checkbox"
          :class="{ checked: todo.completed }"
          @click="toggleTodo(todo.id)"
        ></div>
        <span class="todo-text">{{ todo.text }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="empty-state" v-else>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p v-if="todos.length === 0">No tasks yet. Add one above!</p>
      <p v-else>No {{ filter === 'all' ? '' : filter }} tasks found.</p>
    </div>

    <div class="filters" v-if="todos.length > 0">
      <button 
        class="filter-btn" 
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        All
      </button>
      <button 
        class="filter-btn" 
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button 
        class="filter-btn" 
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Done
      </button>
      <button 
        class="clear-btn" 
        @click="clearCompleted"
        v-if="completedCount > 0"
      >
        Clear Done
      </button>
    </div>
  </div>
</template>
