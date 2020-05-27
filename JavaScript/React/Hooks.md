# Hooks

- Hooks are functions that allow the viewing of state and lifecycle features from _function_ components. 
- Hooks are meant to be a substitute for classes. Hooks do not work inside of classes, even as methods.


### `useState()`

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