import './App.css';
import UserList from './components/UserList';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Authentication from './Authentication';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <UserList />
        </Route>
      </Switch>
    </Layout>
  );
}

export default Authentication(App);
