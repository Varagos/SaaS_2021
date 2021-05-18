import React from "react";
import { connect } from "react-redux";
import { Route, Redirect} from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
        <Route {...rest} component={props => (
            isAuthenticated ? (
                <Component {...props} />
            ): (
                <Redirect to='/login' />
            )
    )} />
)

const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated})
export default connect(mapStateToProps)(PrivateRoute);
