# 🐻 Zustand

🐻 [Zustand](https://zustand-demo.pmnd.rs/) is a lightweight and intuitive **global state manager** for React, widely used as a simpler alternative to Redux. It offers a tiny API, zero boilerplate, and fast performance, making it ideal for managing state cleanly without the complexity of larger libraries.

##  🤔 Redux vs Zustand
| Redux | **Zustand** | React Context |
|-------|---------|---------------|
| More boilerplate and verbose | **Concise syntax** |
| Larger bundle size | **Lightweight library** |
| Steeper learning curve | **Easy to learn and use** |
| Complex setup with actions, reducers, and middleware | **Simple API with minimal boilerplate** |
| Better for very large applications | **Use it always if possible. Ideal for small to medium projects** | Only for things that change very little like the state of the user or web theme (dark, light) |

## 💻 Code difference Redux vs Zustand

### Redux Toolkit
```javascript
// Store setup
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: state => { state.count += 1 },
    decrement: state => { state.count -= 1 }
  }
});

const store = configureStore({ reducer: counterSlice.reducer });

// Component
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}
```

### Zustand
```javascript
// Store setup (that's it!)
import { create } from 'zustand';

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 }))
}));

// Component (no Provider needed)
function Counter() {
  const { count, increment } = useStore();
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

**Key differences:** Zustand has no Provider, no dispatch, no actions; just create a store and use it. Redux Toolkit is cleaner than classic Redux but still requires more setup.

## 🍓 Creating Zustand project
Let's create a project with Vite:
```sh
npm create vite@latest
```
> **Name:** javascript-quizz . **Tech:** React + TS + SWC

Let's install zustand:
```sh
npm install zustand
```

### How the app looks

![JavaScript Quizz](./javascript-quizz.png)

### Zustand store
Interesting file to check: **[Zustand Questions Store](./javascript-quizz/src/store/questionsStore.ts)**

**Key ideas from that file:**
- `questions` and `currentQuestions` can be understood as useState functions, but gobally. This way you don't have to pass props everywhere throughout the project.

- The **Zustand methods** (`fetchQuestions` and `selectAnswer`) are used to **change the values** of the `questions` array, and so on with the other methods. **And the React components** is what is used to interpret that `questions` array and **present the information** with CSS (background red when the answer is wrong...).

- You can add persistence, just by adding the Zustand middleware `persist` wrapping all the Zustand store. By default, Zustand will persist the information in LocalStorage, and that's how it's done in the code (all the Zustand's store goes to the object in localStorage called `questions`). Zustand provides versatility in the persistence, you can change it to persist to SessionStorage, IndexedDB, Firebase, a custom MySQL Database...

- For the reset button it's very easy, you just need to remove the information of `currentQuestions` and `questions`, like this: `set({ currentQuestion: 0, questions: []})`.

- If you want to access one value of the store, do it like this: ✅ `const questions = useQuestionsStore(state => state.questions)`✅ to avoid unnecesary rerenders. Avoid doing it like this: ❌`const { questions } = useQuestionsStore(state => state)`❌. More information in the **[custom hook file](./javascript-quizz/src/hooks/useQuestionsData.tsx)** 