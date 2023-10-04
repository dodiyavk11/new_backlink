import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Account from './tabs/Account';
import Profile from './tabs/Profile';
import Notifications from './tabs/Notifications';
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';

function ProfileApp() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [value, setValue] = React.useState('0');
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const location = useLocation(); // Get the current location object from React Router

  useEffect(() => {
    // This code will run whenever the component mounts
    // and whenever the URL changes
    setValue('0');  
    // Get the current URL from the location object
    const currentUrl = location.pathname;

    // You can now do something with the current URL
    // console.log('Current URL:', currentUrl);
    if (currentUrl == '/settings/profile') {
      setValue('0');
    } else if (currentUrl == '/settings/account') {
      setValue('1');
    }
    else if (currentUrl == '/settings/notifications') {
      setValue('2');
    }

  }, [location]); // Include 'location' in the dependency array

    
  return (
    <>
      < motion.div initial={{ x: -30 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300} className='w-full max-w-[calc(1240px+2.5rem)] mt-32 px-10 pt-32 mx-auto'>
        <h1 className='text-3xl font-bold text-[#354252] tracking-tight leading-8'>Settings</h1>
      </motion.div>
      <motion.div initial={{ y: -30 }}
        animate={{ y: 0, transition: { delay: 0.2 } }}
        delay={300} className="w-full max-w-[calc(1240px+2.5rem)] mb-[10%] px-10 pt-14 mx-auto" >


        <div className="grid grid-cols-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
          <div className="col-span-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
            <Paper className="flex flex-col bg-white shadow-sm mt-6 rounded-lg overflow-visible">
              <div className=" p-28 items-center justify-between space-x-4 divide-x">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="Profile" value="0" />
                        <Tab label="Account" value="1" />
                        <Tab label="Notifications" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="0" className='px-0'><Profile/></TabPanel>
                    <TabPanel value="1"><Account/></TabPanel>
                    <TabPanel value="2"><Notifications/></TabPanel>
                  </TabContext>
                </Box>



              </div>


            </Paper>
          </div>


        </div>




      </motion.div>

    </>
  );
}

export default ProfileApp;
