import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = () =>
    <div>
        <div className="container">
            <h1>Hello and Welcome to demo console, thanks for visiting.</h1>
        </div>
    </div>;
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {        
    };
};

export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
