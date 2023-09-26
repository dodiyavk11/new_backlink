import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';
//   import { useDemoData } from '@mui/x-data-grid-generator';

 

const columns = [
    {
        field: 'name', sortable: false, headerName: 'NAME', width: 345,
        renderCell: (params) => (
            <div className='flex'>
                <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:lock-closed</FuseSvgIcon>
                        </IconButton>
                <div className='block'>
                <Typography>
                {params.row.name}
                    </Typography>
                    <Typography> sdfsdfsdfsdfsdfsdfsdf</Typography>
                </div>
              
               

            </div>
        )
    },
    { field: 'language', sortable: false, headerName: 'LANGUAGE', width: 130 },
    { field: 'rating', headerName: 'RATING', width: 130 },
    {
        field: 'dr',
        headerName: 'DR',
        type: 'number',
        width: 90,

    },
    {
        field: 'da',
        headerName: 'DA',
        type: 'number',
        width: 90,
    },
    {
        field: 'traffic',
        headerName: 'TRAFFIC',
        type: 'number',
        width: 90,
    },
    {
        field: 'price',
        headerName: 'PRICE',
        type: 'number',
        width: 160,
    },
    {
        field: 'aciton',
        headerName: '',
        width: 160,
        renderCell: (params) => (
            <div>
                {/* Add the edit icon with a click handler */}
                <IconButton aria-label="link" onClick={() => handleEditClick(params.row.id)} >
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:shopping-bag</FuseSvgIcon>
                        </IconButton>
                {/* Add the delete icon with a click handler */}
                <IconButton aria-label="link" onClick={() => handleDeleteClick(params.row.id)} >
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:heart</FuseSvgIcon>
                        </IconButton>
               
            </div>
        ),

    },
];
const handleEditClick = (id) => {
    // Handle edit action here
    console.log(`Edit clicked for row with ID: ${id}`);
};

const handleDeleteClick = (id) => {
    // Handle delete action here
    console.log(`Delete clicked for row with ID: ${id}`);
};

const rows = [
    { id: 1, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 2, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 3, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 4, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 5, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 6, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 7, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 8, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
    { id: 9, name: '****.net', language: 'en', rating: 3.5, dr: 65, da: 89, traffic: 89565, price: '$2323' },
];
function CustomToolbar() {
    return (
    
        <GridToolbarColumnsButton />
   
    );
  }
function DataTable() {
    return (
        <div style={{ height: 420, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                disableColumnMenu
                pageSizeOptions={[5, 10]}
                slots={{
                    toolbar: CustomToolbar,
                  }}

            />
        </div>
    );
}

export default DataTable;