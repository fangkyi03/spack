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





