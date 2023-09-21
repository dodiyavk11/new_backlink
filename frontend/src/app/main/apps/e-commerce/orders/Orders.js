import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
function Orders() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageSimple
      header={<OrdersHeader />}
      content={<>

        <motion.div initial={{ y: -30 }}
          animate={{ y: 0, transition: { delay: 0.2 } }}
          delay={300} className="w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto" >

          <div className="grid grid-cols-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
            <div className="col-span-6 gap-6 sm:gap-32" style={{ display: "grid" }}>
              <Paper className="flex flex-col bg-white shadow-sm mt-6 rounded-lg overflow-hidden">
                <div className=" p-28 items-center justify-between space-x-4 divide-x">
                  <div className="p-12 pb-16 ">
                    <h2 className="text-3xl font-extrabold text-[#354252] tracking-tight leading-6 truncate"> Ultimate link building starting at 347 Euro</h2>
                    <img src="https://assets.app.backlinked.com/dist/assets/products/packages.png" class="float-right w-[30%] ml-4 mb-4"></img>
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

            </div>

          </div>




        </motion.div>


      </>}

    />
  );
}

export default withReducer('eCommerceApp', reducer)(Orders);
