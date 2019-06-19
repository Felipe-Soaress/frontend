import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import User from './pages/User';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/box" component={Main}/>
            <Route path="/files/:id" component={Box}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/login/:id" component={Login}/>
            <Route path="/user" component={User}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;