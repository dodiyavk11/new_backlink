import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { DataGrid } from '@mui/x-data-grid';



import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';

function Userall() {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [value, setValue] = React.useState('0');
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const handleTabChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };
    const location = useLocation(); // Get the current location object from React Router

    useEffect(() => {
        // This code will run whenever the component mounts
        // and whenever the URL changes
        setValue('0');
        // Get the current URL from the location object
        const currentUrl = location.pathname;

        // You can now do something with the current URL
        // console.log('Current URL:', currentUrl);
        if (currentUrl == '/settings/profile') {
            setValue('0');
        } else if (currentUrl == '/settings/account') {
            setValue('1');
        }
        else if (currentUrl == '/settings/notifications') {
            setValue('2');
        }

    }, [location]); // Include 'location' in the dependency array
    function DataTable() {

        const columns = [
          {
            field: 'name', sortable: false, headerName: 'NAME', width: 300,
            height:70,
            renderCell: (params) => (
              <div className='flex'>
                <IconButton aria-label="link">
                  <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:user</FuseSvgIcon>
                </IconButton>
                <div className='block'>
                  <Typography className='font-semibold'>
                    {params.row.name}
                  </Typography>
                </div>
              </div>
            )
          },
          {
            field: 'language', sortable: false, headerName: 'LANGUAGE', width: 200,
            renderCell: (params) => (
              <div className='flex'>
                <div className='block ml-10'>
                  <Typography className='font-semibold uppercase'>
                    {params.row.email}
                  </Typography>
                  
                </div>
    
    
    
              </div>
            )
          
          },
          { field: 'links', headerName: 'Links'  , width: 200,  renderCell: (params) => (
            <div className='flex'>
            
              <div className='block ml-5'>
                <Typography className='font-semibold uppercase'>
                  {params.row.links}
                </Typography>
                
              </div>
    
    
    
            </div>
          )},
          {
            field: 'orders',
            headerName: 'Orders',
              type: 'number',
               width: 200,
            
          
    
          },
          {
            field: 'project',
            headerName: 'Projects',
            type: 'number', width: 200,
            
          },
          {
            field: 'aciton',
            headerName: '',
           
            renderCell: (params) => (
              <div>
                {/* Add the edit icon with a click handler */}
                <IconButton aria-label="link" onClick={() => handleEditClick(params.row.id)} >
                  <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:pencil</FuseSvgIcon>
                </IconButton>
                {/* Add the delete icon with a click handler */}
                <IconButton aria-label="link" onClick={() => handleDeleteClick(params.row.id)} >
                  <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:trash</FuseSvgIcon>
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
          { id: 1, name: 'John Doe', email: 'demo@gmail.com', links: 'link2.com', project: 565, orders: 89 },
          { id: 2, name: 'John Doe', email: 'demo@gmail.com', links: 'aink1.com', project: 565, orders: 89 },
          { id: 3, name: 'John Doe', email: 'demo@gmail.com', links: 'bink4.com', project: 565, orders: 89 },
          { id: 4, name: 'John Doe', email: 'demo@gmail.com', links: 'cink6.com', project: 565, orders: 89 },
          { id: 5, name: 'John Doe', email: 'demo@gmail.com', links: 'dink7.com', project: 565, orders: 89 },
          { id: 6, name: 'John Doe', email: 'demo@gmail.com', links: 'sink8.com', project: 565, orders: 89 },
          { id: 7, name: 'John Doe', email: 'demo@gmail.com', links: 'fink9.com', project: 565, orders: 89 },
          { id: 8, name: 'John Doe', email: 'demo@gmail.com', links: 'gink10.com', project: 565, orders: 89 },
          { id: 9, name: 'John Doe', email: 'demo@gmail.com', links: 'vink11.com', project: 565, orders: 89 },
        ];
        return (
          <div style={{ width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              className='order-table'
              disableColumnMenu
              pageSizeOptions={[5, 10]}
    
    
            />
          </div>
        );
      }

    return (
        <>
            < motion.div initial={{ x: -30 }}
                animate={{ x: 0, transition: { delay: 0.2 } }}
                delay={300} className='w-full max-w-[calc(1240px+2.5rem)] mt-32 px-10 pt-32 mx-auto'>
                <h1 className='text-3xl font-bold text-[#354252] tracking-tight leading-8'>All Users</h1>
            </motion.div>
            <motion.div initial={{ y: -30 }}
                animate={{ y: 0, transition: { delay: 0.2 } }}
                delay={300} className="w-full max-w-[calc(1240px+2.5rem)] mb-[10%] px-10 pt-14 mx-auto" >


                <div className="grid grid-cols-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
                    <div className="col-span-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
                        <Paper className="flex flex-col bg-white shadow-sm mt-6 rounded-lg overflow-visible">
                            <div className=" p-28 items-center justify-between space-x-4 divide-x">
                               <DataTable/>
                            </div>



                        </Paper>
                    </div>


                </div>




            </motion.div>

        </>
    );
}

export default Userall;

