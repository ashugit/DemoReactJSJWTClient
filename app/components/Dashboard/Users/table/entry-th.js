import PropTypes from 'prop-types';
import React from 'react';

const EntryTh = ({ header, sort, onReportSort}) =>{
    let th = null;
    if(header.sortable) {
        th = (<th onClick={()=>onReportSort(header.field)} key={'field-' + header.field}>                
                <span>{header.label}</span>
                { (()=>{
                    let arrow = null;
                    if (sort.sortOn === header.field) {
                        if (sort.sortDirection === 'd') {
                            arrow = (<i className="fa fa-arrow-up" aria-hidden="true"></i>);
                        } else {
                            arrow = (<i className="fa fa-arrow-down" aria-hidden="true"></i>);
                        } 
                    }
                    return arrow;
                })()}
            </th>);
    } else {
        th = (<th key={'field-' + header.field}>
                <span>{header.label}</span>
            </th>);
    }  
    return th;
};
/**
 * header
 *   label
 *   field
 *   sortable
 */
EntryTh.propTypes = {
    header: PropTypes.object,
    onReportSort: PropTypes.func,
    sort: PropTypes.object
};

export default EntryTh;
