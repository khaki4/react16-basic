# Basic React 16

### Return Types

```javascript
// Before
render() {
  return (
    <div> // 쓸모없는 warpper
      <header></header>
      <div></div>
      <footer></footer>
    </div>
  );
}

// After
render() {
  return (
    <Fragment>
      <header></header>
      <div></div>
      <footer></footer>
    </Fragment>
  );
}
//********************************************\\
// string을 컴포넌트 리턴타입으로 사용할 수 있음
 const Message = () => 'Just touched it!';
 ```

  ```javascript
  // index.js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  ReactDOM.render(<App />, document.getElementById('root'));

  // App.js
  import React, { Component, Fragment } from 'react';

  class App extends Component {
    render() {
      return (
        <Fragment>
          <ReturnTypes />
          <Portals />
        </Fragment>
      );
    }
  }

  export default App;
  ```
___

### Portal
- react의 root 밖에 있는 element를 컨트롤 할 수 있게 해줌.

 ```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <!-- 컨트롤 할 수 없는 영역 -->
    <div id="touchme">cant touch</div>
    <!-- ///////////////// -->
    <div id="root"></div>
  </body>
</html>
```

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
```javascript
// App.js
import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';

class Portals extends Component {
  render() {
    return createPortal(
      <Message />,
      document.getElementById('touchme')
    )
  }
}

const Message = () => 'Just touched it!';

class ReturnTypes extends Component{
  render() {
    return 'hello';
  }
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <ReturnTypes />
        <Portals />
      </Fragment>
    );
  }
}

export default App;
```
---
### componentDidCatch
 - Error 관리 method
  ```javascript
  class App extend Component {
    componentDidCatch = (error, info) => {
      this.setState({
        hasError: true,
      })
    }
  }
  ```
- With HOC
```javascript
import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';

const ErrorFallback = () => ' Sorry something went wrong';
const BoundaryHOC = ProtectedComponent => class Boundary extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorFallback />;
    } else {
      return <ProtectedComponent />;
    }
  }
}

class ErrorMaker extends Component {
  state = {
    friends: ['f1', 'f2','f3', 'f4']
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        friends: undefined,
      });
    }, 2000);
  }

  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}
const PErrorMaker = BoundaryHOC(ErrorMaker);

class Portals extends Component {
  render() {
    return createPortal(
      <Message />,
      document.getElementById('touchme')
    )
  }
}
const PPortals = BoundaryHOC(Portals);

const Message = () => 'Just touched it!';

class ReturnTypes extends Component {
  render() {
    return 'hello';
  }
}

class App extends Component {
  state = {
    hasError: false,
  }
  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
    })
  }
  render() {
    return (
      <Fragment>
        <ReturnTypes />
        <PErrorMaker />
        <PPortals />
      </Fragment>
    );
  }
}

export default BoundaryHOC(App);
  ```
___
### setState
- setState인자에 null을 return함으로서 view를 update하지 않을 수 있다.
 ```javascript
 setState(() => null)
 ```
