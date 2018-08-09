import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DemoService }  from '../../../services/demo';

import { loadUsers,
        updateUser,
        deleteUser } from '../../../actions/users';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {user: undefined, busy: false, error: ''};
    }
    componentWillMount() {
        const paths = this.props.location.pathname.split('/');
        const id = paths[paths.length - 1];
        this.setState({id: id});
        this.findUser(id);
    }

    componentWillReceiveProps(nextProps) {
        if(!this.state.user && nextProps.users.users.length) {
            const user = nextProps.users.users.find(e => e.id === this.state.id);
            this.setState({user: user});
        }
    }

    findUser(id) {
        let user = null;
        if(!this.state.user && this.props.users.users.length) {
            user = this.props.users.users.find(e => e.id === id);
            if(!user) {
                this.props.loadUsers();
            }else{
                this.setState({user: user});
            }
        }
        return user;
    }


    onChangeName(event) {
        const user = Object.assign({}, this.state.user);
        user.name = event.target.value;
        this.setState({'user': user, error: ''});
    }

    onClickUpdate(event) {
        if(this.busy) return;
        this.setState({busy: true});
        this.setState( {'error': ''});
        new DemoService().updateUser(this.state.user.id, this.state.user.name).then( response => {
            console.log('Update ' + JSON.stringify(response));
            this.setState({busy: false});
            this.props.updateUser(this.state.user.id, this.state.user.name);
            return true;
        }).catch(err =>{
            let error = 'Error in update';
            if(err && err.response && err.response.data && err.response.data.reason) {
                error = err.response.data.reason;
            }
            this.setState( {'error': error, busy: false});
        });   
    }

    onClickDelete(event) {
        if(this.busy) return;
        this.setState({busy: true});
        this.setState( {'error': ''});
        new DemoService().deleteUser(this.state.user.id).then( response => {
            console.log('Delete ' + JSON.stringify(response));
            this.setState({busy: false});
            this.props.deleteUser(this.state.user.id);
            return true;
        }).catch(err =>{
            let error = 'Error in delete';
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
                    <p>Edit the user information </p>
                    <div className={'alert alert-danger ' + (this.state.error ? 'show' : 'hide')} role="alert">
                        {this.state.error}
                    </div>
                    <p>Role:<b>{this.state.user ? this.state.user.role : 'loading'}</b></p>
                    <p>Email:<b>{this.state.user ? this.state.user.email : 'loading'}</b></p>

                    <div className="form-group">
                        <label htmlFor="email">Name:</label>
                        <input type="name"
                            placeholder="your name"
                            className="form-control"
                            id="name"
                            onChange={this.onChangeName.bind(this)}
                            value={this.state.user ? this.state.user.name : 'loading'}/>
                    </div>
                
                    <br/>
                    <p>{this.state.busy}</p>
                    <button onClick={this.onClickUpdate.bind(this)}
                        disabled={this.state.busy}
                        className="btn btn-lg btn-info">
                            {!this.state.busy ? 'UPDATE' : ''}
                            <span className={(this.state.busy ? 'show' : 'hidden')}><i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i></span>
                        </button>
                        &nbsp;
                    <button onClick={this.onClickDelete.bind(this)}
                        disabled={this.state.busy}
                        className="btn btn-lg btn-danger">
                            {!this.state.busy ? 'DELETE' : ''}
                            <span className={(this.state.busy ? 'show' : 'hidden')}><i className="fa fa-spinner fa-spin fa-fw" aria-hidden="true"></i></span>
                        </button>
                    <br/>
                    <br/>
                    
                </form>
            </div>
        </div>);
    }
    
}


User.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    loadUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => {dispatch(loadUsers());},
        updateUser: (id, name) => {dispatch(updateUser(id, name));},
        deleteUser: (id, name) => {dispatch(deleteUser(id));},
    };
};

export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(User));
