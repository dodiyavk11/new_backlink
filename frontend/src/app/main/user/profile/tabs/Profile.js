import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import './style.css';
import { Divider } from '@mui/material';

function AboutTab() {
  const [data, setData] = useState(null);
  const test = (x) => x + 1;



  return (
    <motion.div initial="hidden" animate="show" className="w-full">
      <Box >
        <Card variant="outlined">  <CardContent>

          <Typography variant="subtitle1" className='font-semibold' component="div">
            Personal information
          </Typography>
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div>
              <Typography>Email address</Typography>
              <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{ textDecoration: "none" }}>in the account section.</Link></Typography>
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} disabled variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] cursor-not-allowed' style={{ cursor: 'not-allowed' }}
                  aria-describedby="outlined-weight-helper-text"
                  value='demo@gmail.com'
                />

              </FormControl>

            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Firstname*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='firstname'
                />

              </FormControl>
            </div>

          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Lastname*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='Lastname'
                />

              </FormControl>
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Address*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='Address'
                />

              </FormControl>
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Postal code*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='223232'
                />

              </FormControl>
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>City*</Typography>
              {/* <Typography className='text-sm'>You can change your email address  <Link to="/settings/account" className='no-underline' style={{textDecoration:"none"}}>in the account section.</Link></Typography> */}
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='New york'
                />

              </FormControl>
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Country*</Typography>
              <Typography className='text-sm'>To change the country of the billing address, please contact us at support@backlinked.de.</Typography>
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} disabled variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='Germany'
                />

              </FormControl>
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Phone Number</Typography>
              <Typography className='text-sm'>By providing your phone number we can reach you faster in case of issues.</Typography>
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] '
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='78787888888'
                />

              </FormControl>
            </div>
          </div>
        </CardContent>
        </Card>
      </Box>
      <Box >
        <Card variant="outlined" className='mt-24'>  <CardContent>

          <Typography variant="subtitle1" className='font-semibold' component="div">
            Business information
          </Typography>
          <Typography variant="subtitle1" className='text-sm' component="div">
            To change your company information, please contact us at support@backlinked.de.
          </Typography>
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div>
              <Typography>Company name*</Typography>

            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} disabled variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] cursor-not-allowed' style={{ cursor: 'not-allowed' }}
                  aria-describedby="outlined-weight-helper-text"
                  value='testing'
                />

              </FormControl>

            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto'>
              <Typography>Vat ID</Typography>
              <Typography className='text-sm'>Mandatory for customers outside of Germany</Typography>
            </div>
            <div className='col-span-3 ml-[70px]'>
              <FormControl sx={{ m: 1, width: '100%', }} disabled variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-weight"
                  className='h-[45px] cursor-not-allowed'
                  aria-describedby="outlined-weight-helper-text"
                  defaultValue='Vat ID'
                />

              </FormControl>
            </div>
          </div>
          
        </CardContent>
        </Card>
      </Box>
      <Button
              className="whitespace-nowrap bg-secondary mt-32"
              variant="contained"
              color="secondary"
              style={{ color: "white" }}

            >
              Save Changes
            </Button>
    </motion.div>
  );
}

export default AboutTab;
