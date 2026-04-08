<script setup>
import { ref, computed, watch, watchEffect, reactive, onMounted, onUnmounted } from 'vue'

// ─── 1. COMPUTED ──────────────────────────────────────────────────────────────
const price = ref(100)
const tax = ref(0.21)
const total = computed(() => price.value * (1 + tax.value))

// ─── 2. WATCH ─────────────────────────────────────────────────────────────────
const username = ref('Rachel')
const watchLog = ref([])

watch(username, (newVal, oldVal) => {
  watchLog.value.unshift(`"${oldVal}" → "${newVal}"`)
})

// ─── 3. WATCHEFFECT ───────────────────────────────────────────────────────────
const effectLog = ref([])
watchEffect(() => {
  effectLog.value.unshift(`watchEffect ran — username is now: "${username.value}"`)
})

// ─── 4. REACTIVE ──────────────────────────────────────────────────────────────
const user = reactive({ name: 'Rachel', age: 25 })

// ─── 5. DIRECTIVES: V-FOR + ACTIVE TOGGLE ────────────────────────────────────
const games = ref([
  { id: 1, name: 'Elden Ring', active: true },
  { id: 2, name: 'Hollow Knight', active: false },
  { id: 3, name: 'Celeste', active: true },
])
const newGame = ref('')
function addGame() {
  if (!newGame.value.trim()) return
  games.value.push({ id: Date.now(), name: newGame.value.trim(), active: true })
  newGame.value = ''
}
function removeGame(id) {
  games.value = games.value.filter(g => g.id !== id)
}
function toggleActive(game) {
  game.active = !game.active
}

// ─── 6. DIRECTIVES: V-IF / V-SHOW ────────────────────────────────────────────
const isLoggedIn = ref(false)
const showPanel = ref(true)

// ─── 7. EVENT MODIFIERS ───────────────────────────────────────────────────────
const formSubmitted = ref(false)
const modifierLog = ref([])

function onSubmit() {
  formSubmitted.value = true
  modifierLog.value.unshift('.prevent — form submitted without page reload!')
  setTimeout(() => (formSubmitted.value = false), 2000)
}
function onOnceClick() {
  modifierLog.value.unshift('.once — this will never fire again!')
}
function onSelfClick() {
  modifierLog.value.unshift('.self — you clicked the wrapper div, not the inner button')
}
function onEnterKey() {
  modifierLog.value.unshift('.enter — Enter key pressed in input')
}

// ─── 8. LIFECYCLE HOOKS ───────────────────────────────────────────────────────
const seconds = ref(0)
const mountedAt = ref('')
let timer = null

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString()
  timer = setInterval(() => seconds.value++, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Vue 3 Playground 🧪</h1>
      <p>Interactive demos for the concepts in your readme</p>
    </header>

    <!-- ─── 1. COMPUTED ──────────────────────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">1</span> Computed Properties</h2>
      <p class="hint">Cached derived values — only recalculates when dependencies change.</p>

      <div class="row">
        <label>
          Price (€)
          <input type="number" v-model.number="price" />
        </label>
        <label>
          Tax rate
          <input type="number" v-model.number="tax" step="0.01" />
        </label>
      </div>
      <div class="result">
        Total: <strong>€{{ total.toFixed(2) }}</strong>
        <span class="muted">(price × (1 + tax))</span>
      </div>
    </section>

    <!-- ─── 2 & 3. WATCH + WATCHEFFECT ──────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">2–3</span> watch() &amp; watchEffect()</h2>
      <p class="hint">
        Both react to reactive changes. <code>watch</code> is explicit and gives you old/new values.
        <code>watchEffect</code> auto-tracks and runs immediately.
      </p>

      <label>
        Username (shared source)
        <input v-model="username" placeholder="Type a name…" />
      </label>

      <div class="log-row">
        <div class="log-box">
          <h3>watch() log <span class="muted">(old → new)</span></h3>
          <p v-if="watchLog.length === 0" class="muted">Change the username above…</p>
          <ul>
            <li v-for="entry in watchLog" :key="entry">{{ entry }}</li>
          </ul>
        </div>
        <div class="log-box">
          <h3>watchEffect() log</h3>
          <ul>
            <li v-for="entry in effectLog" :key="entry">{{ entry }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ─── 4. REACTIVE ──────────────────────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">4</span> reactive()</h2>
      <p class="hint">Reactive object — no <code>.value</code> needed anywhere, even in JS.</p>

      <div class="row">
        <label>
          Name
          <input v-model="user.name" />
        </label>
        <label>
          Age
          <input type="number" v-model.number="user.age" />
        </label>
      </div>
      <div class="result">
        Hello, <strong>{{ user.name }}</strong>! You are <strong>{{ user.age }}</strong> years old.
      </div>
    </section>

    <!-- ─── 5. V-MODEL + V-FOR ───────────────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">5</span> v-model &amp; v-for</h2>
      <p class="hint">
        <code>v-model</code> for two-way binding, <code>v-for</code> for list rendering.
        Click a game to toggle its active state — notice <code>v-if</code> inside <code>v-for</code>
        is wrapped in <code>&lt;template&gt;</code>.
      </p>

      <div class="row">
        <input v-model="newGame" placeholder="New game name…" @keyup.enter="addGame" />
        <button @click="addGame">Add game</button>
      </div>

      <ul class="game-list">
        <template v-for="game in games" :key="game.id">
          <li :class="{ inactive: !game.active }">
            <span @click="toggleActive(game)" class="game-name">
              {{ game.name }}
              <span class="badge" :class="game.active ? 'badge-on' : 'badge-off'">
                {{ game.active ? 'active' : 'inactive' }}
              </span>
            </span>
            <button class="btn-remove" @click="removeGame(game.id)">✕</button>
          </li>
        </template>
      </ul>
      <p class="hint">Active games: <strong>{{ games.filter(g => g.active).length }}</strong> / {{ games.length }}</p>
    </section>

    <!-- ─── 6. V-IF / V-SHOW ─────────────────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">6</span> v-if vs v-show</h2>
      <p class="hint">
        <code>v-if</code> destroys/recreates the DOM node. <code>v-show</code> just toggles
        <code>display: none</code>. Inspect the DOM to see the difference!
      </p>

      <div class="row">
        <button @click="isLoggedIn = !isLoggedIn">
          Toggle v-if (logged in: {{ isLoggedIn }})
        </button>
        <button @click="showPanel = !showPanel">
          Toggle v-show (showPanel: {{ showPanel }})
        </button>
      </div>

      <div class="demo-box">
        <p v-if="isLoggedIn" class="success">✅ v-if: Welcome back, {{ username }}!</p>
        <p v-else class="muted">❌ v-if: Please log in (node is removed from DOM)</p>
      </div>

      <div class="demo-box">
        <p v-show="showPanel" class="success">👁 v-show: This panel is visible (display: block)</p>
        <p class="muted" v-show="!showPanel">👁 v-show: Panel hidden above (display: none — still in DOM!)</p>
      </div>
    </section>

    <!-- ─── 7. EVENT MODIFIERS ───────────────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">7</span> Event Modifiers</h2>
      <p class="hint">Vue's quality-of-life feature — no boilerplate inside handlers needed.</p>

      <div class="modifier-grid">
        <div class="modifier-item">
          <code>@submit.prevent</code>
          <form @submit.prevent="onSubmit">
            <input placeholder="Type anything…" />
            <button type="submit">Submit</button>
          </form>
          <p v-if="formSubmitted" class="success">Submitted! (no page reload)</p>
        </div>

        <div class="modifier-item">
          <code>@click.once</code>
          <button @click.once="onOnceClick">Click me (fires once only)</button>
        </div>

        <div class="modifier-item">
          <code>@click.self</code>
          <div class="self-wrapper" @click.self="onSelfClick">
            Wrapper div — click here (not the button)
            <button @click="modifierLog.unshift('inner button clicked (not .self)')">Inner button</button>
          </div>
        </div>

        <div class="modifier-item">
          <code>@keyup.enter</code>
          <input @keyup.enter="onEnterKey" placeholder="Press Enter…" />
        </div>
      </div>

      <div class="log-box" v-if="modifierLog.length">
        <h3>Event log</h3>
        <ul>
          <li v-for="(entry, i) in modifierLog" :key="i">{{ entry }}</li>
        </ul>
      </div>
    </section>

    <!-- ─── 8. LIFECYCLE HOOKS ───────────────────────────────────────────── -->
    <section class="card">
      <h2><span class="tag">8</span> Lifecycle Hooks</h2>
      <p class="hint">
        <code>onMounted</code> started a timer. <code>onUnmounted</code> will clear it when this
        component is destroyed (prevents memory leaks).
      </p>
      <div class="result">
        ⏱ Component mounted at: <strong>{{ mountedAt }}</strong><br />
        Seconds alive: <strong>{{ seconds }}s</strong>
      </div>
    </section>

    <!-- ─── NOTE: COMPONENT COMMUNICATION ────────────────────────────────── -->
    <section class="card card-note">
      <h2><span class="tag">ℹ</span> Props, Emits, Provide/Inject &amp; Slots</h2>
      <p>
        These require <strong>separate component files</strong> (.vue files) to demonstrate properly
        — they're about parent ↔ child communication. Create a <code>GameList.vue</code> or
        <code>Card.vue</code> child component and pass props/emits between them as shown in the
        readme.
      </p>
    </section>
  </div>
</template>

<style scoped>
@import './assets/app.css';
</style>