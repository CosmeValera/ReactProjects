import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<div><App /></div>);
// root.render(<App />);
