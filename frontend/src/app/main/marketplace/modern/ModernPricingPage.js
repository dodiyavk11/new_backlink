import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import ModernPricingCard from './ModernPricingCard';
import ModernPricingFeatureItem from './ModernPricingFeatureItem';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import OutlinedInput from '@mui/material/OutlinedInput';



import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import Badge from '@mui/material/Badge';
import "./style.css";
import IconButton from '@mui/material/IconButton';

function ModernPricingPage() {
  const [period, setPeriod] = useState('month');
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#ff9756',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  function Customizepop() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const IOSSwitch = styled((props) => (
      <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    }));
    return (
      <div className=' my-auto'>
        <Button aria-describedby={id} variant="outlined" className='whitespace-nowrap' onClick={handleClick}>
          <FuseSvgIcon style={{ transform: 'rotate(90deg) scale(0.7)' }}>heroicons-outline:adjustments</FuseSvgIcon>Customize table
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className=''
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}

        >
          <div className='max-w-[300px] w-[300px]'>
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Language"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Rating"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Ahrefs Domain Rating"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Moz Domain Authority"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Sistrix Visibility Index"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Majestic Trustflow "
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Ahrefs Referring Domains"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 px-10 py-4'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Traffic"
            />

          </div>


        </Popover>
      </div>
    );
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },

  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (<>
    < motion.div initial={{ x: -30 }}
      animate={{ x: 0, transition: { delay: 0.2 } }}
      delay={300} className='w-full max-w-[calc(1240px+2.5rem)] mt-32 px-10 pt-32 mx-auto'>
      <h1 className='text-3xl font-bold text-[#354252] tracking-tight leading-8'>Contentlinks</h1>
    </motion.div>
    <motion.div initial={{ y: -30 }}
      animate={{ y: 0, transition: { delay: 0.2 } }}
      delay={300} className="w-full  min-h-[calc(100vh-84px)] max-h-auto max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto">
      <Paper className="relative   rounded-2xl shadow overflow-hidden">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex p-20 pb-0 overflow-x-auto justify-between">
              <TabList onChange={handleChange} className='  ' aria-label="lab API tabs example">

                <Tab label="Marketplace" className='inline-table min-h-fit p-[20px]' value="1" />
                <Tab label="Daily Deals" className='inline-table min-h-fit p-[20px]' value="2" icon={<span className='selectedlength ml-6 float-right' >5</span>} />
              </TabList>
              <div className={`flex ${value == 2 ? 'disabled-div' : ''}`} >
                <Typography className='flex my-auto pt-6  '><FuseSvgIcon style={{ transform: 'scale(0.7)', color: '#ff9756' }}>heroicons-outline:lock-closed</FuseSvgIcon> Domain reveals: 20/20</Typography>
                <div className='flex'>
                  <Typography className='flex my-auto ml-14 mr-10 pt-6  '><FuseSvgIcon style={{ transform: 'scale(0.7)', }}>heroicons-outline:badge-check</FuseSvgIcon> Quality filter  </Typography>
                  <FormControlLabel dir="rtl" className='justify-between flex '
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} />
                </div>
                <Customizepop className='ml-14 my-auto  '
                />

              </div>

            </Box>
            <TabPanel value="1" className='p-[0px]'>
              <div className='flex justify-between overflow-x-auto	' >
                <div className='float-left flex'>
                  <Paper
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    style={{ height: '40px' }}
                    className="flex items-center w-full my-auto sm:max-w-128 min-w-128 ml-14  px-8 rounded-full border-1 shadow-0"
                  >
                    <FuseSvgIcon style={{ transform: 'scale(0.6)' }} color="disabled">feather:search</FuseSvgIcon>

                    <Input
                      placeholder="Search"
                      className="flex flex-1 p-0 text-sm"
                      disableUnderline
                      fullWidth


                      // value={searchText}
                      inputProps={{
                        'aria-label': 'Search',
                      }}
                    // onChange={(ev) => dispatch(setProductsSearchText(ev))}
                    />
                  </Paper>
                  <SelectCat />
                  <SelectLang />
                  <SelectTld />
                 
                </div>
                <div className='float-right flex mr-14'>
                  <Morefilter />
                  <IconButton aria-label="link" className=' mx-10 my-auto' style={{border: '1px solid #dbdada',
    padding: '3px'}}  >
                    <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:eye</FuseSvgIcon>
                  </IconButton>
                  <IconButton aria-label="link" className=' mx-10 my-auto' style={{border: '1px solid #dbdada',
    padding: '3px'}}  >
                    <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:heart</FuseSvgIcon>
                  </IconButton>
                  <IconButton aria-label="link" className=' mx-10 my-auto' style={{border: '1px solid #dbdada',
    padding: '3px'}}  >
                    <FuseSvgIcon style={{ transform: 'scale(0.7)',color:'red' }}>feather:trash</FuseSvgIcon>
                  </IconButton>
                 
                </div>

              </div>
              <div style={{
                height: '100%', width: '100%'
              }}>
                <DataTable />
              </div>

            </TabPanel>
            <TabPanel value="2" className='p-[0px]'><div className='flex'>
              <div className="table-responsive " id="dailytable">
                <Table className="simple w-full min-w-full">
                  <TableHead>
                    <TableRow>

                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        > Name </Typography>
                      </TableCell>


                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        > RATING </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        > DR </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        > DA </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        > TF </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        > Price </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-12 whitespace-nowrap"
                        >  </Typography>
                      </TableCell>


                    </TableRow>



                  </TableHead>

                  <TableBody >

                    <TableRow >

                      <TableCell component="th" className='flex' scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:external-link</FuseSvgIcon>
                        </IconButton>
                        <div className='block ml-10'>
                          <Typography className="text-[#354252] font-bold font-bold " >
                            xyz.com
                          </Typography>
                          <Typography className=" " >
                            Electronics & Computers, Internet & SEO, Telecommunications
                          </Typography>
                        </div>

                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="flex" color="text.secondary">
                          <FuseSvgIcon className='text-yellow-700' style={{ transform: 'scale(0.6)' }}>heroicons-solid:star</FuseSvgIcon>
                          5.00
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          70
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          43
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          45
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="font-bold" >
                          $387.60
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                        </Typography>
                        <Typography className="text-sm line-through" >
                          $456.60

                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>material-outline:shopping_bag</FuseSvgIcon>
                        </IconButton>
                      </TableCell>


                    </TableRow>
                    <TableRow >
                      <TableCell component="th" className='flex' scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:external-link</FuseSvgIcon>
                        </IconButton>
                        <div className='block ml-10'>
                          <Typography className="text-[#354252] font-bold font-bold " >
                            tegernseerstimme.de
                          </Typography>
                          <Typography className=" " >
                            News & Media, Local & Regional, Casino & Sports Betting
                          </Typography>
                        </div>

                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="flex" color="text.secondary">
                          <FuseSvgIcon className='text-yellow-700' style={{ transform: 'scale(0.6)' }}>heroicons-solid:star</FuseSvgIcon>
                          5.00
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          56
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          47
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          22
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="font-bold" >
                          $498.60
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                        </Typography>
                        <Typography className="text-sm line-through" >
                          $588.60

                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>material-outline:shopping_bag</FuseSvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" className='flex' scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:external-link</FuseSvgIcon>
                        </IconButton>
                        <div className='block ml-10'>
                          <Typography className="text-[#354252] font-bold font-bold " >
                            bauen-und-heimwerken.de
                          </Typography>
                          <Typography className=" " >
                            Free time & hobbies, Machines & Technology, Home & Garden
                          </Typography>
                        </div>

                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="flex" color="text.secondary">
                          <FuseSvgIcon className='text-yellow-700' style={{ transform: 'scale(0.6)' }}>heroicons-solid:star</FuseSvgIcon>
                          4.167
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          39
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          31
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          42
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="font-bold" >
                          $456.60
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                        </Typography>
                        <Typography className="text-sm line-through" >
                          $588.60

                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>material-outline:shopping_bag</FuseSvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" className='flex' scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:external-link</FuseSvgIcon>
                        </IconButton>
                        <div className='block ml-10'>
                          <Typography className="text-[#354252] font-bold font-bold " >
                            diewirtschaft-koeln.de
                          </Typography>
                          <Typography className=" " >
                            Finances & Insurances, Business & Marketing, Job & Career
                          </Typography>
                        </div>

                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="flex" color="text.secondary">
                          <FuseSvgIcon className='text-yellow-700' style={{ transform: 'scale(0.6)' }}>heroicons-solid:star</FuseSvgIcon>
                          N/A
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          70
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          43
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          45
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="font-bold" >
                          $123.60
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                        </Typography>
                        <Typography className="text-sm line-through" >
                          $232.60

                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>material-outline:shopping_bag</FuseSvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" className='flex' scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>heroicons-outline:external-link</FuseSvgIcon>
                        </IconButton>
                        <div className='block ml-10'>
                          <Typography className="text-[#354252] font-bold font-bold " >
                            cannabis-germany.info
                          </Typography>
                          <Typography className=" " >
                            Nutrition, Health & Recreation, Society
                          </Typography>
                        </div>

                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="flex" color="text.secondary">
                          <FuseSvgIcon className='text-yellow-700' style={{ transform: 'scale(0.6)' }}>heroicons-solid:star</FuseSvgIcon>
                          N/A
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          70
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          43
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="" color="text.secondary">
                          45
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className="font-bold" >
                          $561.60
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                        </Typography>
                        <Typography className="text-sm line-through" >
                          $684.60

                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <IconButton aria-label="link">
                          <FuseSvgIcon style={{ transform: 'scale' }}>material-outline:shopping_bag</FuseSvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>


                </Table>

              </div>
            </div></TabPanel>

          </TabContext>
        </Box>
      </Paper>

    </ motion.div>
  </>

  );
}

export default ModernPricingPage;




function SelectCat() {
  const names = [
    'Tourism & Travel',
    'Electronics & Computers',
    'Internet & SEO',
    'Telecommunications',
    'Finances & Insurances',
    'Politics & Economy',
  ];
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },

  };
  const [personName, setPersonName] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  const handleTrashClick = () => {
    // Clear all selected values by setting personName to an empty array
    setPersonName([]);
    setSearchInput('');
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const filteredOptions = names.filter((name) =>
    name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (

    <FormControl sx={{ m: 1, minWidth: 120 }} className='status_search rounded-full' size="small" style={{ maxWidth: '184px' }}>
      <Select
        className='rounded-full'
        multiple
        value={personName}
        displayEmpty
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          const filteredSelected = selected.filter((value) => value !== undefined);
          // console.log(filteredSelected);
          if (filteredSelected.length === 0) {
            return <p className='mt-2' >Categories</p>;
          }
          return (
            <p className='mt-2 text-ellipsis overflow-hidden selectedvalues'><span className='selectedlength' >{`${filteredSelected.length}`}</span><span className=''>{`${filteredSelected.join(', ')}`}</span></p>
          );
        }}

        MenuProps={{
          ...MenuProps, // Spread the existing properties
          id: 'status-select', // Add your custom id
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >

        <div className='flex p-10'>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <FuseSvgIcon style={{ transform: 'scale(0.6)' }} color="disabled">feather:search</FuseSvgIcon>

            <Input
              placeholder="Search"
              className="flex flex-1 text-sm"
              disableUnderline
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              inputProps={{
                'aria-label': 'Search',
              }}
            // onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
          <Paper className='ms-5 p-8 bg-red-100 rounded-full' onClick={handleTrashClick}>
            <FuseSvgIcon color="action" className="text-sm " style={{ color: '#ef5350', transform: 'scale(0.6) ' }}>feather:trash</FuseSvgIcon>
          </Paper>

        </div>
        <Divider className='my-14' />
        {searchInput === '' ? (
          // Show all options when the search input is empty
          names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                checked={personName.indexOf(name) > -1}
              />
              <ListItemText className='text-[14px]' primary={name} />
            </MenuItem>
          ))
        ) : filteredOptions.length === 0 ? (
          // Show "No results" when there are no matching options
          <MenuItem disabled>No results</MenuItem>
        ) : (
          // Show matching options
          filteredOptions.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                checked={personName.indexOf(name) > -1}
              />
              <ListItemText className='text-[14px]' primary={name} />
            </MenuItem>
          ))
        )}

      </Select>
    </FormControl>
  );
}
function SelectLang() {
  const names = [
    'German',
    'English',
    'French',
    'Italian',
    
  ];
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },

  };
  const [personName, setPersonName] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  const handleTrashClick = () => {
    // Clear all selected values by setting personName to an empty array
    setPersonName([]);
    setSearchInput('');
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const filteredOptions = names.filter((name) =>
    name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (

    <FormControl sx={{ m: 1, minWidth: 120 }} className='status_search rounded-full' size="small" style={{ maxWidth: '184px' }}>
      <Select
        className='rounded-full'
        id='menu-bhai'
        multiple
        value={personName}
        displayEmpty
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          const filteredSelected = selected.filter((value) => value !== undefined);
          console.log(filteredSelected);
          if (filteredSelected.length === 0) {
            return <p className='mt-2' >Product type</p>;
          }
          return (
            <p className='mt-2 text-ellipsis overflow-hidden selectedvalues'><span className='selectedlength' >{`${filteredSelected.length}`}</span><span className=''>{`${filteredSelected.join(', ')}`}</span></p>
          );
        }}

        MenuProps={{
          ...MenuProps, // Spread the existing properties
          id: 'product-select', // Add your custom id
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >

        <div className='flex p-10'>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <FuseSvgIcon style={{ transform: 'scale(0.6)' }} color="disabled">feather:search</FuseSvgIcon>

            <Input
              placeholder="Search"
              className="flex flex-1 text-sm"
              disableUnderline
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              inputProps={{
                'aria-label': 'Search',
              }}
            // onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
          <Paper className='ms-5 p-8 bg-red-100 rounded-full' onClick={handleTrashClick}>
            <FuseSvgIcon color="action" className="text-sm " style={{ color: '#ef5350', transform: 'scale(0.6) ' }}>feather:trash</FuseSvgIcon>
          </Paper>

        </div>
        <Divider className='my-14' />
        {searchInput === '' ? (
          // Show all options when the search input is empty
          names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                checked={personName.indexOf(name) > -1}
              />
              <ListItemText className='text-[14px]' primary={name} />
            </MenuItem>
          ))
        ) : filteredOptions.length === 0 ? (
          // Show "No results" when there are no matching options
          <MenuItem disabled>No results</MenuItem>
        ) : (
          // Show matching options
          filteredOptions.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                checked={personName.indexOf(name) > -1}
              />
              <ListItemText className='text-[14px]' primary={name} />
            </MenuItem>
          ))
        )}

      </Select>
    </FormControl>
  );
}
function SelectTld() {
  const names = [
    'de',
    'org',
    'com',
    'net',
    
  ];
  const ITEM_HEIGHT = 100;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },

  };
  const [personName, setPersonName] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');

  const handleTrashClick = () => {
    // Clear all selected values by setting personName to an empty array
    setPersonName([]);
    setSearchInput('');
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const filteredOptions = names.filter((name) =>
    name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (

    <FormControl sx={{ m: 1, minWidth: 120 }} className='status_search rounded-full' size="small" style={{ maxWidth: '184px' }}>
      <Select
        className='rounded-full'
        id='menu-bhai'
        multiple
        value={personName}
        displayEmpty
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          const filteredSelected = selected.filter((value) => value !== undefined);
          console.log(filteredSelected);
          if (filteredSelected.length === 0) {
            return <p className='mt-2' >TLDs</p>;
          }
          return (
            <p className='mt-2 text-ellipsis overflow-hidden selectedvalues'><span className='selectedlength' >{`${filteredSelected.length}`}</span><span className=''>{`${filteredSelected.join(', ')}`}</span></p>
          );
        }}

        MenuProps={{
          ...MenuProps, // Spread the existing properties
          id: 'product-select', // Add your custom id
        }}
        inputProps={{ 'aria-label': 'Without label' }}
      >

        <div className='flex p-10'>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <FuseSvgIcon style={{ transform: 'scale(0.6)' }} color="disabled">feather:search</FuseSvgIcon>

            <Input
              placeholder="Search"
              className="flex flex-1 text-sm"
              disableUnderline
              fullWidth
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              inputProps={{
                'aria-label': 'Search',
              }}
            // onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
          <Paper className='ms-5 p-8 bg-red-100 rounded-full' onClick={handleTrashClick}>
            <FuseSvgIcon color="action" className="text-sm " style={{ color: '#ef5350', transform: 'scale(0.6) ' }}>feather:trash</FuseSvgIcon>
          </Paper>

        </div>
        <Divider className='my-14' />
        {searchInput === '' ? (
          // Show all options when the search input is empty
          names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                checked={personName.indexOf(name) > -1}
              />
              <ListItemText className='text-[14px]' primary={name} />
            </MenuItem>
          ))
        ) : filteredOptions.length === 0 ? (
          // Show "No results" when there are no matching options
          <MenuItem disabled>No results</MenuItem>
        ) : (
          // Show matching options
          filteredOptions.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                checked={personName.indexOf(name) > -1}
              />
              <ListItemText className='text-[14px]' primary={name} />
            </MenuItem>
          ))
        )}

      </Select>
    </FormControl>
  );
}
function Morefilter() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

  
  return (
    <div className=' my-auto'>
      <Button variant="outlined" className='whitespace-nowrap' onClick={handleClick}>
        <FuseSvgIcon style={{ transform: 'rotate(90deg) scale(0.7)' }}>heroicons-outline:adjustments</FuseSvgIcon>More Filters  
      </Button>

    </div>
  );
}
function DataTable() {

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
  return (
    <div style={{ height: 560, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        disableColumnMenu
        pageSizeOptions={[5, 10]}


      />
    </div>
  );
}

