import PropTypes from 'prop-types';
import React from 'react';

const EntryTr = ({ headers, data, onReportClick}) =>{
    return (<tr onClick={()=>onReportClick(data.id)} key={data.id}>
                { headers.map( ( h, index) =>{
                    return (<td key={data.id + '-' + h.field}>{data[h.field]}</td>);
                })}   
            </tr>);
};

EntryTr.propTypes = {
    data: PropTypes.object,
    onReportClick: PropTypes.func,
    headers: PropTypes.array
};

export default EntryTr;
