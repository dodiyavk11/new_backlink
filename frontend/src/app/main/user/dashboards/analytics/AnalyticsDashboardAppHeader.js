import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';

function AnalyticsDashboardAppHeader(props) {
  return (
    <div className="flex w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto ">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 pl-0 md:pb-0" style={{paddingLeft:'0px'}}>
        <div className="flex flex-col flex-auto">
          <Typography  component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300} className="text-3xl text-[#354252] font-bold tracking-tight leading-8">
            Dashboard(U)
          </Typography>
          
        </div>
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
          {/* <Button
            className="whitespace-nowrap"
            startIcon={<FuseSvgIcon size={20}>heroicons-solid:cog</FuseSvgIcon>}
          >
            Settings
          </Button>
          <Button
            className="whitespace-nowrap"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon size={20}>heroicons-solid:save</FuseSvgIcon>}
          >
            Export
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboardAppHeader;
