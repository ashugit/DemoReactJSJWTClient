import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dashboard, logoutBtn } from '../styles/common.scss';
import DashboardRoutes from '../routes/dashboard-routes';
import { logout } from '../actions/session';


class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    
    /**
     * 
     */
    render() {
        return (
            <div className={dashboard}>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                &nbsp; Demo Console
                            </a>
                        </div>
                        <button className={'btn btn-sm btn-danger ' + logoutBtn} onClick={() => { this.props.onLogout();}} > <i className="fa fa-power-off" aria-hidden="true"></i> </button>
                    </div>
                </nav>
                
                { DashboardRoutes(this.props.session.isAdmin) }
                
            </div>
        );
    }
}


Dashboard.propTypes = {
    session: PropTypes.object,
    onLogout: PropTypes.func,
};
const mapStateToProps = (state) => {
    return {
        session: state.session,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logout()),
    };
};

export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard));


