import PropTypes from 'prop-types';
import React from 'react';
import EntryTh from './entry-th';
import EntryTr from './entry-tr';
import Paginator from './paginator';
import Filter from './filter';

const DemoTable = ({ headers, 
                    data, 
                    sort, 
                    filter, 
                    busy,
                    showPerPage,
                    currentPage,
                    onReportSort,
                    onReportFilter, 
                    onReportPageChange,
                    onReportShowPerPageChange, 
                    onReportClick}) =>{
    return (
        
            <div className="table-responsive">
                <Filter filterables={headers} 
                        filter={filter}
                        onReportFilter={onReportFilter}/>
                <br/>
                <table className="table table-bordered">
                        <thead>
                            <tr>
                                { headers.map( ( e, index) =>{
                                    return (<EntryTh header={e} 
                                                sort={sort}
                                                onReportSort={onReportSort}/>);
                                })}     
                            </tr>
                        </thead>
                        <tbody>
                            { data.slice( ((currentPage - 1) * showPerPage),
                                           (currentPage * showPerPage)).map(
                                (e, index) =>{
                                    e.index = index + 1;
                                    return (<EntryTr headers={headers} data={e} onReportClick={onReportClick}/>);
                                })}     
                        </tbody>
                    </table>
                    <Paginator total={data.length} 
                               perPage={showPerPage} 
                               currentPage={currentPage} 
                               onMovePage={onReportPageChange}
                               onChangePerPage={onReportShowPerPageChange}/>

                </div>);
};

DemoTable.propTypes = {
    busy: PropTypes.bool.isRequired,
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    sort: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    showPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onReportSort: PropTypes.func,
    onReportFilter: PropTypes.func,
    onReportPageChange: PropTypes.func,
    onReportShowPerPageChange: PropTypes.func,
    onReportClick: PropTypes.func
};

export default DemoTable;
