import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function PhotosVideosTab() {

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 48,
    height: 24,
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
      height: 20,
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
    <motion.div initial="hidden" animate="show" className="w-full">
      <Box >
        <Card variant="outlined">  <CardContent>

          <Typography variant="subtitle1" className='font-semibold' component="div">
            Update e-mail address
          </Typography>
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>New e-mail address*</Typography>

            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} disabled variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] cursor-not-allowed' style={{ cursor: 'not-allowed' }}
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='demo@gmail.com'
                />

              </FormControl>

            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Repeat E-Mail address*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='demo@gmail.com'
                />

              </FormControl>
            </div>

          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Password*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='Password'
                />

              </FormControl>
            </div>
          </div>
          <Button
            className="whitespace-nowrap max-w-[275px] w-full bg-secondary mt-32"
            variant="contained"
            color="secondary"

            style={{ color: "white" }}

          >
            Save Changes
          </Button>

        </CardContent>
        </Card>
      </Box>
      <Box className="mt-24">
        <Card variant="outlined">  <CardContent>

          <Typography variant="subtitle1" className='font-semibold' component="div">
            Invoice settings
          </Typography>


          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Bulk invoice</Typography>
              <Typography className='text-sm'>Receive a bulk invoice at the end of the month for all bookings completed in that month.</Typography>
            </div>
            <div className='col-span-3 ml-[70px] flex justify-end'>
           
              <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}  />}
              />
            </div>

          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Invoice e-mail address</Typography>
              <Typography className='text-sm'>Enter the email address that should receive additionally invoices and funding confirmations / payment invoices.</Typography>
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='john.doe@backlinked.com'
                />

              </FormControl>
            </div>
          </div>
          <Button
            className="whitespace-nowrap max-w-[275px] w-full bg-secondary mt-32"
            variant="contained"
            color="secondary"

            style={{ color: "white" }}

          >
            Save Changes
          </Button>

        </CardContent>
        </Card>
      </Box>
      <Box className="mt-24">
        <Card variant="outlined">  <CardContent>

          <Typography variant="subtitle1" className='font-semibold' component="div">
            Change password
          </Typography>
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Current password*</Typography>

            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} disabled variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] cursor-not-allowed' style={{ cursor: 'not-allowed' }}
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='Current Password'
                />

              </FormControl>

            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>New password*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='New Password'
                />

              </FormControl>
            </div>

          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Confirm new password*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  placeholder='Confirm new Password'
                />

              </FormControl>
            </div>
          </div>
          <Button
            className="whitespace-nowrap max-w-[275px] w-full bg-secondary mt-32"
            variant="contained"
            color="secondary"

            style={{ color: "white" }}

          >
            Save Changes
          </Button>

        </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
}

export default PhotosVideosTab;
