#### 1、JSX Prevents Injection Attacks
It is safe to embed user input in JSX，By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that's not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.
#### 2、State Updates May Be Asynchronous
React may batch multiple `setState()` calls into a single update for performance.
Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.
```jsx
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
#### 3、Refs and Functional Components
You may not use the `ref` attribute on functional components because they don't have instances:
You should convert the component to a class if you need a ref to it, just like you do when you need lifecycle methods or state.

You can, however, use the `ref` attribute inside a functional component as long as you refer to a DOM element or a class component:
```jsx
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```
#### 3、About ref Caveats
If the `ref` callback is defined as an inline function, it will get called twice during updates, first with `null` and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the `ref` callback as a bound method on the class, but note that it shouldn't matter in most cases.