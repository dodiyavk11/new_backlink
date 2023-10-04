import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'app/store/userSlice';
import { getProjects, selectProjects } from './store/projectsSlice';
import { motion } from 'framer-motion';

function ProjectDashboardAppHeader(props) {

  return (
    <div className="flex w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto ">
    <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 pl-0 md:pb-0" style={{paddingLeft:'0px'}}>
      <div className="flex flex-col flex-auto">
        <Typography  component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300} className="text-3xl font-semibold tracking-tight leading-8">
          Projects
        </Typography>
        
      </div>
     
    </div>
  </div>
  );
}

export default ProjectDashboardAppHeader;
