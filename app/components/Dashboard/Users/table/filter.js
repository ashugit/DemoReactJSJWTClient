import PropTypes from 'prop-types';
import React from 'react';

const Filter = ({ filterables, filter}) =>{
    return (
        
        <div className="form-group">
            <label htmlFor="fieldSelect"> Select list: </label>
            <select className="form-control" id="fieldSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select>
        </div>
    )
}


Filter.propTypes = {
    filterables: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    onReportFilter: PropTypes.func.isRequired
};

export default Filter;
