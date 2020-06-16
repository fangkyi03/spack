// import styles from './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Progress} from 'antd'
import Router from 'react-router-dom'
function App () {
  return (
    <div>
      <Button>1313123</Button>
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




