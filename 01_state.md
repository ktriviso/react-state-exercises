# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) State


### Learning Objectives
*After this code-along section, you will be able to:*
* Define state
* Create an initial state in a component
* Change the state of a component

## Intro

At this point, we know about React properties and how they relate to our component's data.
* The thing is, `props` represent data that will be the same every time our component is rendered. What about data in our application that may change depending on user action?
* That's where `state` comes in.

What's state?
> Try it yourself alongside [this video](https://generalassembly.wistia.com/medias/3ldc3tnyv0) in [this codepen](https://codepen.io/susir/pen/GWONLp).

Values stored in a component's `state` can change over time.
* `State` is similar to `props`, but *is meant to be changed*.
* Like props, which we access with `this.props.val`, we can access state values using `this.state.val`
* Setting up and modifying `state` is not as straightforward as working with props. Instead, it requires multiple methods - explicitly declaring the mutation and then defining methods to define how to update our state.

Let's switch gears back to our `hello_world` project.

Let's modify our earlier Hello World example to include a new `MoodTracker` component. There will be a mood displayed, and eventually a user will click a button to indicate on a scale of 1-10 how much of that mood they are feeling.

### Initial State

If our component will keep some internal state, we need to define it as a class instead of a function.

A constructor (`constructor(props) {}`) describes what should happen when a class is instantiated.
Constructors say, "When you create an instance of this class, do this."

When a component defined without a constructor (like `App` in the boilerplate provided by `create-react-app`) is instantiated, the constructor of the `Component` class is used by default.
This is what it means to *inherit* from another class.
The inheriting class gets all of the methods of its parent class.
By defining a method by the same name, an inheriting class can overwrite the parent class' method.

Sometimes, as will generally be the case with our React components, we want to both define custom behavior for a method our class _**and**_ call the method of the parent class.
JavaScript gives us the keyword `super` in class methods to say "call the method of the parent class that this method overwrites".

```js
class Hello extends Component {
  // what should happen when the component is first created
  constructor (props) {
    // make call to parent class' (Component's) constructor
    super(props);
  }

  // what should the component render
  render () {
    //  ....
  }
}
```

After this, we can define what's new. What's new for us right now is that when the class first gets called, we want to set an initial state. We can do this by giving a value to `this.state`, the component's special state object. Inside of that object, we can define any state properties we'd like.

We'll start our state with just one key-value pair inside.  The key or label will be `moodPoints`, and the initial value for the `moodPoints` key will be 1.

At the top of the `Hello` class in your `src/App.js` file, add the `constructor` function.

```js
class Hello extends Component {
  // what should happen when the component is first created
  constructor (props) {
    // make call to parent class' (Component) constructor
    super(props);
    // define an initial state
    this.state = {
      moodPoints: 1 // initialize this.state.moodPoints to be 1
    }
  }

  // what should the component render
  render () {
    //  ....
  }
}
```

Now let's make sure we display that information to the user. Still in `App.js`, in your `render` method, we'll let the user know how many mood points they are at by adding in a line:

```html
// note how similar this looks to accessing props
<p>You are this happy: {this.state.moodPoints}</p>
```

All together, the code inside `render` for our `App.js` can now look like this:

```html
return (
  <div>
    <h1>Hello {this.props.name}!</h1>
    <p>You are {this.props.age} years old.</p>
    <p>You love: {this.props.animals[0]}</p>
    <p>On a scale of 1-10</p>
    <p>You are this happy: {this.state.moodPoints}</p>
  </div>
)
```

> Check it out! If you browse to http://localhost:3000, your state will be displayed.


### Changing State

Ok, we set an initial state. But how do we go about changing it?

State changes as the result of some event.
First we define the callback that will be passed to a button's click event handler.
To keep things simple it sets state based off of a value the user provides to a prompt.

```js
changeMood(e) {
  const newMoodPoints = prompt('How are you feeling (1-10)?');
  this.setState({
    moodPoints: parseInt(newMoodPoints, 10)
  });
}
```

Note that we call `this.setState` to change the state rather than modifying it directly.

This is crucial.
By calling `.setState` we are letting React know that it needs to call that component's `.render` method again to see if anything has changed.
If we assign directly to state, nothing will happen.

Now we include a button in our JSX and pass our `changeMood` method to an `onClick` event listener.
When the user clicks the button, the browser invokes `changeMood`.

```js
  render () {
    // remember: can only return one top-level element

    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <p>You are {this.props.age} years old</p>
        <p>On a scale of 1-10</p>
        <p>You are this happy: {this.state.moodPoints}</p>
        <button onClick={this.changeMood}>Cheer up!</button>
      </div>
    )
  }
}
```

Try this out now:

<img width="1792" alt="screen shot 2018-04-25 at 9 02 36 pm" src="https://git.generalassemb.ly/storage/user/6387/files/62ada4e2-48cc-11e8-85b9-56884232d2f5">

`this` is `undefined`.
`this` is meant to refer to the object on which the method is called; we might expect this to be our component.

The behavior we are seeing here is one of the trickier nuances of JavaScript.
Methods are just functions defined as properties on an object.

`this` does refer to the object on which the method is called but when we pass a method as a callback, we just hand off the function to the calling code.
The function does not inherently remember where it came from; hence our error message "`this` is `undefined`".

To create a function that does remember its context (value of `this`) we can use the `.bind` method on a regular function passing the context the new function should remember.

We update our constructor to bind any callback functions to `this`:

```js
constructor (props) {
  // make call to parent class' (Component) constructor
  super(props);
  // define an initial state
  this.state = {
    moodPoints: 1 // initialize this.state.moodPoints to be 0
  };
  this.changeMood = this.changeMood.bind(this);
}
```

If we are updating state based on previous state (e.g. incrementing moodPoints) we [need to pass a function](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous) that can accept two arguments, `prevState` and `props` to setState.

```js
increaseMood(e) {
  this.setState((previousState, props) => {
    return {
      moodPoints: previousState.moodPoints + 1
    };
  });
}
```

Altogether, your `App.js` file now looks like this:

```js
// bring in React and Component from React

import React, {Component} from 'react';

// define our Hello component
class Hello extends Component {

  constructor (props) {
    // make call to parent class' (Component) constructor
    super(props);
    // define an initial state
    this.state = {
      moodPoints: 1 // initialize this.state.moodPoints to be 0
    }
    // bind callbacks to maintain context
    this.increaseMood = this.increaseMood.bind(this);
  }

  // increase moodPoints by 1 in this.state
  increaseMood(e) {
    this.setState((previousState, props) => {
      return {
        moodPoints: previousState.moodPoints + 1
      };
    });
  }

  // what should the component render
  render () {
    // make sure to return some UI

    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <p>You are {this.props.age} years old</p>
        <p>You love {this.props.animals[0]}</p>
        <p>On a scale of 1-10</p>
        <p>You are this happy: {this.state.moodPoints}</p>
        <button onClick={this.increaseMood}>Cheer up!</button>
      </div>
    )
  }
}

export default Hello
```

> Check it out! If you browse to http://localhost:3000, your button now changes the state.

Whenever we run `.setState`, React kicks off the process of [reconciliation](https://reactjs.org/docs/reconciliation.html).
React calls the render method of the component where state changed (and by extention, lifecycle methods of all of its children components), it builds out an new virtual DOM and compares it to the current virtual DOM (which represents the real DOMs current state).
In this comparison, React calculates a minimal diff between the two and updates only the parts that need to change.

This is super important! Using React, **we only change parts of the DOM that need to be changed.**

* This has implications for performance.
* We do not re-render the entire component like we have been so far.
* This is one of React's core advantages.


#### Challenge: Count to 10

After 10 clicks, the user should see the counter reset to 1.

*If you're interested in reading more in depth about this, here is more on what [should & shouldn't go in state](https://facebook.github.io/react/docs/state-and-lifecycle.html). This link is also in the Further Reading page at the end of the React module.*

##### Bonus: Increment and Decrement

Add a button to decrement the moodPoints

##### Double Bonus: Create a `Mood` Component

Make a component `Mood` that accepts a single prop `mood` and manages moodPoints internally.

The component:

```
<Mood mood={'happy'} />
```

should render

```
<div>
  <p>On a scale of 1-10</p>
  <p>You are this {this.props.mood}: {this.state.moodPoints}</p>
  <button onClick={this.increaseMood}>Increase {this.props.mood}</button>
  <button onClick={this.decreaseMood}>Decrease {this.props.mood}</button>
</div>
```

##### Mega Bonus

Change the style of the `Mood` component based on the moodPoints
