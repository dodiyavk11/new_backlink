import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const navigate = useNavigate();

    const navigateToMarketplace = () => {
      navigate('/marketplace/modern');
    };
    return (
        <div className=' my-auto'>
            <IconButton aria-describedby={id} variant="outlined" className='whitespace-nowrap' onClick={handleClick}>
                <FuseSvgIcon style={{ transform: 'scale(0.8)' }}>heroicons-outline:shopping-bag</FuseSvgIcon>
            </IconButton>
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
                <div className='max-w-[380px] w-[380px] py-32 px-[69px]'>
                    <img src="https://assets.app.backlinked.com/dist/assets/app/empty.png" className='mx-auto' style={{ height: "auto", width: "75px;" }} />
                    <h2 className='text-center font-semibold'>Your cart is empty.</h2>
                    <Typography  className='text-center'>You can add contentlinks to your cart.</Typography>
                    <div className="w-full flex">
                    <Button
                         onClick={navigateToMarketplace}
                        className="whitespace-nowrap mx-auto mt-6 bg-secondary"
                        variant="contained"
                        color="secondary"
                        style={{ color: "white" }}
                        startIcon={<FuseSvgIcon size={20}>heroicons-outline:plus
                        </FuseSvgIcon>}
                    > View contentlinks</Button>
                    </div>
                   
                </div>


            </Popover>
        </div>
    );
}