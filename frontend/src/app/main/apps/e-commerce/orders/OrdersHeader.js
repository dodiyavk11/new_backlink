import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectOrdersSearchText, setOrdersSearchText } from '../store/ordersSlice';

function OrdersHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(selectOrdersSearchText);

  return (
    <div className="flex w-full max-w-[calc(1240px+2.5rem)]  px-10 pt-14 mx-auto ">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-3xl font-bold text-[#354252] tracking-tight leading-8"
      >
      Link bundles
      </Typography>
    </div>
  );
}

export default OrdersHeader;
