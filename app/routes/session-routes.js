import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../components/Session/Login';
import Signup from '../components/Session/Signup';
import Forgot from '../components/Session/Forgot';
import Password from '../components/Session/Password';

export default (
	<Switch>
         <Route exact path="/session" component={Login} />
         <Route path="/session/login"  component={Login} />
		 <Route path="/session/signup" component={Signup}/>
         <Route path="/session/forgot" component={Forgot}/>
         <Route path="/session/password" component={Password}/>
	</Switch>
);
