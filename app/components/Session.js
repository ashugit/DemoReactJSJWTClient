import React from 'react';
import { connect } from 'react-redux';
import { session, sessionForm } from '../styles/common.scss';
import SessionRoutes from '../routes/session-routes';

const Session = () =>
    <div className={session}>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    &nbsp; Demo  Console
                </a>
                </div>
            </div>
        </nav>
        <div className="container">
            <div className={sessionForm}>
                { SessionRoutes }
            </div>
        </div>
    </div>;


const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Session);


