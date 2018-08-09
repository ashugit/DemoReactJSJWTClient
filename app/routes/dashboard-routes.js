import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Users from '../components/Dashboard/Users';
import Home from '../components/Dashboard/Home';

const DashboardRoutes = (isAdmin)=>{
    return (<Switch>
                <Route exact path="/dashboard"
					render={() => (
						isAdmin ? (
							<Users/>
						) : (
                            <Home/>
						)
					)} />
                <Route exact path="/dashboard/users"
                    render={() => (
                        isAdmin ? (
                            <Users/>
                        ) : (
                            <Redirect to="/dashboard/home"/>
                        )
                    )}/>

                <Route exact path="/dashboard/home"
                    render={() => (
                        isAdmin ? (
                            <Redirect to="/dashboard/home"/>
                        ) : (
                            <Home/>
                        )
                    )}/>
 
	    </Switch>);
};

export default DashboardRoutes;
