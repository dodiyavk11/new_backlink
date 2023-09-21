import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import HomeTab from './tabs/home/HomeTab';
import TeamTab from './tabs/team/TeamTab';
import BudgetTab from './tabs/budget/BudgetTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
  
  },
}));

function ProjectDashboardApp(props) {
  

  return (
    <Root
      header={<ProjectDashboardAppHeader />}
      content={
        <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
         
        </div>
      }
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
