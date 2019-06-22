import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import User from './pages/User';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/box" component={Main}/>
            <Route path="/files/:id" component={Box}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login/:id" component={Login}/>
            <Route path="/user" component={User}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;