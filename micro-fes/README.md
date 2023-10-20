### README: micro-fe1-solidjs-and-react

Practicing microfrontends. 

1. We will create one microfrontend for the `host` and one for the `remote`. For this we will use the following command **twice**: 
```bash
npx create-mf-app
```
2. install dependencies in each one with:
```bash
npm i
```
3. run project in each one with:
```bash
npm start
```

The craziest thing in this is that to share one project to the host. (In this case we try to embed remote to react-host), we have to export a wrapper, in this case I'm using couterWrapper which wraps Counter, this is the code:
```
import { render } from "solid-js/web";

import Counter from "./Counter";

export default (el) => {
    render(Counter, el);
}
```

In the react-host proyect, we are using the imported counterWrapper and the react ref:
```
import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";

import counterWrapper from "remote/counterWrapper";

import "./index.scss";

const App = () => {
  const divRef = useRef(null);

  useEffect( () => {
    counterWrapper(divRef.current)
  }, []);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: react-host</div>
      <div ref={divRef}></div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
```

---

🔗 To find more information go to the Readme of micro-fe-2-react: https://github.com/CosmeValera/ReactProjects/tree/master/micro-fes/micro-fe-2-react
