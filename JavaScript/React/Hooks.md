# Hooks

- Hooks are functions that allow the viewing of state and lifecycle features from _function_ components. 
  - Hooks are meant to be a substitute for classes. Hooks do not work inside of classes, even as methods.
- Hooks cannot be called inside loops or conditions, only call them straight at the "top level" of the function they're initialized in
- The same type of hook can be used as many times as needed, they're just api functions, think of them as tools
- For custom hooks, the naming convention is useWhateverItDoes. This is built into the react linters and debuggers to help with creating custom hooks 

> The state of these components is completely independent. Hooks are a way to reuse stateful logic, not state itself. In fact, each call to a Hook has a completely isolated state — so you can even use the same custom Hook twice in one component.

## `useState()`

- `useState` preserves the state between renders.`useState()` returns a "pair", the current state (`count` in this example) and a function that allows the state to be updated (`setCount`).
- The current state and function that updates the current state are accessed through array destructuring of 

```JS
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  // setCount() is the function that will be called to update the count when the button is clicked
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> 
        Click me
      </button>
    </div>
  );
}
```

- `useState()` can be used multiple times in a component, so if you have multiple things to keep track of with state, use `useState` multiple times
```JS
function ExampleWithManyStates(){
    const [age, setAge] = useState(0);
    const [bicycle, setBicycle] = useState("single-speed-cross");
    const [todos, setTodos] = useState({"Learn some hooks to get better at FP"});
} 
```



## `useEffect()`

- Replaces the life cycles of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` into one function
- Used for dealing with "side effects" which are "data fetching, subscriptions, or manually changing the DOM from React components", ect according to the docs _This idea of side effects is a core CS concept not just a functional programming concept_
- Since effects are run inside of the functional component, they have access to the state and any properties
- The effect hook renders every time the dom gets updated by React
  - By default, React calls `useEffect()` after every render

- This is the hook that most other custom hooks are built upon


## `useContent()`


## `useReducer()`
