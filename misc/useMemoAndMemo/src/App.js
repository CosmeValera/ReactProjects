import { useState, useMemo, memo } from "react";
import { Layout, Button, VisualComponent } from "./componentes";

const Contador = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>
      
      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
    </>
  )
}
const Alpha = () => {
  return (
    <VisualComponent title="Alpha" metodo="Abstracción">
      <Contador />
      <Bravo />
    </VisualComponent>
  );
};

const Bravo = () => {
  const [counter, setCounter] = useState(0);
  return (
    <VisualComponent title="Bravo">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
      <div className="grid grid-rows-2 md:grid-cols-2 md:gap-4 md:grid-rows-1">
        <CharlieMemo />
        {/* <CharlieUseMemo /> */}
        <Fetch hijo={<Fetch2 />} />
      </div>
    </VisualComponent>
  );
};

// * memo vs useMemo down below
const CharlieMemo = memo(() => {
  const [counter, setCounter] = useState(0);

  return (
    <VisualComponent title="Charlie" metodo="memo">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>
      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
      <CharlieJr />
    </VisualComponent>
  );
});

const CharlieUseMemo = (() => {
  const [counter, setCounter] = useState(0);
  
  return (
    useMemo(() => 
      <VisualComponent title="Charlie" metodo="useMemo">
        <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>
        <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
        <CharlieJr />
      </VisualComponent>, [counter])
  );
});

const CharlieJr = () => {
  const [counter, setCounter] = useState(0);
  return (
    <VisualComponent title="CharlieJr">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
    </VisualComponent>
  );
};

const Fetch = (props) => {
  const [counter, setCounter] = useState(0);

  return (
    <VisualComponent title="Fetch" metodo="props">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Fetch Api</Button>
      {props.hijo}
    </VisualComponent>
  );
};
const Fetch2 = () => {
  const [counter, setCounter] = useState(0);

  return (
    <VisualComponent title="Fetch 2">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Fetch Api</Button>
    </VisualComponent>
  );
};

export default function App() {
  return (
    <Layout>
      <Alpha />
    </Layout>
  );
}


// * EXPLANATION memo vs useMemo:
// React.memo es un componente de alto nivel (o H.O.C — High Order Component en inglés),
// por lo tanto, siempre recibirá un componente de React como primer argumento,
// lo memorizará y utilizará las props para condicionar su renderizado. Por su parte,
// useMemo es un hook de React que recibe una función.
//
//// Ventajas y desventajas entre ambos: ////
//
// 1. React.memo puede ser utilizado fuera de componentes de React. useMemo, al ser un hook,
//    solo puede ser utilizado dentro de un componente funcional de React.
// 2. React.memo permite comparar las props del renderizado anterior vs las props del nuevo
//    renderizado y crear condicionales a nuestro criterio para decidir cuando actualizar el
//    componente. useMemo solo se actualizará cuando alguna de sus dependencias haya cambiado.
// 3. useMemo puede recibir funciones y memorizar el resultado de estas, React.memo solo
//    memoriza componentes de React.
//
// In general memo/useMemo are recommended only for heavy components with a lot of logic.
// A reccomended approach for lighter components is to use props.