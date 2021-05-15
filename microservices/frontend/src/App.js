import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Home from "./Home";
import Create from "./Create";
import QuestionDetails from "./QuestionDetails";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./Register";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import QuestionList from "./QuestionList";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/create">
              <Create />
            </Route>
            <Route path="/posts">
              <QuestionList />
            </Route>

            <Route path="/blogs/:id">
              <QuestionDetails />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
