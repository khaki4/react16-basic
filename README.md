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

// Before
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
 
 ### Portal
  - react의 root 밖에있는 element를 컨트롤 할 수 있게 해줌.
  
 ### componentDidCatch
  - Error 관리 method
  
  