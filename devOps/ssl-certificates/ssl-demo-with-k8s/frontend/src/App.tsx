import { useState, useEffect } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

const API = 'https://localhost:3443/api'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(`${API}/todos`)
      .then(r => r.json())
      .then(setTodos)
  }, [])

  async function addTodo() {
    if (!input.trim()) return
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
    const todo = await res.json()
    setTodos(prev => [...prev, todo])
    setInput('')
  }

  async function toggleTodo(id: number) {
    const res = await fetch(`${API}/todos/${id}`, { method: 'PATCH' })
    const updated = await res.json()
    setTodos(prev => prev.map(t => t.id === id ? updated : t))
  }

  async function deleteTodo(id: number) {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', fontFamily: 'monospace' }}>
      <h1>🔒 HTTPS Todo App</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="New todo..."
          style={{ flex: 1, padding: '8px 12px', fontSize: 16 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(t => (
          <li key={t.id} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <span
              onClick={() => toggleTodo(t.id)}
              style={{ flex: 1, cursor: 'pointer', textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}