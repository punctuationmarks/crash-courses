# Words of wisdom

- State is similar to props, but it is private and fully controlled by the component.

* Handling events:

You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.

This is not React-specific behavior; it is a part of how functions work in JavaScript. Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.

If calling bind annoys you, there are two ways you can get around this. If you are using the experimental public class fields syntax, you can use class fields to correctly bind callbacks:



## State, functions and classes

### Converting a Function to a Class

You can convert a function component like Clock to a class in five steps:

- Create an ES6 class, with the same name, that extends React.Component.
- Add a single empty method to it called render().
- Move the body of the function into the render() method.
- Replace props with this.props in the render() body.
- Delete the remaining empty function declaration.

```JS
//  function
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

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

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

### Adding state to a class

```JS
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



## Context
- Context creates a provider which passed down information/data to a consumer
[Docs](https://reactjs.org/docs/context.html#when-to-use-context)


> Before You Use Context
> Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.
> If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.