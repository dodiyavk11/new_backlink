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
import Input from '@mui/material/Input';
import Divider from '@mui/material/Divider';
import "./style.css";



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
            if (selected.length === 0 ) {
              return <p className='mt-2' >Status</p>;
            }
            return (
              <p className='mt-2 text-ellipsis overflow-hidden selectedvalues'><span className='selectedlength' >{`${selected.length}`}</span><span className=''>{`${selected.join(', ')}`}</span></p>
            );
          }}
          
          MenuProps={MenuProps}
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
          multiple
          value={personName}
          displayEmpty  
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            // console.log(selected);
            if (selected.length === 0 ) {
              return <p className='mt-2' >Product Type</p>;
            }
            return (
              <p className='mt-2 text-ellipsis overflow-hidden selectedvalues'><span className='selectedlength' >{`${selected.length}`}</span><span className=''>{`${selected.join(', ')}`}</span></p>
            );
          }}
          
          MenuProps={MenuProps}
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
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
      <div>
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }} style={{maxWidth:'184px'}}>
        <Select
            value={age}
            className='rounded-full'
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=""> <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
              checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
              checked={age==''}
              />
            <p>No Project</p>
          </MenuItem>
          <MenuItem value='xyz.com'> <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
              checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}
              checked={age=='xyz.com'}
              />xyz.com</MenuItem>
          <MenuItem value='besticoder.com'> <Checkbox
                icon={<FuseSvgIcon >material-outline:circle</FuseSvgIcon>}
              checkedIcon={<FuseSvgIcon >material-solid:check_circle_outline</FuseSvgIcon>}   
              checked={age=='besticoder.com'}
              />besticoder.com</MenuItem>
         
        </Select>
       
      </FormControl>
      </div>
    );
  }
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
                  <div className='flex' >
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
                    <SelectProject/>
                  </div>


                  <Paper className=' shadow-0 border-0' style={{ height: 600 }}>
                    <DataGrid
                      className='rounded-2xl '
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    />
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



