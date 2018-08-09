import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Users from '../components/Dashboard/Users/users';
import User from '../components/Dashboard/Users/user';
import New from '../components/Dashboard/Users/new';
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
                            <Redirect to="/dashboard/users"/>
                        ) : (
                            <Home/>
                        )
                    )}/> 

                    <Route exact path="/dashboard/users/:id"
                    render={() => (
                        isAdmin ? (
                            <User/>
                        ) : (
                            <Redirect to="/dashboard/home"/>
                        )
                    )}/> 

                    <Route exact path="/dashboard/create/new"
                    render={() => (
                        isAdmin ? (
                            <New/>
                        ) : (
                            <Redirect to="/dashboard/home"/>
                        )
                    )}/> 
	    </Switch>);
};

export default DashboardRoutes;
