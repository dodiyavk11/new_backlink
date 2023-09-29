import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'app/store/userSlice';
import { Divider } from '@mui/material';
import './usermenu.css';

function UserMenu(props) {
  const user = useSelector(selectUser);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.data.displayName}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="text.secondary">
            {user.role.toString()}
            {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
          </Typography>
        </div>

        {user.data.photoURL ? (
          <Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        className='usermenupop'
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8 w-full max-w-[190px]',
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
            <>
              
              <h5 className='min-w-40 text-[11px] pl-[14px] font-semibold uppercase'>Account</h5>
              <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
            
              <ListItemText primary="Payments" />
            </MenuItem>
              <Divider /> 
              <h5 className='min-w-40 pl-[14px] text-[11px] font-semibold uppercase'>Settings</h5>
            <MenuItem component={Link} to="/settings/profile" onClick={userMenuClose} role="button">
            
              <ListItemText primary="Profile" />
            </MenuItem>
            <MenuItem component={Link} to="/settings/account" onClick={userMenuClose} role="button">
              
              <ListItemText primary="Account" />
              </MenuItem>
              <MenuItem component={Link} to="/settings/notifications" onClick={userMenuClose} role="button">
             
              <ListItemText primary="Notifications" />
              </MenuItem>
              <Divider /> 
            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                userMenuClose();
              }}
            >
              <ListItemText className='text-red-600' primary="Log out" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
