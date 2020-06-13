import styles from './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd'
// import Layout from './components/Layout/index';
// import routerData from './router'
// import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
console.log('styles',styles)
function App() {
  return (
    <div className={styles.a1}>123123123</div>
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




