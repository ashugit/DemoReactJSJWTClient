import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {DemoService}  from '../../services/demo';
import {push} from 'react-router-redux';

class Forgot extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            busy: false,
            error: ''
        };
    }

    onClickForgot(event) {
        if(this.busy) return;
        this.setState({busy: true});
        this.setState( {'error': ''});
    }

    onChangeEmail(event) {
        this.setState({'email': event.target.value, error: ''});
    }

    render() {
        return(
            <div className="row">
                <div className="col-sm-offset-3 col-sm-6">
                    <br/>
                    <h3>Forgot your demo Password ?</h3>
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
                        <br/>
                        <p>{this.state.busy}</p>
                        <button onClick={this.onClickForgot.bind(this)}
                                disabled={!this.state.email || this.state.busy}
                                className="btn btn-lg btn-info">
                                    {!this.state.busy ? 'REPORT FORGOT' : ''}
                                    <span className={(this.state.busy ? 'show' : 'hidden')}><i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i></span>
                                </button>
                        <br/>
                        <br/>
                        <Link to="/session/login">Already registered ?</Link>
                        <br/>
                        <Link to="/session/signup">Not yet registered ?</Link>
                        <br/>
                        <br/>
                    </form>
                </div>
            </div>);
    }
}


Forgot.propTypes = {
    session: PropTypes.object,
    onForgot: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onForgot: () => dispatch(push('/session/login'))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Forgot));

