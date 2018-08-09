import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {DemoService}  from '../../services/demo';
import {push} from 'react-router-redux';

class Password extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: 'unknown email',
            pin: '',
            token: '',
            busy: false,
            error: ''
        };
    }

    /**
    */
    componentWillMount() {
        try{
            const { query } = this.props.location;
            let pin = '';
            let email = '';
            let token = '';
            if(query.hasOwnProperty('pin')) pin = query.pin;
            if(query.hasOwnProperty('email')) email = query.email;
            if(query.hasOwnProperty('token')) token = query.token;
            this.setState({pin: pin, email: email, token: token});
        }catch(e) { console.error('Error in reading query ' + e); }
    }

    onClickReset(event) {
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
                    <h3>Reset password for {this.state.email}</h3>
                    <br/><br/><br/>
                    <form>
                        <div className="form-group">
                            <div className={'alert alert-danger ' + (this.state.error ? 'show' : 'hide')} role="alert">
                                {this.state.error}
                            </div>
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                   placeholder="your new password"
                                   className="form-control"
                                   id="password"
                                   onChange={this.onClickReset.bind(this)}
                                   value={this.state.password}/>
                        </div>
                        <br/>
                        <p>{this.state.busy}</p>
                        <button onClick={this.onClickReset.bind(this)}
                                disabled={!this.state.password || this.state.busy}
                                className="btn btn-lg btn-info">
                                    {!this.state.busy ? 'RESET' : ''}
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


Password.propTypes = {
    session: PropTypes.object,
    location: PropTypes.object.isRequired,
    onReset: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        session: state.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(push('/session/login'))
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Password));

