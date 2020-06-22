# Words of wisdom

- State is similar to props, but it is private and fully controlled by the component.

- Handling events:

>You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.

>This is not React-specific behavior; it is a part of how functions work in JavaScript. Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.

>If calling bind annoys you, there are two ways you can get around this. If you are using the experimental public class fields syntax, you can use class fields to correctly bind callbacks:

>JSX comes with the full power of JavaScript. You can put any JavaScript expressions within braces inside JSX. Each React element is a JavaScript object that you can store in a variable or pass around in your program.
























































## State, functions and classes
- Props are read only!
All React components must act like pure functions with respect to their props.


### Reconciliation
[React Docs](https://reactjs.org/docs/reconciliation.html)

### Converting a Function to a Class

You can convert a function component like Clock to a class in five steps:

- Create an ES6 class, with the same name, that extends React.Component.
- Add a single empty method to it called render().
- Move the body of the function into the render() method.
- Replace props with this.props in the render() body.
- Delete the remaining empty function declaration.

```js
//  function
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```
```js
// class
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
```js
// calling either the class or the function
function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

### Adding state to a class

```js
class Clock extends React.Component {

//   Add a class constructor that assigns the initial this.state:
// Note how we pass props to the base constructor:

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

// Replace this.props.date with this.state.date in the render() method:
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
// Remove the date prop from the <Clock /> element:
  <Clock />,
  document.getElementById('root')
);

```


































































## Component composition
 







































































## Context

- Context creates a provider which passed down information/data to a consumer
  [Docs](https://reactjs.org/docs/context.html#when-to-use-context)

> Before You Use Context
> Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult. If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.

- This looks like it could lead to hairy bugs
 > The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.


- Every context object comes with a provider component that can render the value of said object (___terminology___: the component pushing the context object is considered `providing` and the receiving component is considered `consuming` the object's value)

- Note in react, every consumer that is a descendant of a provider will rerender when the context changes (when the `provider`'s `value` `prop` changes)

- `createContext()`
  - Creates a 'context' object
  - When a component uses this object, it will return the current context value from the nearest branch
  - The default value is ___only___ used when a component doesn't have a provder in its tree, meaning you can't pass `undefined` to a provider and get the default value (_what you get? idk, find out_)

```js
const ContextComponent = React.createContext(defaultValue);
```


- `Context.Provider`
 - Accepts the value props consumed by descendent components and that will override the defaultValue
 - One provider can be connected to many consumers
```js
<ContextComponent.Provider value={/*whatever desired value*/}>

```


- `Context.Consumer`
  - Consumes the context object's value, this is done through a function that takes that value (recommended to see `render props` concept)


```js
<ContextComponent.Consumer>
  {value => /* render something based on the context value */}
</ContextComponent.Consumer>
```

> Requires a function as a child. The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().



- `Context.displayName` (_beneficial for debugging_)

 - This allows the overwriting of the displayed name in the react developer tools, for ease in debugging

 ```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
 ```




















































































## Conditional Rendering

- Use a variable to hold a component, then render that component based on some condition.

```js
import LogoutButton from "...";
import LoginButton from "...";

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);
```


- Using JSX to wrap a conditional, anything inside `{}` will be concidered a conditional in JSX
```js



function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            { unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2> }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);
```


- Using ternary operators to conditionally display texts or elements/components

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{ isLoggedIn ? 'currently' : 'not' }</b> logged in.    </div>
  );
}
```


```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      { isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />      
      }
    </div>  );
}
```


- Using `null` as props on a component to not render something
```js
function WarningBanner(props) {
  if (!props.warn) {    // so if props.warn === true, then this condition will fail and it'll run
    return null;  
    }
  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />        
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
















































































## Lists and Keys in react

- Mapping over passed props and dynamically rendering the number of li items, with unique keys
```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>      
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

- Key are essential when having a list in react
  - Has to be a unique string associated with each item in that property
  - Usually pick the item property's id, if there is no id or way to ensure a unique string is passed, then use their index number as a __last resort__. [Docs on why keys are important to avoid using indexes, hint it's due to rerendering moved components](https://reactjs.org/docs/reconciliation.html#recursing-on-children)
  - Keys only need to be unique to sibling components, they do not need to be globally unique
  - When having the choice render keys inside of components, not the html elements (so `<ListItem key={props.id}>` not `<li key={props.id}>` when possible)
    - > A good rule of thumb is that elements inside the map() call need keys.
  - > "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:"




- When extracting a component, put the keys on the individually rendered components, not the html tags themselves
  - Examples are incorrect way of setting keys and then refactored correctly
```js
// incorrect way to handle keys
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:    
    <li key={value.toString()}>      
    {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:    
    <ListItem value={number} />  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

```js
// refactored keys
function ListItem(props) {
  // Correct! There is no need to specify the key here:  
  return <li>{props.value}</li>;}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.    
    <ListItem key={number.toString()} value={number} />  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```


- When you want to use a component's id but also need a key, pass both explicitly so that you can use the props.id
```js
const content = posts.map((post) =>
  <Post
    key={post.id}    
    id={post.id}    
    title={post.title} />
);
```