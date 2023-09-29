
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';  


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
        <div className='block cursor-pointer'  onClick={handleClickOpen}>
          <div className='flex'><span className='font-semibold my-auto'>$0.00</span> <IconButton className='bg-[#ff9756] p-0 ml-5 scale-75'><FuseSvgIcon size={20}>heroicons-outline:plus
          </FuseSvgIcon></IconButton></div>
          <Typography className='text-sm font-medium'>Avaliable Balance</Typography>
          </div>
        {/* <Button
                onClick={handleClickOpen}
          className="whitespace-nowrap mt-6 bg-secondary"
          variant="contained"
          color="secondary"
          size='small'
          style={{ color: "white" }}
        >
           <FuseSvgIcon size={20}>heroicons-outline:plus
          </FuseSvgIcon>
        </Button> */}
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
export default CustomizedDialogs;