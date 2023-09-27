import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
function SimplePricingCard(props) {
  const { period, title, yearlyPrice, monthlyPrice, buttonTitle,number, isPopular, details, className } =
    props;

  return (
    <Paper
      className={clsx(
        'flex-col items-center max-w-sm md:max-w-none  p-32 sm:py-48 sm:px-40 lg:rounded-2xl text-left',
        className
      )}
    >


      <div className="flex text-xl font-extrabold tracking-tight leading-tight text-[#1d55c4] align-middle">
        <span className='my-auto'>{title}</span> {isPopular && (
          <div className="flex ms-12 justify-start">
            
            <Chip color="warning" size='small' label="POPULAR" icon={<FuseSvgIcon size={20}>heroicons-solid:star</FuseSvgIcon>} />
          </div>
        )}</div>

      <div className="mt-32 flex justify-start items-baseline whitespace-nowrap">
        <Typography className="text-6xl font-semibold leading-tight tracking-tight">
          {period === 'month' && monthlyPrice}
          {period === 'year' && yearlyPrice}
        </Typography>
        <Typography className="ml-8 text-2xl" color="text.secondary">
          {/* / month */}
        </Typography>
      </div>

      <Typography className="flex flex-col mt-8" color="text.secondary">
        {period === 'month' && (
          <>
            <span>One-time link building, without monthly payment</span>
            <span>
              {/* <b>{yearlyPrice}</b> billed yearly */}
            </span>
          </>
        )}
        {period === 'year' && (
          <>
            <span>billed yearly</span>
            <span>
              <b>{monthlyPrice}</b> billed monthly
            </span>
          </>
        )}
      </Typography>
      <Button
        className="mt-40 "
        size="medium"
        variant={isPopular ? 'contained' : 'contained'}
        color={isPopular ? 'secondary' : 'secondary'}
        style={{ color: 'white', fontWeight: '700' }}
      >
        {buttonTitle}
      </Button>
      <Divider className='mt-16' />
      <div className='flex  mt-32'>
        <Badge color="secondary"className=' my-auto' badgeContent={number}></Badge>

        <Typography className='ms-14 text-xl text-blue-800'>Selllinks</Typography>
      </div>
      <Divider className='mt-32' />
      {details}




    </Paper>
  );
}

SimplePricingCard.defaultProps = {
  period: '',
  title: '',
  yearlyPrice: '',
  monthlyPrice: '',
  buttonTitle: '',
  isPopular: false,
  details: '',
};

export default SimplePricingCard;
