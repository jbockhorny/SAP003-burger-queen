import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Hall from '../Pages/hall';
import Kitchen from '../Pages/kitchen';
import Home from '../Pages/home';

function Routes() {


  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/hall" component={Hall} />
          <Route path="/kitchen" component={Kitchen} />
        </Switch>
      </div>
    </Router>
  )

}

export default Routes;