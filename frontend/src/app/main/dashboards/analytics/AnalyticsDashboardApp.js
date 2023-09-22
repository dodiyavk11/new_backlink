import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import AnalyticsDashboardAppHeader from './AnalyticsDashboardAppHeader';
// import AddBalance from './widgets/AddBalance';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
// import { selectWidgets } from '../store/widgetsSlice';
function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<AnalyticsDashboardAppHeader />}
      content={
        <>
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

            return (
              (
                <motion.div initial={{ y: -30 }}
                animate={{ y: 0, transition: { delay: 0.2 } }}
                delay={300}  className="w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto" variants={container}>

                  <div className="grid grid-cols-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
                    <div className="col-span-3 gap-6 sm:gap-32" style={{ display: "grid" }}>
                      <Paper   className="relative p-24 pr-12 pb-12 rounded-2xl shadow overflow-hidden">
                        <div className="flex items-center justify-between space-x-4 divide-x">
                          <div className="flex flex-col  ">
                            <Typography className="text-xl font-extrabold text-[#354252] tracking-tight leading-6 truncate">
                              Avaliable
                            </Typography>
                            {/* {status === 'paid' && ( */}
                            <Typography className="text-[#354252] text-600 font-extrabold text-xl">$0.00</Typography>
                            {/* )} */}



                          </div>
                          <div className="flex flex-col " >
                            <Typography className="text-lg font-medium tracking-tight leading-6 truncate text-[white]">
                              ssfsdf
                            </Typography>
                          </div>
                          <div className="flex flex-col border-none ">
                            <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
                              Reserved
                            </Typography>
                            {/* {status === 'paid' && ( */}
                            <Typography className="text-600 font-medium text-lg">$0.00</Typography>
                            {/* )} */}



                          </div>
                          <div className="-mt-8 border-none">
                            <Button
                              className="whitespace-nowrap bg-secondary"
                              variant="contained"
                              color="secondary"
                              style={{color:"white"}}
                              startIcon={<FuseSvgIcon size={20}>heroicons-outline:plus
                              </FuseSvgIcon>}
                            >
                              Add Balance
                            </Button>
                          </div>
                        </div>


                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0 w-96 h-96 -m-24">

                          {/* <FuseSvgIcon size={96} className="opacity-25 text-green-500 dark:text-green-400">
            heroicons-outline:check-circle
          </FuseSvgIcon>
     */}


                          {/* <FuseSvgIcon size={96} className="opacity-25 text-red-500 dark:text-red-400">
            heroicons-outline:exclamation-circle
          </FuseSvgIcon> */}

                        </div>
                      </Paper>
                      <Paper className="flex flex-col  flex-auto p-24 shadow rounded-2xl overflow-hidden">
                        <div className="flex justify-between">
                          <Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
                            Projects
                          </Typography>
                          <Button
                            className="whitespace-nowrap text-[#354252]"

                            startIcon={<FuseSvgIcon size={20}>heroicons-outline:plus
                            </FuseSvgIcon>}
                          >
                            Create Project
                          </Button>
                        </div>

                        <div className="table-responsive mt-24">
                          <Table className="simple w-full min-w-full">


                            <TableBody>
                              <TableRow >
                                <TableCell component="th" scope="row" className='flex'>
                                  <span className="inline-flex items-center justify-center p-14  mr-6 text-lg font-medium leading-none text-blue-900 bg-blue-50 rounded-full">xy</span>
                                  <div className=''>

                                  </div>
                                  <Typography className="" color="text.secondary">
                                    xyz.com
                                  </Typography>
                                </TableCell>
                              </TableRow>

                            </TableBody>
                          </Table>
                          <div className="pt-24 flex justify-center">
                            <Button className='text-center '>View all</Button>
                          </div>
                        </div>
                      </Paper>
                    </div>
                    <div className="col-span-3">
                      <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                        <div className="flex ">
                          <Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
                            Orders

                          </Typography>
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-secondary-100 bg-slate-800 rounded-full">5</span>


                        </div>

                        <div className="table-responsive mt-24">
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
                                  > PREIS </Typography>
                                </TableCell>


                              </TableRow>
                              {/* ))} */}


                            </TableHead>

                            <TableBody>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold font-bold " >
                                    basicthinking.de
                                  </Typography>
                                  <Typography className=" " >
                                    Business & Marketing, Machines & Technology
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    75
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    71
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    56
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="font-bold" >
                                    $1214.40
                                    <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                                  </Typography>
                                  <Typography className="text-sm line-through" >
                                    $1000.60

                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold font-bold " >
                                    mittellaendische.ch
                                  </Typography>
                                  <Typography className=" " >
                                    News & Media, Business & Marketing, Other
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    10
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    36
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    16
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="font-bold" >
                                    $336.60
                                    <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                                  </Typography>
                                  <Typography className="text-sm line-through" >
                                    $408.60

                                  </Typography>
                                </TableCell>
                              </TableRow>

                            </TableBody>
                          </Table>
                          <div className="pt-24 flex justify-center">
                            <Button className='text-center '>View all</Button>
                          </div>
                        </div>
                      </Paper>
                    </div>
                    <div className="col-span-4">
                      <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
                        <div className="flex ">
                          <Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
                            Daily Deals

                          </Typography>
                          <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-secondary-100 bg-slate-800 rounded-full">5</span>


                        </div>

                        <div className="table-responsive mt-24">
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
                                  > PREIS </Typography>
                                </TableCell>


                              </TableRow>
                              {/* ))} */}


                            </TableHead>

                            <TableBody>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold font-bold " >
                                    xyz.com
                                  </Typography>
                                  <Typography className=" " >
                                    Electronics & Computers, Internet & SEO, Telecommunications
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
                              </TableRow>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold font-bold " >
                                    ok-magazin.de
                                  </Typography>
                                  <Typography className=" " >
                                    Tourism & Travel, Free time & hobbies, Health & Recreation
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    65
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    57
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    40
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="font-bold whitespace-nowrap" >
                                    $1476.60
                                    <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                                  </Typography>
                                  <Typography className="text-sm line-through" >
                                    $1740.60

                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold font-bold " >
                                    lernfoerderung.de
                                  </Typography>
                                  <Typography className=" " >
                                    Other, Family & Education, Culture
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    45
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    36
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    22
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="font-bold" >
                                    $459.60
                                    <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                                  </Typography>
                                  <Typography className="text-sm line-through" >
                                    $560.60

                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold font-bold " >
                                    basicthinking.de
                                  </Typography>
                                  <Typography className=" " >
                                    Business & Marketing, Machines & Technology
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    75
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    71
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    56
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="font-bold" >
                                    $1214.40
                                    <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] font-bold bg-[#ff9756] rounded-full">-15%</span>
                                  </Typography>
                                  <Typography className="text-sm line-through" >
                                    $1000.60

                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow >
                                <TableCell component="th" scope="row">
                                  <Typography className="text-[#354252] font-bold " >
                                    mittellaendische.ch
                                  </Typography>
                                  <Typography className=" " >
                                    News & Media, Business & Marketing, Other
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    10
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    36
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="" color="text.secondary">
                                    16
                                  </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <Typography className="font-bold" >
                                    $336.60
                                    <span className="inline-flex items-center justify-center px-3 py-1 ml-2 text-xs font-bold leading-none text-[#354252] bg-[#ff9756] rounded-full">-15%</span>
                                  </Typography>
                                  <Typography className="text-sm line-through" >
                                    $408.60

                                  </Typography>
                                </TableCell>
                              </TableRow>

                            </TableBody>
                          </Table>
                          <div className="pt-24 flex justify-center">
                            <Button className='text-center '>View all</Button>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  </div>



                  <div className="grid  grid-cols-6 xl:grid-cols-2 gap-32 w-full flex flex-col mt-32">

                    {/* <motion.div variants={item} className="flex flex-col flex-auto">
                      <AccountBalanceWidget />
                    </motion.div> */}
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">

                  </div>
                </motion.div>

              )
            );
          }, [widgets])}
        </>
      }
    />
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
