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
import { useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

function PhotosVideosTab() {
 

 

  return (
    <motion.div  initial="hidden" animate="show" className="w-full">
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
                  value='demo@gmail.com'
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
                  defaultValue='demo@gmail.com'
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
                  defaultValue='Password'
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
                  value='demo@gmail.com'
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
                  defaultValue='demo@gmail.com'
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
                  defaultValue='Password'
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
