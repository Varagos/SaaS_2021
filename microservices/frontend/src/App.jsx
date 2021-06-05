import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';
import store from './store';

import AppNavbar from './AppNavbar';
import Home from './Home';
import Create from './Create';
import QuestionDetails from './QuestionDetails';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import QuestionList from './QuestionList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PrivateRoute from './components/PrivateRoute';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <AppNavbar />
          <div>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>

              <PrivateRoute path='/create' component={Create} />

              <Route exact path='/posts/page/:id'>
                <QuestionList />
              </Route>

              <PrivateRoute
                exact
                path='/posts/:id'
                component={QuestionDetails}
              />

              <Route path='/login'>
                <Login />
              </Route>

              <Route path='/register'>
                <Register />
              </Route>

              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
