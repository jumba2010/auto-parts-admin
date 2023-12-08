import { formatMessage } from 'umi-plugin-react/locale';
import {Typography,Badge} from 'antd';
import moment from 'moment';
const { Text, Link } = Typography;

const stockcolumns = [
  
    {
      title: formatMessage({ id: 'stock.product'}),
      dataIndex: 'product',
      render:(_,record)=><Text strong>{record.product.name}</Text>,
    },

    {
      title: formatMessage({ id: 'stock.price'}),
      dataIndex: 'sellprice',
      render:(_,record)=><div>{record.sellprice} MZN </div>,
      sorter: true,

    },

    {
      title: formatMessage({ id: 'stock.date'}),
      dataIndex: 'createdAt',
      sorter: true,
      hideInForm: true,
      render:(_,record)=><div>{moment(record.createdAt).format('DD-MM-YYYY')}</div>
    },
    
    {
      title: formatMessage({ id: 'stock.quantity'}),
      dataIndex: 'quantity',
      sorter: true,
      hideInForm: true,
      render: (val) => val==0?` `:`${val}`,
    },

    {
      title: formatMessage({ id: 'stock.available'}),
      dataIndex: 'availablequantity',
      render:(_,record)=><div>{record.availablequantity} </div>
  
    },
  
       {
      title: formatMessage({ id: 'stock.sold.quantity'}),
      dataIndex: 'soldQuantity',
      render:(_,record)=><div>{record.soldQuantity}  </div>
  
    },
   


  ];

  export default stockcolumns;
