## How to share an img through microfrontends

1. Install file-loader as dev devpendency:
```bash
npm install file-loader --save-dev
```

2. And add this in `webpack.congif.js`:
```conf
  module: {
    rules: [
      ... 
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  }
```

3. In your code:
```tsx
import React from "react";
import reactImg from './img/React.svg.png';

export default ImgComponent = () => (
  <div>
    <img src={reactImg} alt="No React img found" />
  </div>
);
```

* Note that in this case I have my img stored inside `src/img` folder. It would also work inside `public/img` folder, because everything is being built.