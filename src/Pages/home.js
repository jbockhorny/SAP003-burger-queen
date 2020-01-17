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
        <Switch>
          <Route path="/hall" component={Hall} />
          <Route path="/kitchen" component={Kitchen} />
          <Route exact path="/" component={RouterHome} />
        </Switch>
    </Router> 
  )

}

export default Home;
