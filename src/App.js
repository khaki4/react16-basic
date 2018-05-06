import React, { Component } from 'react';

const MAX_PIZZAS = 10;

const eatPizza = (state, props) => {
  const { pizzas } = state;
  if (pizzas < MAX_PIZZAS) {
    return {
      pizzas: pizzas + 1,
    }
  } else {
    return null;
  }
};

class Controlled extends Component {
  state = {
    pizzas: 0,
  };

  handleClick = () => {
    this.setState(eatPizza)
  }

  render() {
    const { pizzas } = this.state;
    return (

      <button onClick={this.handleClick}>
        {`
          I have eaten ${pizzas}
            ${pizzas === 1 ? "pizza" : "pizzas"}
        `}
      </button>
    );
  }
}

class App extends Component {
  render() {
    return <Controlled />;
  }
}

export default App;
