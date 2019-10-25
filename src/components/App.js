import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import HomePage from './Pages/HomePage';
import FormCreate from './Pages/FormCreate';
import FormList from './Pages/FormList';
import FormEdit from './Pages/FormEdit';
import LoginPage from './Pages/LoginPage';
import FormDelete from './Pages/FormDelete';


const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/page/new" exact component={FormCreate} />
                    <Route path="/page/list" exact component={FormList} />
                    <Route path="/page/edit" exact component={FormEdit} />
                    <Route path="/page/Login" exact component={LoginPage} />
                    <Route path="/page/delete" exact component={FormDelete} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;

