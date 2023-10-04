import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';

function PaymentApp() {
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
      {/* < motion.div initial={{ x: -30 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300} className='w-full max-w-[calc(1240px+2.5rem)] mt-32 px-10 pt-32 mx-auto'>
        <h1 className='text-3xl font-bold text-[#354252] tracking-tight leading-8'>Payment</h1>
      </motion.div> */}
      <motion.div initial={{ y: -30 }}
        animate={{ y: 0, transition: { delay: 0.2 } }}
        delay={300} className="w-full max-w-[calc(1240px+2.5rem)] mb-[10%] mt-[5%] px-10 pt-14 mx-auto" >


        <div className="grid grid-cols-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
          <div className="col-span-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
            <Paper className="flex flex-col bg-white shadow-sm mt-6 rounded-lg overflow-visible">
              <div className=" p-28 items-center justify-between space-x-4 divide-x">
                <h1 className='text-3xl font-bold text-[#354252] tracking-tight leading-8'>Payment</h1>
              </div>
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


            </Paper>
          </div>


        </div>




      </motion.div>

    </>
  );
}

export default PaymentApp;
