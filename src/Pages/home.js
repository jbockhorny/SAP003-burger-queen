import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Hall from './hall';
import Kitchen from './kitchen';
import RouterHome from '../Components/routerHome'

function Home() {


  return (

    <Router>
      <div>
        <Switch>
          <Route path="/hall">
            <Hall />
          </Route>
          <Route path="/kitchen">
            <Kitchen />
          </Route>
          <Route exact path="/">
            <RouterHome />
          </Route>
        </Switch>
      </div>
    </Router>

  )

}

export default Home;