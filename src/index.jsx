// import styles from './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Progress} from 'antd'
// import Button from 'antd/es/button/index'
// import 'antd/es/button/style/css'
// import Layout from './components/Layout/index';
// import routerData from './router'
// import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
function App() {
  return (
    <div>
      <Progress percent={30}></Progress>
    </div>
  )
}
console.log('13123')
ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}




