import React from 'react';
import { Route } from 'react-router';

import Home from './pages/Home';
import Edit from './pages/Edit';
import Add from './pages/Add';

export default () => (
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/add' component={Add} />
        <Route exact path='/edit/:id' component={Edit} />
    </div>
);
