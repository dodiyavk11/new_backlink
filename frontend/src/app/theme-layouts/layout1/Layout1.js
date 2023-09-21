import FuseDialog from '@fuse/core/FuseDialog';
import { styled } from '@mui/material/styles';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseSuspense from '@fuse/core/FuseSuspense';
import AppContext from 'app/AppContext';
import { memo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import FooterLayout1 from './components/FooterLayout1';
import LeftSideLayout1 from './components/LeftSideLayout1';
import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import RightSideLayout1 from './components/RightSideLayout1';
import ToolbarLayout1 from './components/ToolbarLayout1';
import SettingsPanel from '../shared-components/SettingsPanel';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme, config }) => ({
  ...(config.mode === 'boxed' && {
    clipPath: 'inset(0)',
    maxWidth: `${config.containerWidth}px`,
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  ...(config.mode === 'container' && {
    '& .container': {
      maxWidth: `${config.containerWidth}px`,
      width: '100%',
      margin: '0 auto',
    },
  }),
}));

function Layout1(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  return (
    <Root id="fuse-layout" config={config} className="w-full flex">
      {config.leftSidePanel.display && <LeftSideLayout1 />}

      <div className="flex flex-auto min-w-0">
        {config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout1 />}

        <main id="fuse-main" className="flex flex-col flex-auto min-h-full min-w-0 relative z-10">
          {config.toolbar.display && (
            <ToolbarLayout1 className={config.toolbar.style === 'fixed' && 'sticky top-0'} />
          )}

          <div className="sticky top-0 z-99">
            <SettingsPanel />
          </div>

          <div className="flex flex-col flex-auto min-h-0 relative z-10">
            <FuseDialog />

            <FuseSuspense>{useRoutes(routes)}</FuseSuspense>

            {props.children}
          </div>

          {/* {config.footer.display && (
            <FooterLayout1 className="sadd" />
          )} */}
          <footer className='flex w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto  sm:flex-col sm:p-6 sm:gap-3 mb-[50px]'>
            <div className='grid gap-x-8 w-full gap-y-4 grid-cols-2  '>
              <div className='flex gap-32 '><Typography className='text-[#6B7280] text-12px'>Terms of service</Typography>
                <Typography className='text-[#6B7280] text-12px'>Privacy Policy</Typography>
                <Typography className='text-[#6B7280] text-12px'>Imprint</Typography>
              </div>

              <div className='flex justify-end '>
                <Typography className='text-[#6B7280] text-12px'>© Backlinked 2023</Typography>
              </div>

            </div>
          </footer>
        </main>

        {config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout1 />}
      </div>

      {config.rightSidePanel.display && <RightSideLayout1 />}
      <FuseMessage />
    </Root>
  );
}

export default memo(Layout1);
