import { useState, useEffect } from 'react';
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
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


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
import { width } from '@mui/system';

function ModernPricingPage() {
  const [period, setPeriod] = useState('month');
  const [value, setValue] = React.useState('1');
  const [deleteall, setDeleteall] = React.useState(false);
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [follow, setfollow] = React.useState('');

  const followChange = (event) => {
    setfollow(event.target.value);
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
  let [category, setcategory] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');
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

    const [category, setcategory] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');
    const handleTrashClick = () => {
      // Clear all selected values by setting category to an empty array
      setcategory([]);
      setSearchInput('');

    };
    function deleteAllCategories() {
      // console.log('hi');
      if (deleteall == true) {
        setcategory([]);
        setSearchInput('');
        setfollow('');
      }
    }
    setInterval(deleteAllCategories, 1000);
    const handleChange = (event) => {
      // setDeleteall(false);
      const {
        target: { value },
      } = event;
      setcategory(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const filteredOptions = names.filter((name) =>
      name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (

      <FormControl onClick={setDeleteall(false)} sx={{ m: 1, minWidth: 120 }} className='status_search rounded-full' size="small" style={{ maxWidth: '184px' }}>
        <Select
          className='rounded-full'
          multiple
          value={category}
          displayEmpty
          // onOpen={setDeleteall(false)}
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
                  checked={category.indexOf(name) > -1}
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
                  checked={category.indexOf(name) > -1}
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
    const language = [
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

    const [lang, setLang] = React.useState([]);
    const [searchlang, setSearchlang] = React.useState('');
    function deleteAllCategories() {
      // console.log('hi');
      if (deleteall == true) {
        setLang([]);
        setSearchlang('');
      }
    }
    setInterval(deleteAllCategories, 1000);

    const handleTrashClick = () => {
      // Clear all selected values by setting lang to an empty array
      setLang([]);
      setSearchlang('');
    };

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setLang(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const filteredOptions = language.filter((name) =>
      name.toLowerCase().includes(searchlang.toLowerCase())
    );
    return (

      <FormControl onClick={setDeleteall(false)} sx={{ m: 1, minWidth: 120 }} className='status_search rounded-full' size="small" style={{ maxWidth: '184px' }}>
        <Select
          className='rounded-full'
          id='menu-bhai'
          multiple
          value={lang}
          displayEmpty
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            const filteredSelected = selected.filter((value) => value !== undefined);
            // console.log(filteredSelected);
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
                value={searchlang}
                onChange={(e) => searchlang(e.target.value)}
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
          {searchlang === '' ? (
            // Show all options when the search input is empty
            language.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                  checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                  checked={lang.indexOf(name) > -1}
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
                  checked={lang.indexOf(name) > -1}
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
    const [tld, settld] = React.useState([]);
    const [searchtld, setsearchtld] = React.useState('');
    function deleteAllCategories() {
      // console.log('hi');
      if (deleteall == true) {
        settld([]);
        setsearchtld('');
      }
    }
    setInterval(deleteAllCategories, 1000);

    const handleTrashClick = () => {
      // Clear all selected values by setting tld to an empty array
      settld([]);
      setsearchtld('');
    };

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      settld(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const filteredOptions = names.filter((name) =>
      name.toLowerCase().includes(searchtld.toLowerCase())
    );
    return (

      <FormControl sx={{ m: 1, minWidth: 120 }} onClick={setDeleteall(false)} className='status_search rounded-full' size="small" style={{ maxWidth: '184px' }}>
        <Select
          className='rounded-full'
          id='menu-bhai'
          multiple
          value={tld}
          displayEmpty
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            const filteredSelected = selected.filter((value) => value !== undefined);
            // console.log(filteredSelected);
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
                value={searchtld}
                onChange={(e) => setsearchtld(e.target.value)}
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
          {searchtld === '' ? (
            // Show all options when the search input is empty
            names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox
                  icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                  checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                  checked={tld.indexOf(name) > -1}
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
                  checked={tld.indexOf(name) > -1}
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
              <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:lock-closed</FuseSvgIcon>
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
  function Morefilterdata() {
    function valuetext(value) {
      return `${value}`;
    }
    const [value, setValue] = React.useState([30.00, 2000.00]);
    const handleChange = (event, newValue) => {
      // console.log(newValue);
      setValue(newValue);
    };

    const handleInputChange = (index, newValue) => {
      console.log(newValue);
      if (/^-?\d*\.?\d*$/.test(newValue)) {
        const newValues = [...value];
        newValues[index] = newValue;
        setValue(newValues);
      }
    };
    return (
      <Paper className='mx-14  grid grid-cols-3 gap-4'>
        <Box sx={{ width: 300 }} className="m-[24px]">
          <div className='flex mb-14'>
            <img src="https://assets.app.backlinked.com/dist/assets/metrics/ahrefs.svg" class="bg-bl-dark-blue rounded-lg w-24 p-1 mr-3" />
            <Typography className='ml-10'>Domain Rating</Typography>
          </div>
          <div className='flex justify-center'>
            <Slider
              sx={{ width: 250 }}
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={30}
              max={2000}
            />
          </div>

          <div className='flex'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                // defaultValue={value[0]}
                value={value[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                value={value[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </FormControl>

          </div>

        </Box>
        <Box sx={{ width: 300 }} className="m-[24px]">
          <div className='flex'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                // defaultValue={value[0]}
                value={value[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                value={value[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </FormControl>

          </div>

          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={30}
            max={2000}
          />
        </Box>
        <Box sx={{ width: 300 }} className="m-[24px]">
          <div className='flex'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                // defaultValue={value[0]}
                value={value[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                value={value[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </FormControl>

          </div>

          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={30}
            max={2000}
          />
        </Box>
        <Box sx={{ width: 300 }} className="m-[24px]">
          <div className='flex'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                // defaultValue={value[0]}
                value={value[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                value={value[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </FormControl>

          </div>

          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={30}
            max={2000}
          />
        </Box>
        <Box sx={{ width: 300 }} className="m-[24px]">
          <div className='flex'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                // defaultValue={value[0]}
                value={value[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                value={value[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </FormControl>

          </div>

          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={30}
            max={2000}
          />
        </Box>
        <Box sx={{ width: 300 }} className="m-[24px]">
          <div className='flex'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                // defaultValue={value[0]}
                value={value[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
              />

            </FormControl>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                id="outlined-controlled"
                // label="Controlled"
                className='rounded-full ml-10'
                type="number"
                step='0.01'
                value={value[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
              />
            </FormControl>

          </div>

          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={30}
            max={2000}
          />
        </Box>
      </Paper>
    );
  }


  function RangeSlider() {

    function valuetext(value) {
      return `${value}`;
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      // console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
    };
    const [value, setValue] = React.useState([30.00, 2000.00]);
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleChange = (event, newValue) => {
      // console.log(newValue);
      setValue(newValue);
    };

    const handleInputChange = (index, newValue) => {
      console.log(newValue);
      if (/^-?\d*\.?\d*$/.test(newValue)) {
        const newValues = [...value];
        newValues[index] = newValue;
        setValue(newValues);
      }
    };


    return (
      <div className=' my-auto'>
        <Button aria-describedby={id} style={{ border: '1px solid #dbdada' }} variant="outlined" className='whitespace-nowrap' onClick={handleClick}>{value[0] == 30 && value[1] == 2000 ? (<>Prize</>) : (<> ${value[0].toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} - ${value[1].toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</>)}
          {anchorEl == null ? (<><FuseSvgIcon style={{ transform: ' scale(0.5)' }}>heroicons-outline:chevron-down</FuseSvgIcon></>) : (<><FuseSvgIcon style={{ transform: ' scale(0.5)' }}>heroicons-outline:chevron-up</FuseSvgIcon></>)}
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
          <div className='max-w-[400px] w-[400px] h-[122px]'>
            <Box sx={{ width: 350 }} className="mx-auto my-24">
              <div className='flex'>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">

                  <TextField
                    id="outlined-controlled"
                    // label="Controlled"
                    className='rounded-full ml-10'
                    type="number"
                    step='0.01'
                    // defaultValue={value[0]}
                    value={value[0]}
                    onChange={(e) => handleInputChange(0, e.target.value)}
                  />

                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <TextField
                    id="outlined-controlled"
                    // label="Controlled"
                    className='rounded-full ml-10'
                    type="number"
                    step='0.01'
                    value={value[1]}
                    onChange={(e) => handleInputChange(1, e.target.value)}
                  />
                </FormControl>

              </div>

              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={30}
                max={2000}
              />
            </Box>

          </div>


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
  const handleTrashClickOutside = () => {
    setDeleteall(true);
  };
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


                  <Typography className='flex my-auto ml-14 mr-10 pt-6  '>
                    <BootstrapTooltip title="Only show links with a dr over three or traffic over ten." > <div className='flex'><FuseSvgIcon style={{ transform: 'scale(0.7)', }}>heroicons-outline:badge-check</FuseSvgIcon> Quality filter</div>
                    </BootstrapTooltip></Typography>
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
                  <RangeSlider />
                </div>
                <div className='float-right flex mr-14'>
                  <Morefilter />
                  <BootstrapTooltip title="Show only revealed domain">
                    <IconButton aria-label="link" className=' mx-10 my-auto' style={{
                      border: '1px solid #dbdada',
                      padding: '3px'
                    }}  >
                      <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:eye</FuseSvgIcon>
                    </IconButton>
                  </BootstrapTooltip>
                  <BootstrapTooltip title="Show only favorites">
                    <IconButton aria-label="link" className=' mx-10 my-auto' style={{
                      border: '1px solid #dbdada',
                      padding: '3px'
                    }}  >
                      <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:heart</FuseSvgIcon>
                    </IconButton>
                  </BootstrapTooltip>
                  <BootstrapTooltip title="Reset filter">
                    <IconButton onClick={() => handleTrashClickOutside()} aria-label="link" className=' mx-10 my-auto' style={{
                      border: '1px solid #dbdada',
                      padding: '3px'
                    }}  >
                      <FuseSvgIcon style={{ transform: 'scale(0.7)', color: 'red' }}>feather:trash</FuseSvgIcon>
                    </IconButton>
                  </BootstrapTooltip>
                </div>

              </div>
              <div className='bg-[#f1f5f9]'>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={follow}
                    onChange={followChange}
                    displayEmpty
                    className='follow'
                    inputProps={{ 'aria-label': 'Without label' }}
                    renderValue={(selected) => {
                      if (selected == "") {
                        return <>Relationship (dofollow/nofollow)</>
                      }
                      else {
                        return selected;
                      }
                    }}

                  >
                    <MenuItem value=''> <Checkbox
                      icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                      checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                      checked={follow == ''}
                    /> No selection</MenuItem>
                    <MenuItem value='dofollow'> <Checkbox
                      icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                      checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                      checked={follow == 'dofollow'}
                    /> dofollow</MenuItem>
                    <MenuItem value='nofollow'><Checkbox
                      icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
                      checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
                      checked={follow == 'nofollow'}
                    /> nofollow</MenuItem>
                  </Select>

                </FormControl>
                <Morefilterdata />
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




