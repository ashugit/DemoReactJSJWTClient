import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {DemoService}  from '../../services/demo';
import { signup } from '../../actions/session';
class Signup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            name: '',
            password: '',
            busy: false,
            error: ''
        };
    }

    onClickSignUp(event) {
        this.setState({busy: true});
        if(this.busy) return;
        this.setState( {'error': ''});
        new DemoService().signup(this.state.email, this.state.name, this.state.password).then( response => {
            console.log('Sign up successful ' + JSON.stringify(response));
            this.setState({busy: false});
            this.props.onSignUp(response.data.token, response.data.role);
            return true;
        }).catch(err =>{
            let error = 'Error in signing up';
            if(err && err.response && err.response.data && err.response.data.reason) {
                error = err.response.data.reason;
            }
            this.setState( {'error': error, busy: false});
        });   
    }

    onChangeEmail(event) {
        this.setState({'email': event.target.value, error: ''});
    }

    onChangePassword(event) {
        this.setState({'password': event.target.value, error: ''});
    }

    onChangeName(event) {
        this.setState({'name': event.target.value, error: ''});
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                    <br/>
                    <h3>Signup for demo</h3>
                    <br/><br/><br/>
                    <form>
                        <div className={'alert alert-danger ' + (this.state.error ? 'show' : 'hide')} role="alert">
                            {this.state.error}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address:</label>
                            <input type="email"
                                   placeholder="your.email@demo.com"
                                   className="form-control"
                                   id="email"
                                   onChange={this.onChangeEmail.bind(this)}
                                   value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Name:</label>
                            <input type="name"
                                   placeholder="your name"
                                   className="form-control"
                                   id="name"
                                   onChange={this.onChangeName.bind(this)}
                                   value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control"
                            id="pwd"
                            placeholder="your password"
                            onChange={this.onChangePassword.bind(this)}
                            value={this.state.password}/>
                        </div>
                        <br/>
                        <p>{this.state.busy}</p>
                        <button onClick={this.onClickSignUp.bind(this)}
                                disabled={!this.state.email || !this.state.password || !this.state.name  || this.state.busy}
                                className="btn btn-lg btn-info">
                                    {!this.state.busy ? 'SIGNUP' : ''}
                                    <span className={(this.state.busy ? 'show' : 'hidden')}><i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i></span>
                                </button>
                        <br/>
                        <br/>
                        <Link to="/session/login">Already registered ?</Link>
                        <br/>
                        <br/>
                    </form>
                </div>
            </div>);
    }
}


Signup.propTypes = {
    session: PropTypes.object,
    onSignUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUp: (token, role) => dispatch(signup(token, role))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup));

