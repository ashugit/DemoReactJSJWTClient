import PropTypes from 'prop-types';
import React from 'react';

class Filter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filterString: this.props.filter.filterString,
            filterOn: this.props.filter.filterOn
        };
    }
    
    onTextChangeFilterValue(event) {
        this.setState({filterString: event.target.value});
    }

    onChangeFilter(event) {
        this.setState({filterOn: event.target.value});
    }

    onApplyFilter() {
        this.props.onReportFilter({
            filterString: this.state.filterString,
            filterOn: this.state.filterOn});
    }

    onClearFilter() {
        // Fix the clearing of selection
        this.setState({filterOn: '', filterString: ''});
        this.props.onReportFilter({filterString: '', filterOn: ''});
    }
    render() {
        return (
        
            <div className="form-group">
                <label htmlFor="fieldSelect"> Select Field: </label>

                <select className="form-control" style={{width: '50%'}}
                    id="fieldSelect" 
                    onChange={this.onChangeFilter.bind(this)}>
                    value={this.state.filterOn}
                    <option value={''}>Select Filter</option>
                    { this.props.filterables
                        .filter(e => e.filterable)
                        .map( ( e, index) =>{
                            return (<option value={e.field} key={'filter-' + e.field}>{e.label}</option>);
                        })}     
                </select>
                <br/>
                <label htmlFor="fieldVal"> Enter Filter Value: </label>
                &nbsp;
                <input type="text"
                placeholder="Enter filter value"
                    id="fieldVal"
                    value={this.state.filterString}
                    onChange={this.onTextChangeFilterValue.bind(this)}/>
                <br/>
                <br/>
                <div className="btn-group btn-group-justified" style={{width: '30%'}}>
                    <a onClick={this.onApplyFilter.bind(this)} className="btn btn-default btn-sm">Apply Filter</a>
                    <a onClick={this.onClearFilter.bind(this)} className="btn btn-default  btn-sm">Clear Filter</a>  
                </div>

            </div>
        );
    }
}

Filter.propTypes = {
    filterables: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    onReportFilter: PropTypes.func.isRequired
};

export default Filter;
