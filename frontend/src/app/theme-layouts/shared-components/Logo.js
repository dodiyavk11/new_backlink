import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <img className="logo-icon w-32 h-32" src="assets/images/logo/link_6994770.png" alt="logo" />

      <div
        className="badge flex items-center py-4 px-8 mx-8 rounded"
        style={{ backgroundColor: '#121212', color: '#61DAFB' }}
      >
       
        <span className="react-text text-12 mx-4">Selllinked</span>
      </div>
    </Root>
  );
}

export default Logo;
