import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUsers, 
         applySort,
         moveToPage,
         updatePerPageCount,
         updateFilter } from '../../../actions/users';

import DemoTable from './table/demo-table';

class Users extends React.Component {

    
    constructor(props, context) {
        super(props, context);
        this.setupHeaders();
    }

    componentWillMount() {
        this.props.loadUsers();
    }
    setupHeaders() {
        this.headers = [{'label': '#',
                        'field': 'index',
                        'sortable': false,
                        'filterable': false
                        },
                        {'label': 'Name',
                        'field': 'name',
                        'sortable': true,
                        'filterable': true
                        },
                        {'label': 'Email',
                        'field': 'email',
                        'sortable': true,
                        'filterable': true
                        },
                        {'label': 'Type',
                        'field': 'role',
                        'sortable': true,
                        'filterable': true
                        },
                        {'label': 'Created At',
                        'field': 'created_at',
                        'sortable': true,
                        'filterable': false
                        },
                        {'label': 'Updated At',
                        'field': 'updated_at',
                        'sortable': true,
                        'filterable': false
                        },
                        
        ];
    }

    onReportSort(field) {
        this.props.applySort(field);
    }

    onReportFilter(filter) {
        this.props.updateFilter(filter);
    }

    onReportPageChange(page) {
        this.props.moveToPage(page);
    }

    onReportPerPageCountChange(count) {
        this.props.updatePerPageCount(count);
    }

    onReportClick(id) {
        console.log('open');
    }

    render() {
        return (<div>
            <div className="container">
                <h1>List of users</h1>
                <DemoTable
                    headers = {this.headers}
                    data = {this.props.users.displayables}
                    sort = {this.props.users.sorting}
                    filter = {this.props.users.filter}
                    busy = {this.props.users.busy}
                    showPerPage = {this.props.users.displayPerPage}
                    currentPage = {this.props.users.page}
                    onReportSort = {(s)=> this.onReportSort(s)} 
                    onReportFilter = {(f)=> this.onReportFilter(f)} 
                    onReportPageChange = {(p)=> this.onReportPageChange(p)}
                    onReportShowPerPageChange = {(c) => this.onReportPerPageCountChange(c)}
                    onReportClick = {(e)=> this.onReportClick(e)} />
            </div>
        </div>);
    }
}

Users.propTypes = {
    loadUsers: PropTypes.func.isRequired,
    applySort: PropTypes.func.isRequired,
    updatePerPageCount: PropTypes.func.isRequired,
    moveToPage: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
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
        applySort: (field) => {dispatch(applySort(field));},
        moveToPage: (page) => {dispatch(moveToPage(page));},
        updatePerPageCount: (count) => {dispatch(updatePerPageCount(count));},
        updateFilter: (filter) => {dispatch(updateFilter(filter));}
    };
};

export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Users));

