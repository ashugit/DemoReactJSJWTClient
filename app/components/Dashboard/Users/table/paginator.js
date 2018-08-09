import PropTypes from 'prop-types';
import React from 'react';
import Dater from './dater';
const Paginator = ({ total, perPage, currentPage, onMovePage, onChangePerPage }) =>{
    const maxPage = Math.floor(total / perPage) +  ( (total / perPage) ? 1 : 0);
    
    const onTextChangeJumpToPage = (event)=>{
        onMovePage(event.target.value);
    };

    return (<div>
                <p>Current page: &nbsp;<b>{currentPage}</b></p>
                <div className="btn-group btn-group-justified" style={{width: '50%'}}>
                    <a onClick={()=>onMovePage(1)} className="btn btn-default btn-sm">First</a>
                    <a onClick={()=>onMovePage(currentPage - 1)} className="btn btn-default  btn-sm">Prev</a>
                    <a onClick={()=>onMovePage(currentPage + 1)} className="btn btn-default  btn-sm">Next</a>
                    <a onClick={()=>onMovePage(maxPage)}  className="btn btn-default  btn-sm">Last</a>    
                </div>
                <br/>
                
                    Per Page:
                    <div className="btn-group btn-group-justified" style={{width: '50%'}}>
                        <a onClick={()=>onChangePerPage(5)} className="btn btn-default btn-sm">5</a>
                        <a onClick={()=>onChangePerPage(10)} className="btn btn-default  btn-sm">10</a>
                        <a onClick={()=>onChangePerPage(25)} className="btn btn-default  btn-sm">25</a>
                        <a onClick={()=>onChangePerPage(50)}  className="btn btn-default  btn-sm">50</a>    
                        <a onClick={()=>onChangePerPage(100)}  className="btn btn-default  btn-sm">100</a>    
                    </div>
                
                <br/>
                <p>
                    Move to Page:
                    &nbsp;
                    <input type="number"
                            placeholder="Enter page number"
                            id="currentpage"
                            onChange={onTextChangeJumpToPage.bind(this)}/>
                </p>
                
            </div>);
};

Paginator.propTypes = {
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onMovePage: PropTypes.func.isRequired,
    onChangePerPage: PropTypes.func.isRequired
};

export default Paginator;
