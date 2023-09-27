import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import { getFaqs, selectGroupedFaqs } from '../store/faqsSlice';
import { getFaqCategories } from '../store/faqCategoriesSlice';
import FaqList from './FaqList';

function HelpCenterFaqs() {
  const dispatch = useDispatch();
  const groupedFaqs = useSelector(selectGroupedFaqs);

  useEffect(() => {
    dispatch(getFaqs());
    dispatch(getFaqCategories());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center p-24 sm:p-40">
      <div className="flex flex-col w-full max-w-4xl">
        <div className="sm:mt-32">
          <Button
            component={Link}
            to={-1}
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
          >
            Back to Help Center
          </Button>
        </div>
        

       
      </div>
    </div>
  );
}

export default HelpCenterFaqs;
