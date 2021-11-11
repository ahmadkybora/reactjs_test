import './App.css';
import React, { Component } from 'react';
import Student from './components/student';
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/" exact component={Student} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
