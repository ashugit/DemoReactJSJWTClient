import PropTypes from 'prop-types';
import React from 'react';

const Filter = ({ filterables, filter, onReportFilter}) =>{
    let filterString = filter.filterString;
    let filterOn = filter.filterOn;
   

    const onTextChangeFilterValue = (event) => {
        filterString = event.target.value;
    };

    const onChangeFilter = (event) => {
        filterOn = event.target.value;
    };

    const onApplyFilter = () => {
        onReportFilter({filterString, filterOn});
    };

    const onClearFilter = () => {
        filterOn = '';
        filterString = '';
        onReportFilter({filterString, filterOn});
    };

    return (
        
        <div className="form-group">
            <label htmlFor="fieldSelect"> Select Field: </label>

            <select className="form-control" style={{width: '50%'}}
                id="fieldSelect" 
                onChange={onChangeFilter}>
                value={filter.filterOn}
                <option value={''}>Select Filter</option>
                { filterables
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
                onChange={onTextChangeFilterValue}/>
            <br/>
            <br/>
            <div className="btn-group btn-group-justified" style={{width: '30%'}}>
                <a onClick={onApplyFilter} className="btn btn-default btn-sm">Apply Filter</a>
                <a onClick={onClearFilter} className="btn btn-default  btn-sm">Clear Filter</a>  
            </div>

        </div>
    );
};

Filter.propTypes = {
    filterables: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    onReportFilter: PropTypes.func.isRequired
};

export default Filter;
