## Provider:
```tsx
import { createContext, useState, useContext, ReactNode } from "react";

export default function Provider (props: { children: ReactNode }) {
    const [state, setState] = useState({});
    return (
        <div>
            <AppContext.Provider value={[state, setState]}>
                {props.children}
            </AppContext.Provider>
        </div>
    )
}


export const AppContext = createContext(undefined);
export const useMyContext = () => {
    return useContext(AppContext);
}
```

## LogIn:
```tsx
import {useRef} from 'react';
import { useMyContext } from "../../application/provider"

export default function LogIn () {
    const nom = useRef<HTMLInputElement>(null);

    const [state, setState] = useMyContext();

    return (
        <input type="text" ref={nom}
        onChange={() => { 
            setState({name: nom.current!.value})} />
    )
}
```

## ShowState:
```tsx
import { useMyContext } from "../../application/provider"

export default function ShowState() {
    const [state, setState] = useMyContext();
    return ( <p>{state.name}</p>)
}
```

## Main:
```tsx
import Provider from './application/provider'
import LogIn from './components/login/index'
import ShowState from './components/showState/index'

import './App.css'

function App() {
  return (
    <Provider>
      <LogIn />
      <ShowState />
    </Provider>
  )
}

export default App
```
