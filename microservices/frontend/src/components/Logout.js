import { Fragment} from "react";
import { logout } from '../actions/authActions'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'


export const Logout = (props) => {

    return (
        <Fragment>
            <Link to='/' className="nav-link" onClick={props.logout}>Logout</Link>
        </Fragment>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, {logout})(Logout);
