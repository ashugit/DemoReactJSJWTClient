import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Routes from '../routes/routes';

const App = ({session}) =>{
    return(<div>
        {Routes(session.isLoggedIn, session.isAdmin)}
    </div>);
};


App.propTypes = {
    session: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

export default connect(
    mapStateToProps,
    null
)(App);
