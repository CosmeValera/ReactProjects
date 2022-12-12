import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function Header() {
  return (
    <header> 
      <nav className='nav'>
        <img className="nav-logo" src={require('./react-logo.png')} alt='logo-react'/>
        <ul className='nav-items'>
          <li>Pricing</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

function MainContent() {
  return (
    <div>
      <h1>Why I love working with react: </h1>
      <ol>
        <li>Because React seems entertaining</li>
        <li>Because it requires another mindset
          to work with</li>
      </ol>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <small>© 2022 Valera Development. All rights reserved.</small>
    </footer>
  );
}

function Page() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

ReactDOM.render(<Page />, document.querySelector("#root"));