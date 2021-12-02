# React Notes

## React-Bootstrap

React bootstrap is a bootstrap based React component library. Other libraries that can be used with React include AntD, Material-UI etc.

### Installation

```terminal
npm install react-bootstrap
```

### Stylesheet

React-bootstrap **does not come with CSS by default**. It is therefore necessary to manually include a CSS file.

You can add the default bootstrap CSS file, whether by downloading it or by using a CDN. Or you can use a CSS file with customized theme, for example from **bootswatch**.

Download the css file into the **src** folder, then in App.js or in index.js:

```js
import "./bootstrap.min.css";
```

---

## Installing react-router

```terminal
npm install react-router-dom
```

to use with react-bootstrap:

```terminal
npm install react-router-bootstrap
```

### Importing Router

```js
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
```

- Everything that uses React Routes should be wrapped by the **Router** component.
- Every **Route** should be embedded into a **Routes** component, equivalent to **Switch** in React-Router v5.
- The only components that are under **Routes** components should be **Route** components.

```jsx
<Router>
	<Routes>
    <Route exact path="/" element={<HomeScreen/>}/>
    <Route path="/register" element={<RegisterScreen/>}/>
  </Routes>
</Router>
```

Intead of using anchor tags, use **Links** for react in order to avoid refreshing the page.

You can use the **Nav.Link** from react-bootstrap if you want to wrap React-boostrap components into links.

### Reading URL in components

```js
const { id } = useParams();
```

### Rendering a react-bootstrap component as another html element

Say we use the **Nav** compoenent from react-bootrap, but we want it to be shown as a **div**: we use the **as** attribute.

```jsx
<Nav.Link as={div} to="/login">
```

### useParams

Say we are in the url /product/:id , in order to retrieve the id, we can use the **useParams** hook from React-Router:

```js
import { useParams } from "react-router-dom";
const { id: productId } = useParams(); 
```

### useState

When you have a function based component, in order to use state, you can use the useState hook.

More documentation can be found here: https://reactjs.org/docs/hooks-state.html

```js
const MyComponent = () => {
  const [number, setNumber] = useState(0);
  
  useEffect(() => {
    //This is equivalent to the componentDidMount and componentDidUpdate
    setNumber(number + 1); // Increases number by one.
  })
}
```

#### async useEffect

useEffect, contrary to componentDidUpdate, cannot return a promise. Therefore it cannot be async.

However, you can wrap an async function in it.

```js
useEffect(() => {
  const myFunction = async () => {/* some async operations happen here */};
  myFunction();
})
```

---

### npm scripts

In the package.json, in the script section:

```json
  "scripts": {
    "start": "node backend/index.js",
    "server": "nodemon backend/index.js",
    "client": "npm start --prefix frontend",
  },
```

with these examples:

```terminal
npm start
```

will be equivalent to:

```terminal
node backend/index.js
```

and

```terminal
npm run server
```

```terminal
nodemon backend/index.js
```

and

```terminal
npm run client
```

```
cd frontend
npm start
cd ..
```



### concurrently

```terminal
npm install concurrently
```

Once concurrently is installed, you can run two commands at the same time concurrently.

```json
  "scripts": {
    "start": "node backend/index.js",
    "server": "nodemon backend/index.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
  },
```

---

### Redux

Setup:

```terminal
npm install redux react-redux redux-thunk redux-devtools-extension
```

Redux: Redux is not associated to redux, it is a stand alone package.

React-redux: Interaction between react and redux

Redux-thunk: Allows asynchronous actions

