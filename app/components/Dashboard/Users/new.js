import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DemoService }  from '../../../services/demo';

import { createdUser} from '../../../actions/users';

class New extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {email: '',
                      name: '',
                      busy: false, 
                      error: ''};
    }

    onChangeName(event) {
        this.setState({'name': event.target.value, error: ''});
    }

    onChangeEmail(event) {
        this.setState({'email': event.target.value, error: ''});
    }

    onClickCreate(event) {
        if(this.busy) return;
        this.setState({busy: true});
        this.setState( {'error': ''});
        new DemoService().createUser(this.state.email, this.state.name).then( response => {
            console.log('Update ' + JSON.stringify(response));
            this.setState({busy: false});
            this.props.createdUser( {name: response.data.name,
                                    email: response.data.email,
                                    role: response.data.role});
            return true;
        }).catch(err =>{
            let error = 'Error in create';
            if(err && err.response && err.response.data && err.response.data.reason) {
                error = err.response.data.reason;
            }
            this.setState( {'error': error, busy: false});
        });   
    }

    render() {
        return(
            <div className="row">
            <div className="col-sm-offset-3 col-sm-6">
                <form>
                    <p>Create a new user:</p>
                    <div className={'alert alert-danger ' + (this.state.error ? 'show' : 'hide')} role="alert">
                        {this.state.error}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email"
                            placeholder="your email"
                            className="form-control"
                            id="email"
                            onChange={this.onChangeEmail.bind(this)}
                            value={this.state.email}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="name"
                            placeholder="your name"
                            className="form-control"
                            id="name"
                            onChange={this.onChangeName.bind(this)}
                            value={this.state.name}/>
                    </div>
                
                    <br/>
                    <p>{this.state.busy}</p>
                    <button onClick={this.onClickCreate.bind(this)}
                        disabled={this.state.busy}
                        className="btn btn-lg btn-info">
                            {!this.state.busy ? 'CREATE' : ''}
                            <span className={(this.state.busy ? 'show' : 'hidden')}><i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i></span>
                        </button>
                        &nbsp;

                    <br/>
                    <br/>
                    
                </form>
            </div>
        </div>);
    }
    
}


New.propTypes = {
    createdUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        createdUser: (user) => {dispatch(createdUser(user));}
    };
};

export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(New));
