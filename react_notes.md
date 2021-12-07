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

Redux-devtools-extension: For the redux extension to work in the browser.

---

## basic setup

```js
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  productList: productListReducer // see below
  // We will now have a "productList" part for the state.
});

const initialState = {};

const middlewares = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store;
```

**CombineReducers** takes multiple reducers and combine them into a single reducer.

This can be beneficial for file restructuring purposes, you mighth ave different reducers created in different files, and you combine them into a single reducer.

The **createStore** function takes in : 1 the reducer, 2 an initial state, 3 enhancers (optional)

**Enhancers** allow us to add third-party functionalities into the redux store. The only default enhancers that comes with redux is **applyMiddleware**, which takes in middlewares. A **middleware** is a wrapper function of dispatch functions.

When you wrap "applyMiddleware(...middleware)" with **composeWithDevTools**, this allows us to use the devtools extension in the browser.

---

### Provider

In order for our app to be able to access the redux states everywhere, we have to use the **Provider** function.

In index.js:

```jsx
// import other necessary stuff
import { Provider } from "react-redux";
import store from "./store.js";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

---

### Redux action

An action usually has two fields: 

- a **type** telling the reducer what kind of action this is 
- a **payload** giving the reducer the necessary information for the reducer to actually do the action

(An action is more of an "order" to the reducer to achieve the action)

```js
const actionExample = {
  type: "PRODUCT_LIST_SUCCESS", //telling the reducer that we've retrieved the products
  payload: [product1, product2, product3, product4] // the actual information
}
```

---

### Redux reducer

A reducer takes in the **current state** and an **action,** and outputs the next state.

Example: A product list reducer, which depending on the action given, returns the next state containing information about the products.

```js
export const productListReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state
  }
}
```

**Explanation**:

- the (state= { products: [] }) simply specifies the initial state of the store. (When an initial state is set for the store, this parameter is overwriten by the initial state set in the store)
- **Product_list_request**: If there's a request to the server, we wait for the products to load, so we the products of the next state is still empty (until the loading succeeds). 
- **Product_list_success**: When the reducer gets notified that the product list has been successfully loaded, we set loading to be false in the next state, and we set products to be the list of products that we fetched successfully from the backend.
- **Product_list_fail**: Obvious.
- There must be a default behavior, and the default behavior is not changing the state.

Notice that every time the reducer must return a newly created state object, and not modify the old one.

### Use constants for action types

It is common practice to save the action type strings in a separate file (productConstatnts.js for instance):

```js
export PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
// etc etc
```

And to import these constants in the reducer file. This allows intellisense to work to avoid errors due to typo.

---

### Redux event handler

The a generic event handler is a function that returns an action object.

```javascript
const productList = () => {
  //... some logic here
  return {type: "SOME_TYPE", payload: "Some payload"}
}
```

With thunk applied as middleware, instead of returning an action object directly, we can return a function which uses the dispatch function. This allows for asyncronous actions:

```js
const productList = () => async () => {
  //... some async logic here
  dispatch({type: "SOME_TYPE", payload: "Some payload"})
}
```

