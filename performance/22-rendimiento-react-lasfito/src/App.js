import { useState, memo } from "react";
import { Layout, Button, VisualComponent } from "./componentes";

const Alpha = () => {
  const [counter, setCounter] = useState(0);
  return (
    <VisualComponent title="Alpha">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
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
        <Charlie />
        <Fetch />
      </div>
    </VisualComponent>
  );
};

const Charlie = () => {
  const [counter, setCounter] = useState(0);
  return (
    <VisualComponent title="Charlie">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
      <CharlieJr />
    </VisualComponent>
  );
};

const CharlieJr = () => {
  const [counter, setCounter] = useState(0);
  return (
    <VisualComponent title="CharlieJr">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Actualizar Estado</Button>
    </VisualComponent>
  );
};

const Fetch = () => {
  const [counter, setCounter] = useState(0);

  return (
    <VisualComponent title="Fetch">
      <h4 className="-mt-2 mb-1 font-thin"> {counter}</h4>

      <Button onClick={() => setCounter(counter + 1)}>Fetch Api</Button>
      <Fetch2 />
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
