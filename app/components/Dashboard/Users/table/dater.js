import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
const Dater = ({ ts }) =>{
    return (<span>
                {(()=>{
                    if(!ts || ts === 0 ) return '';
                    return moment(ts).format('HH:mm:ss DD/MM/YY');
                })()}
            </span>);
};

Dater.propTypes = {
    ts: PropTypes.number
};

export default Dater;
