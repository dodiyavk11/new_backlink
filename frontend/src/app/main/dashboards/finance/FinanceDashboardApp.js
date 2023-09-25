import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import FinanceDashboardAppHeader from './FinanceDashboardAppHeader';
import PreviousStatementWidget from './widgets/PreviousStatementWidget';
import CurrentStatementWidget from './widgets/CurrentStatementWidget';
import AccountBalanceWidget from './widgets/AccountBalanceWidget';
import RecentTransactionsWidget from './widgets/RecentTransactionsWidget';
import BudgetWidget from './widgets/BudgetWidget';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {alpha,styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';


import Divider from '@mui/material/Divider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import PropTypes from 'prop-types';


import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import "./style.css";
import { a } from 'react-spring';



function FinanceDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  const rows = [
    // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);





  function SelectStatus() {
    const names = [
      'Pending',
      'In Progress',
      'Completed',
      'Cancelled',
      'Rejected',
      'Missing Details',
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
            console.log(filteredSelected);
            if (filteredSelected.length === 0) {
              return <p className='mt-2' >Status</p>;
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
  function SelectProductType() {
    const names = [
      'Press Release',
      'Seo Content',
      'Google Disavow',
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
  function SelectProject() {
    const [age, setAge] = React.useState('');
    // console.log(age);

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
      <div>
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }} style={{ maxWidth: '184px' }}>
          <Select
            value={age}
            className='rounded-full'
            onChange={handleChange}
            displayEmpty
            MenuProps={{

              id: 'Project-select', // Add your custom id
            }}
            renderValue={(selected) => {
              // console.log(selected);
              if (selected === "") {
                return <p className='mt-2' >No Project</p>;
              }
              return (
                <p className='mt-2 text-ellipsis overflow-hidden selectedvalues'><span className=''>{`${selected}`}</span></p>
              );
            }
            }
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value=""> <Checkbox
              icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
              checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
              checked={age == ''}
            />
              <p>No Project</p>
            </MenuItem>
            <MenuItem value='xyz.com'> <Checkbox
              icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
              checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
              checked={age == 'xyz.com'}
            />xyz.com</MenuItem>
            <MenuItem value='besticoder.com'> <Checkbox
              icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
              checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
              checked={age == 'besticoder.com'}
            />besticoder.com</MenuItem>

          </Select>

        </FormControl>
      </div>
    );
  }
  function DataPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedDateRange, setSelectedDateRange] = React.useState([null, null]);


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDateChange = (newDateRange) => {
      setSelectedDateRange(newDateRange);
    };
    const Clearselected = () => {
      setSelectedDateRange([null, null]);
    };
    console.log(selectedDateRange)

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div className='my-auto'>
        <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
          {selectedDateRange[0] && selectedDateRange[1] ? (
            <>
              {selectedDateRange[0].$d.toLocaleDateString()} - {selectedDateRange[1].$d.toLocaleDateString()}
              <FuseSvgIcon style={{ transform: 'scale(0.6)' }} color="disabled" onClick={Clearselected}>heroicons-outline:x</FuseSvgIcon>
            </>
          ) : (<> Date
            <FuseSvgIcon style={{ transform: 'scale(0.6)' }} color="disabled">heroicons-outline:chevron-down</FuseSvgIcon></>)}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {/* <DatePicker /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
              <DateRangeCalendar calendars={1} value={selectedDateRange}
                onChange={handleDateChange} />
            </DemoContainer>
          </LocalizationProvider>
        </Popover>
      </div>
    );
  }
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
    const AntSwitch = styled(Switch)(({ theme }) => ({
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
      '&:active': {
        '& .MuiSwitch-thumb': {
          width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          transform: 'translateX(9px)',
        },
      },
      '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
          transform: 'translateX(12px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
          },
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
          duration: 200,
        }),
      },
      '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
      },
    }));
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
        <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
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
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="ID"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Date & Time"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Product"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Status"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Project"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Anchor text "
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Target URl"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Week"
            />
            <FormControlLabel dir="rtl" className='justify-between flex border rounded-full m-10 p-10'
              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
              label="Amount"
            />
          </div>


        </Popover>
      </div>
    );
  }
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
  function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>

        <Button
                onClick={handleClickOpen}
          className="whitespace-nowrap mt-6 bg-secondary"
          variant="contained"
          color="secondary"
          style={{ color: "white" }}

          startIcon={<FuseSvgIcon size={20}>heroicons-outline:plus
          </FuseSvgIcon>}
        >
          Add Balance
        </Button>
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='p-[27px] addbalance w-full'
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>

        </BootstrapDialogTitle>
        <DialogContent className='p-[27px]' >
          <div className=''>
            <h2 className='font-bold text-3xl '>Add Balance</h2>
            
          </div>
          <div className='mt-20'>
            <Typography className='text-sm'>Amount</Typography>
            <FormControl variant="standard" className='w-full  mt-5'>
              <InputLabel shrink style={{ fontSize: '17px' }} htmlFor="bootstrap-input">
              Enter the amount you wish to deposit into your credit account.
              </InputLabel>
              <BootstrapInput placeholder='459.00' id="bootstrap-input" />
              </FormControl>
              <div className=' mt-12 bg-[#dbdada] rounded-lg'>
                <h3 className='flex p-16 text-[14px] bg-slate-400'> <span><FuseSvgIcon style={{transform:'rotate(180deg)'}}>heroicons-outline:exclamation-circle</FuseSvgIcon></span> You will be credited $0.00 . The total amount payable of $0.00 includes applicable VAT in the amount of 19%.</h3>
              </div>
            <Typography className=' mt-14 text-[14px]'>Coupon</Typography>
            <FormControl variant="standard" className='w-full  mt-5'>
              <InputLabel shrink style={{ fontSize: '17px ' }} htmlFor="bootstrap-input">
              Do you have a coupon code? Enter it here.
              </InputLabel>
              <BootstrapInput placeholder='Selllinked2020' id="bootstrap-input" />
              </FormControl>
              <Typography className=' mt-14 text-[14px]'>Saved payment methods</Typography>
              <Typography className='text-[12px]'>Use a saved payment method to top up your balance.</Typography>
              <div className=' mt-12 bg-[#dbdada] rounded-lg'>
                <h3 className='p-16 text-[14px] bg-slate-400'>No saved payment methods yet.</h3>
              </div>
              


          </div>

        </DialogContent>
          <DialogActions className='block'>
            <div className=''>
            <Button variant="contained" autoFocus className='w-full' style={{ color: 'white' }} color='secondary' onClick={handleClose}>
            Contiune to payment
            </Button>
          </div>
         
            <div className='flex justify-between mt-14'>
              <div className=''>
                <img src='https://assets.app.backlinked.com/dist/assets/stripe.svg' style={{width:'auto',height:'25px',marginRight:'5px'}}/>
              </div>
              <div className='mb-0'>
                <Typography className='secondary flex text-[11px]' style={{color:'#ff9756'}}><FuseSvgIcon style={{transform:'scale(0.5)'}}>feather:lock</FuseSvgIcon>Secure connection</Typography>
              </div>
            </div>
        </DialogActions>
      </BootstrapDialog>
      </div>
    );
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(6),
      paddingBottom: 0,
  
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(6),
    },
  }));


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
  return (
    <FusePageSimple
      header={<FinanceDashboardAppHeader />}
      content={
        <div className="w-full px-24 md:px-32 pb-24">
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (<>
              <motion.div initial={{ y: -30 }}
                animate={{ y: 0, transition: { delay: 0.2 } }}
                delay={300} className="w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto" variants={container}>

                <Paper className='p-28 shadow '>
                  <div className='flex justify-between	' >
                    <div className='float-left flex'>
                      <Paper
                        component={motion.div}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                        style={{ height: '40px' }}
                        className="flex items-center w-full my-auto sm:max-w-128   px-8 rounded-full border-1 shadow-0"
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
                      <SelectStatus />
                      <SelectProductType />
                      <SelectProject />
                      <DataPopover />
                    </div>
                    <div className='float-right flex'>
                      <Customizepop />
                    </div>

                  </div>


                  <Paper className=' shadow-0 border-0' style={{ height: 600 }}>
                    {rows.length === 0 ? (
                      <div className='flex justify-center items-center flex-col h-full w-full my-32 MAX'>
                        <img src='https://assets.app.backlinked.com/dist/assets/app/empty.png' style={{ height: 'auto', width: '100px' }} />
                        <h2 className=' font-medium'>No Orders</h2>
                        <p className='max-w-[400px] text-center'>You do not have any orders yet. As soon as you place your first order, it will show up here.</p>
                        <CustomizedDialogs />
                      </div>
                    ) : (
                      <>
                        <DataGrid
                          className='rounded-2xl'
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: { page: 0, pageSize: 5 },
                            },
                          }}
                          pageSizeOptions={[5, 10]}
                        />
                      </>
                    )}

                  </Paper>

                </Paper>

              </motion.div>



            </>
            );
          }, [widgets])}
        </div>
      }
    />
  );
}

export default withReducer('financeDashboardApp', reducer)(FinanceDashboardApp);



