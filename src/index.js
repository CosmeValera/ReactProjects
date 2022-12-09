import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div>
      <h1>Cosme valera</h1>
      <ul>
        <li>Menu</li>
        <li>Contact</li>
        <li>About</li>
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<div><App /></div>);
