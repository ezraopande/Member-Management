import React from 'react';
import DataTable from 'react-data-table-component';
import Spinner from './Spinner';

const Table = ({ columns, data, loading, error }) => {
    if (loading) {
        return <Spinner />;
    }

    if (error) { 
        return <p className="text-red-500">{error}</p>;
    }

    return (
        
        <div className="overflow-x-auto">
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
                persistTableHead
                responsive
            />
        </div>
    );
};

export default Table;
