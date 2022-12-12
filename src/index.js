/**
Challenge:

Part 2:
- Add a 'header` element with a nested `nav` element. Inside the `nav`,
  include a `img` element with the image of the React logo inside
  (src="./react-logo.png") and make sure to set the width to something
  more manageable so it doesn't take up the whole screen
- Add an `h1` with some text describing the page. (E.g. "Reasons
  I'm excited to learn React"). Place it above the ordered list.
- Add a footer after the list that says:
    "© 20xx <last name here> development. All rights reserved."
*/

import React from 'react';
import ReactDOM from 'react-dom';

function Page() {
  return (
    <div>
      <header>
        <nav>
          <img src={require('./react-logo.png')} alt='logo-react' width='40px'/>
        </nav>
      </header>
      <h1>Why I love working with react: </h1>
      <ol>
        <li>Because React seems entertaining</li>
        <li>Because it requires another mindset
          to work with</li>
      </ol>
      <footer>
        <small>© 2022 Valera Development. All rights reserved.</small>
      </footer>
    </div>
  );
}

ReactDOM.render(<Page />, document.querySelector("#root"));