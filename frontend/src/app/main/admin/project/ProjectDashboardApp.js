import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alpha,styled } from '@mui/material/styles';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import reducer from './store';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import "./style.css";
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import { motion } from 'framer-motion';

import {
  DataGrid
} from '@mui/x-data-grid';
const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {

  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(6),
    paddingBottom: 0,

  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(6),
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderRadius:'10px',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
function ProjectDashboardApp(props) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function DataTable() {

    const columns = [
      {
        field: 'name', sortable: false, headerName: 'NAME', width: 345,
        height:70,
        renderCell: (params) => (
          <div className='flex'>
            <IconButton aria-label="link">
              <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:lock-closed</FuseSvgIcon>
            </IconButton>
            <div className='block'>
              <Typography className='font-semibold'>
                {params.row.name}
              </Typography>
              <Typography className='font-light text-sm'> sdfsdfsdfsdfsdfsdfsdf</Typography>
            </div>



          </div>
        )
      },
      {
        field: 'language', sortable: false, headerName: 'LANGUAGE', width: 130,
        renderCell: (params) => (
          <div className='flex'>
            <img src='assets/images/flags/US.svg'/>
            <div className='block ml-10'>
              <Typography className='font-semibold uppercase'>
                {params.row.language}
              </Typography>
              
            </div>



          </div>
        )
      
      },
      { field: 'rating', headerName: 'RATING', width: 130 ,  renderCell: (params) => (
        <div className='flex'>
         <FuseSvgIcon className='text-yellow-700' style={{ transform: 'scale(0.6)' }}>heroicons-solid:star</FuseSvgIcon>
          <div className='block ml-5'>
            <Typography className='font-semibold uppercase'>
              {params.row.rating}
            </Typography>
            
          </div>



        </div>
      )},
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
          className='contentlinks-table1'
          disableColumnMenu
          pageSizeOptions={[5, 10]}


        />
      </div>
    );
  }

  return (<>
    <ProjectDashboardAppHeader />
    <motion.div initial={{ y: -30 }}
      animate={{ y: 0, transition: { delay: 0.2 } }}
      delay={300} className="w-full  min-h-[calc(100vh-84px)] max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto">
      <Paper className="relative   rounded-2xl shadow overflow-hidden">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex justify-between">
              <TabList onChange={handleChange} className='  p-24 pr-12 pb-0' aria-label="lab API tabs example">

                <Tab label="Archived Projects" className='inline-table min-h-fit p-[20px]' icon={<span className='selectedlength float-right ml-6' >0</span>} value="1" />
                <Tab label="Archived Projects" className='inline-table min-h-fit p-[20px]' value="2" icon={<span className='selectedlength ml-6 float-right' >2</span>} />
              </TabList>
              <Button
                className="whitespace-nowrap  my-auto mr-[36px] mt-[36px] bg-secondary"
                variant="text"
                onClick={handleClickOpen}
                style={{ color: "black" }}
                startIcon={<FuseSvgIcon size={20}>heroicons-outline:plus
                </FuseSvgIcon>}
              >
                Create Project
              </Button>
            </Box>
            <TabPanel value="1" className='p-[0px]'>
            <DataTable/>
              <div className='flex justify-center items-center flex-col h-full w-full'>
               
              </div></TabPanel>
            <TabPanel value="2" className='p-[22px]'><div className='flex'>
              <Box
                sx={{
                  width: 362,
                  height: 341,

                }}
                className="border rounded p-12 mr-24"
              >
                <div class="rounded-lg overflow-hidden"><img src="https://app.backlinked.com/storage/projects/NOZGRVGJ.jpg" /></div>
                <div className='p-12 pt-24 w-full'>
                  <h3>xyz.com</h3>
                  <div className='flex justify-between items-center text-sm whitespace-nowrap mb-4'>
                    <span class="mr-2">0 Recommendations</span>
                    <span class="mr-2"><FuseSvgIcon style={{ transform: 'scale(0.4)' }}>material-solid:circle</FuseSvgIcon></span>
                    <span class="mr-2">0 Orders</span>
                    <span class=" mr-2"><FuseSvgIcon style={{ transform: 'scale(0.4)' }}>material-solid:circle</FuseSvgIcon></span>
                    <span>1 week ago</span>
                  </div>
                </div>
                <Divider />
                <div className='text-sm mt-12'>
                  <span className='text-orange-600'>$0.00</span>
                  <span>/$12.00</span>
                </div>
              </Box>
              <Box
                sx={{
                  width: 362,
                  height: 341,

                }}
                className="border rounded p-12 mr-24"
              >
                <div class="rounded-lg overflow-hidden"><img src="https://app.backlinked.com/storage/projects/YLMYQDYJ.jpg" /></div>
                <div className='p-12 pt-24 w-full'>
                  <h3>xyz.com</h3>
                  <div className='flex justify-between items-center text-sm whitespace-nowrap mb-4'>
                    <span class="mr-2">0 Recommendations</span>
                    <span class="mr-2"><FuseSvgIcon style={{ transform: 'scale(0.4)' }}>material-solid:circle</FuseSvgIcon></span>
                    <span class="mr-2">0 Orders</span>
                    <span class=" mr-2"><FuseSvgIcon style={{ transform: 'scale(0.4)' }}>material-solid:circle</FuseSvgIcon></span>
                    <span>1 week ago</span>
                  </div>
                </div>
                <Divider />
                <div className='text-sm mt-12'>
                  <span className='text-orange-600'>$0.00</span>
                  <span>/$260.00</span>
                </div>
              </Box>
            </div></TabPanel>

          </TabContext>
        </Box>
      </Paper>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='p-[27px]'
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>

        </BootstrapDialogTitle>
        <DialogContent className='p-[27px]' >
          <div className=''>
            <h2 className='font-bold text-3xl '>Create project</h2>
            <Typography> Create a new project, organize your bookings and always keep an eye on your budget.

            </Typography>
          </div>
          <div className='mt-20'>
            <Typography className='text-sm'>Domain</Typography>
            <FormControl variant="standard" className='w-full  mt-5'>
              <InputLabel shrink style={{ fontSize: '17px' }} htmlFor="bootstrap-input">
                For which domain is the project?
              </InputLabel>
              <BootstrapInput placeholder='fairlinked.com' id="bootstrap-input" />
            </FormControl>
            <Typography className='text-sm mt-10'>Budget</Typography>
            <FormControl variant="standard" className='w-full  mt-5'>
              <InputLabel shrink style={{ fontSize: '17px ' }} htmlFor="bootstrap-input">
                What is the monthly budget for this project?
              </InputLabel>
              <BootstrapInput placeholder='459.00' id="bootstrap-input" />
            </FormControl>

          </div>

        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus className='w-full' style={{ color: 'white' }} color='secondary' onClick={handleClose}>
            Create project
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ motion.div>
  </>
    
   
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};  