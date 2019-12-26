import React,{Component} from 'react';
import './App.css';
import Mytable from './Components/Table/index'
import router from './Components/router-create.js'

import {
  // BrowserRouter,
  Route,
  // Link,
  // NavLink,
  // Redirect,
  Switch,
  // withRouter
} from 'react-router-dom';

class App extends Component{
  render(){
    return(
        <div className="App">
          <Switch>
            <Route exact path="/" component={Mytable}/>
            <Route exact path="/adddata" component={router}/>
        </Switch>
        </div>
    );
  }
}

export default App;