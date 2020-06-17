import React from 'react';
import ReactDOM from 'react-dom';
import {Button,Progress} from 'antd'
import Router from 'react-router-dom'
import styles from './test.module.css'
function App () {
  return (
    <div className={styles.main}>
      {
        Array(10).fill({}).map((e,i)=>{
          const index = i + 1
          return (
            <Button onClick={()=>console.log(index)}>{index}</Button>
          )
        })
      }
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





