import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {DemoService}  from '../../services/demo';
import { login } from '../../actions/session';
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            busy: false,
            error: ''
        };
    }

    onClickLogin(event) {
        if(this.busy) return;
        this.setState({busy: true});
        this.setState( {'error': ''});
        new DemoService().login(this.state.email, this.state.password).then( response => {
            console.log('Sign in successful ' + JSON.stringify(response));
            this.setState({busy: false});
            this.props.onSignIn(response.data.token, response.data.role);
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

    render() {
        return(
            <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                    <br/>
                    <h3>Signin to your demo</h3>
                    <br/><br/><br/>
                    <form>
                        <div className="form-group">
                            <div className={'alert alert-danger ' + (this.state.error ? 'show' : 'hide')} role="alert">
                                {this.state.error}
                            </div>
                            <label htmlFor="email">Email address:</label>
                            <input type="email"
                                   placeholder="your.email@demo.com"
                                   className="form-control"
                                   id="email"
                                   onChange={this.onChangeEmail.bind(this)}
                                   value={this.state.email}/>
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
                        <button onClick={this.onClickLogin.bind(this)}
                                disabled={!this.state.email || !this.state.password || this.state.busy}
                                className="btn btn-lg btn-info">
                                    {!this.state.busy ? 'LOGIN' : ''}
                                    <span className={(this.state.busy ? 'show' : 'hidden')}><i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i></span>
                                </button>
                        <br/>
                        <br/>
                        <Link to="/session/signup">Not yet registered ?</Link>
                        <br/>
                        <Link to="/session/forgot">Forgot your password ?</Link>
                        <br/>
                        <br/>
                    </form>
                </div>
            </div>);
    }
}


Login.propTypes = {
    session: PropTypes.object,
    onSignIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (token, role) => dispatch(login(token, role))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));
