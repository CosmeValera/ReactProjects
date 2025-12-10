# 🐻 Zustand

🐻 [Zustand](https://zustand-demo.pmnd.rs/) is a lightweight and intuitive global state manager for React, widely used as a simpler alternative to Redux. It offers a tiny API, zero boilerplate, and fast performance, making it ideal for managing state cleanly without the complexity of larger libraries.

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
.