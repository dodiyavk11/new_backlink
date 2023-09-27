import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import SimplePricingCard from './SimplePricingCard';
import SimplePricingFeatureItem from './SimplePricingFeatureItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Divider from '@mui/material/Divider';

function SimplePricingPage() {
  const [period, setPeriod] = useState('month');

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      < motion.div initial={{ x: -30 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300} className='w-full max-w-[calc(1240px+2.5rem)] mt-32 px-10 pt-32 mx-auto'>
        <h1 className='text-3xl font-bold text-[#354252] tracking-tight leading-8'>Link bundles</h1>
      </motion.div>
      <motion.div initial={{ y: -30 }}
        animate={{ y: 0, transition: { delay: 0.2 } }}
        delay={300} className="w-full max-w-[calc(1240px+2.5rem)] mb-[10%] px-10 pt-14 mx-auto" >


        <div className="grid grid-cols-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
          <div className="col-span-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
            <Paper className="flex flex-col bg-white shadow-sm mt-6 rounded-lg overflow-visible">
              <div className=" p-28 items-center justify-between space-x-4 divide-x">
                <div className="p-12 pb-16 ">
                  <h2 className="text-3xl font-extrabold text-[#354252] tracking-tight leading-6 truncate"> Ultimate link building starting at 347 Euro</h2>
                  <img src="https://assets.app.backlinked.com/dist/assets/products/packages.png" className="float-right w-[30%] ml-4 mb-4"></img>
                  <Typography className='mt-24'>
                    You lack the time or expertise to search backlinks from our portfolio? Our team will gladly take over this task for you!
                  </Typography>
                  <Typography className='mt-24'>
                    Our link packages not only have impressively high visibility values, the content also achieves maximum topic relevance. We create an individual article for each backlink and publish it with selected publishers.
                  </Typography>
                  <Typography className='mt-24'>
                    After your booking, you can easily personalize your link package by selecting the desired link targets, anchor texts as well as the date of publication. Then our team plans the link building measures according to your specifications. As soon as all backlinks from the booked link package have been completed, you will receive a detailed link report. If you have any questions about our link packages, our support team will be happy to help you. You can reach us by e-mail, live chat or phone at 0228 / 286 795 60.
                  </Typography>
                  <Typography className='mt-24'>
                    Note: We reserve the right to refuse any booking. Please note that we generally refuse bookings from the following areas: Eroticism, Cannabis / CBD, Tobacco & Co. or Mechanical Engineering.Note: We reserve the right to refuse any booking. Please note that we generally refuse bookings from the following areas: Eroticism, Cannabis / CBD, Tobacco & Co. or Mechanical Engineering.
                  </Typography>

                </div>



              </div>

              <div className="flex justify-center mt-[-5%]">
                <div className="w-full translate-y-80 max-w-sm md:max-w-7xl">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 lg:gap-y-0 md:gap-x-24 lg:gap-x-0"
                  >
                    <motion.div variants={item}>
                      <SimplePricingCard
                        className="lg:rounded-r-0 border border-slate-600"
                        period={period}
                        title="KICKSTART!"
                        subtitle="Perfect for an individual or a small team starting to get bigger"
                        yearlyPrice="$9"
                        monthlyPrice="$357.00"
                        number="2"
                        buttonTitle="Order now"
                        details={
                          <>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>DETAILS</Typography>
                            <List className='pt-0' >
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Incl. text creation (unique content)"
                                  />
                              </ListItem>
                              <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Relevant content according to your specification"
                                  />
                              </ListItem>
                              <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="I100% DoFollow links"
                                  />
                                </ListItem>
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="You choose the anchor text"
                                  />
                                </ListItem>    
                            </List>
                          </div>
                          <Divider className='mt-12'/>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>REPORTING</Typography>
                            <List className='pt-0' >
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Link report after completion"
                                  />
                              </ListItem>
                             
                            </List>
                          </div>
                          <Divider className='mt-12'/>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>PLACEMENT IN</Typography>
                            <div className='flex gap-24'>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Blog</Typography>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Magazines</Typography>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Newspapers</Typography>   
                            </div>
                          </div>
                          <Divider className='mt-12' />
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>METRICS</Typography>
                            <div className='flex justify-between items-center mb-4'>
                              <div className='flex'>
                                <img className='bg-bl-dark-blue rounded-lg w-32 h-32 p-1 mr-3' src='https://assets.app.backlinked.com/dist/assets/metrics/ahrefs.svg' />
                                <div className='flex flex-col items-start'>
                                  <span className='text-sm'>Domain Rating</span>
                                  <span className='text-xs text-gray-500'>ahrefs.com</span>
                                </div>
                              </div>
                                <div><span>Ø 20+</span></div>

                            </div>
                            <div className='flex justify-between items-center mb-4'>
                              <div className='flex'>
                                <img className='bg-bl-dark-blue rounded-lg w-32 h-32 p-1 mr-3' src='https://assets.app.backlinked.com/dist/assets/metrics/moz.svg' />
                                <div className='flex flex-col items-start'>
                                  <span className='text-sm'>Domain Authority</span>
                                  <span className='text-xs text-gray-500'>moz.com</span>
                                </div>
                              </div>
                                <div><span>Ø 20+</span></div>

                            </div>

                          </div>

                        </>
                        }
                      />
                    </motion.div>
                    <motion.div variants={item} className="lg:overflow-visible lg:z-99">
                      <SimplePricingCard
                        className="lg:pb-112 border border-slate-600 lg:shadow-2xl"
                        period={period}
                        title="SUPERBOOST!"
                        number="4"
                        subtitle="Perfect for growing teams wanting to be in more control"
                        yearlyPrice="$12"
                        monthlyPrice="$657.00"
                        buttonTitle="Order now"
                        details={
                          <>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>DETAILS</Typography>
                            <List className='pt-0' >
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Incl. text creation (unique content)"
                                  />
                              </ListItem>
                              <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Relevant content according to your specification"
                                  />
                              </ListItem>
                              <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="I100% DoFollow links"
                                  />
                                </ListItem>
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="You choose the anchor text"
                                  />
                                </ListItem>    
                            </List>
                          </div>
                          <Divider className='mt-12'/>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>REPORTING</Typography>
                            <List className='pt-0' >
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Link report after completion"
                                  />
                              </ListItem>
                             
                            </List>
                          </div>
                          <Divider className='mt-12'/>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>PLACEMENT IN</Typography>
                            <div className='flex gap-24'>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Blog</Typography>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Magazines</Typography>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Newspapers</Typography>   
                            </div>
                          </div>
                          <Divider className='mt-12' />
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>METRICS</Typography>
                            <div className='flex justify-between items-center mb-4'>
                              <div className='flex'>
                                <img className='bg-bl-dark-blue rounded-lg w-32 h-32 p-1 mr-3' src='https://assets.app.backlinked.com/dist/assets/metrics/ahrefs.svg' />
                                <div className='flex flex-col items-start'>
                                  <span className='text-sm'>Domain Rating</span>
                                  <span className='text-xs text-gray-500'>ahrefs.com</span>
                                </div>
                              </div>
                                <div><span>Ø 20+</span></div>

                            </div>
                            <div className='flex justify-between items-center mb-4'>
                              <div className='flex'>
                                <img className='bg-bl-dark-blue rounded-lg w-32 h-32 p-1 mr-3' src='https://assets.app.backlinked.com/dist/assets/metrics/moz.svg' />
                                <div className='flex flex-col items-start'>
                                  <span className='text-sm'>Domain Authority</span>
                                  <span className='text-xs text-gray-500'>moz.com</span>
                                </div>
                              </div>
                                <div><span>Ø 20+</span></div>

                            </div>

                          </div>

                        </>
                        }
                        isPopular
                      />
                    </motion.div>
                    <motion.div variants={item}>
                      <SimplePricingCard
                        className="lg:rounded-l-0 border border-slate-600"
                        period={period}
                        title="SKYROCKET!"
                        number="6"
                        subtitle="Perfect for companies wanting advanced tools and support"
                        yearlyPrice="$49"
                        monthlyPrice="$957.00"
                        buttonTitle="Order now"
                        details={
                          <>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>DETAILS</Typography>
                            <List className='pt-0' >
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Incl. text creation (unique content)"
                                  />
                              </ListItem>
                              <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Relevant content according to your specification"
                                  />
                              </ListItem>
                              <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="I100% DoFollow links"
                                  />
                                </ListItem>
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>

                                  </ListItemIcon>
                                  <ListItemText
                                    primary="You choose the anchor text"
                                  />
                                </ListItem>    
                            </List>
                          </div>
                          <Divider className='mt-12'/>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>REPORTING</Typography>
                            <List className='pt-0' >
                                <ListItem className='p-0'>
                                  <ListItemIcon className='min-w-[11%]'>
                                  <FuseSvgIcon className=" text-48" size={24} color="secondary">heroicons-solid:check-circle</FuseSvgIcon>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary="Link report after completion"
                                  />
                              </ListItem>
                             
                            </List>
                          </div>
                          <Divider className='mt-12'/>
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>PLACEMENT IN</Typography>
                            <div className='flex gap-24'>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Blog</Typography>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Magazines</Typography>
                              <Typography className=' text-sm rounded-full p-4 font-semibold' style={{background:"rgb(237 237 237)"}}>Newspapers</Typography>   
                            </div>
                          </div>
                          <Divider className='mt-12' />
                          <div className="mt-12 space-y-8">
                            <Typography className='text-xs font-semibold'>METRICS</Typography>
                            <div className='flex justify-between items-center mb-4'>
                              <div className='flex'>
                                <img className='bg-bl-dark-blue rounded-lg w-32 h-32 p-1 mr-3' src='https://assets.app.backlinked.com/dist/assets/metrics/ahrefs.svg' />
                                <div className='flex flex-col items-start'>
                                  <span className='text-sm'>Domain Rating</span>
                                  <span className='text-xs text-gray-500'>ahrefs.com</span>
                                </div>
                              </div>
                                <div><span>Ø 20+</span></div>

                            </div>
                            <div className='flex justify-between items-center mb-4'>
                              <div className='flex'>
                                <img className='bg-bl-dark-blue rounded-lg w-32 h-32 p-1 mr-3' src='https://assets.app.backlinked.com/dist/assets/metrics/moz.svg' />
                                <div className='flex flex-col items-start'>
                                  <span className='text-sm'>Domain Authority</span>
                                  <span className='text-xs text-gray-500'>moz.com</span>
                                </div>
                              </div>
                                <div><span>Ø 20+</span></div>

                            </div>

                          </div>

                        </>


                        }
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </Paper>
          </div>


        </div>




      </motion.div>

    </>














  );
}

export default SimplePricingPage;
