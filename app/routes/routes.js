import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Session from '../components/Session';


const Routes = (isLoggedIn, isAdmin)=>{
    return (<Switch>
				<Route exact path="/"
					render={() => (
						isLoggedIn ? (
							<Redirect to="/dashboard"/>
						) : (
							<Redirect to="/session"/>
						)
					)} />
				<Route path="/dashboard"
					render={() => (
							isLoggedIn ? (
								<Dashboard/>
							) : (
								<Redirect to="/session"/>
							)
						)}/>
				<Route path="/session"
					render={() => (
							isLoggedIn ? (
								<Redirect to="/dashboard"/>
							) : (
								<Session/>
							)
						)}/>
		</Switch>);
};

export default Routes;
