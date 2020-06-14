// import styles from './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Progress} from 'antd'
// import Button from 'antd/es/button/index'
// import 'antd/es/button/style/css'
// import Layout from './components/Layout/index';
// import routerData from './router'
import Router from 'react-router-dom'
function App () {
  return (
    <div>
      1231312
    </div>
  )
}

ReactDOM.render(
  <Router.BrowserRouter>
    <Router.Switch>
      <Router.Route exact={true} component={App} path={'/'}/>
    </Router.Switch>
  </Router.BrowserRouter>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}




