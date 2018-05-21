import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../view/home';
import Hello from '../view/hello';
import NotFound from '../view/notFound';
import Error from '../view/error/Example';
import DataTable from '../view/antd/Table';

export default () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/hello" component={Hello}/>
        <Route path="/error" component={Error}/>
        <Route path="/ant/table" component={DataTable}/>
        <Route path="*" component={NotFound}/>
    </Switch>
)
