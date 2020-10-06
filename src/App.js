import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/Home';

import GoogleDrive from "./pages/GoogleDrive";




function App() {
  return (
    <>
        <Router>
            <Navbar/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/googledrive' component={GoogleDrive}/>

            </Switch>
        </Router>
    </>
  );
}

export default App;
