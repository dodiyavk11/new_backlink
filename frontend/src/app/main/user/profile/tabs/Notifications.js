import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch from '@mui/material/Switch';
function TimelineTab() {
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


  const [orderAccepted, setOrderAccepted] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [ordercreated, setOrdercreated] = useState(false);
  const [orderdeclined, setOrderdeclined] = useState(false);
  const [orderadditional , setOrderadditional ] = useState(false);
  const [paymentfailed, setpaymentfailed] = useState(false);
  const [paymentsuccessful, setpaymsuccessful] = useState(false);
  const [paymentreminder, setpaymentreminder] = useState(false);
  const [recommendations, setrecommendations] = useState(false);



  const handleSwitchChange = (event, setStateFunction) => {
    setStateFunction(event.target.checked);
  };
  const handledisableall = () => {
    setOrderAccepted(false);
    setOrderCompleted(false);
    setOrdercreated(false);
    setOrderdeclined(false);
    setOrderadditional(false);
    setpaymentfailed(false);
    setpaymentreminder(false);
    setpaymsuccessful(false);
    setrecommendations(false);
   
  };

  return (
    <motion.div initial="hidden" animate="show" className="w-full">
      <Box >
        <Card variant="outlined">  <CardContent>
          <div className='flex justify-between'>
            <div><Typography variant="subtitle1" className='font-semibold' component="div">
              Notifications
            </Typography></div>
            <div>   <Button size='small' variant="contained" onClick={handledisableall}>Disable all</Button></div>
          </div>

          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Order accepted</Typography>
               <Typography className='text-sm'>You will receive this email as soon as the publisher has accepted your order.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}
                  
                checked={orderAccepted} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setOrderAccepted)}
                />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Order completed</Typography>
               <Typography className='text-sm'>You will receive this email as soon as your order has been completed. Enclosed you will find the report for your order.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}
                checked={orderCompleted} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setOrderCompleted)}
                />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Order created</Typography>
               <Typography className='text-sm'>You will receive this email when we have received your order.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={ordercreated} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setOrdercreated)} />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Order declined</Typography>
               <Typography className='text-sm'>You will redeive this email if the publisher has declined you order.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={orderdeclined} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setOrderdeclined)} />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Order requires additional details</Typography>
               <Typography className='text-sm'>You will receive this email in case our team need more details regarding your order.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={orderadditional} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setOrderadditional)} />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Payment failed</Typography>
               <Typography className='text-sm'>You will recieve this email if your pament failed.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={paymentfailed} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setpaymentfailed)} />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Payment successful</Typography>
               <Typography className='text-sm'>You will receive this email if your payment was successful. Attached you will find the payment confirmation.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={paymentsuccessful} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setpaymsuccessful)} />}
              />
            </div>
          </div>

          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>Payment reminder</Typography>
               <Typography className='text-sm'>You will receive this email if your payment hasn't processed withing three days.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={paymentreminder} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setpaymentreminder)} />}
              />
            </div>
          </div>
          <Divider className='mt-14' />
          <div class="grid grid-cols-4 gap-4 mt-14">
            <div className='my-auto col-span-3'>
              <Typography>New recommendations</Typography>
               <Typography className='text-sm'>When one of your project gets a new recommendation, you will receive this email.</Typography>
            </div>
            <div className=' ml-[70px] flex justify-end'>
            <FormControlLabel className='myformcheck'
                control={<IOSSwitch sx={{ m: 1 }}   checked={recommendations} // Use the state variable for the checked prop
                onChange={(event) => handleSwitchChange(event, setrecommendations)} />}
              />
            </div>
          </div>
         

        </CardContent>
        </Card>
        <Button
            className="whitespace-nowrap  bg-secondary mt-32"
            variant="contained"
            color="secondary"

            style={{ color: "white" }}

          >
            Save Changes
          </Button>
      </Box>
    </motion.div>
  );
}

export default TimelineTab;
