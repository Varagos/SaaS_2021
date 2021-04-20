import React from 'react';
import Login from "./login/Login";
import Register from "./register/Register";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css'
import Button from 'react-bootstrap/Button';


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                </Switch>
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <Button>Home</Button>
        <h1>Home page</h1>
    </div>
)

export default App;
