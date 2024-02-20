import { PlusOutlined } from '@ant-design/icons';
import { Button, Card,Badge,Divider,Typography,Table} from 'antd';
import React, { useState, useRef ,useEffect}   from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import moment from 'moment';
import {useDispatch} from  'react-redux';
import  InativatePromotion from './components/inativatepromotionmodal';
import { inativatePromotion } from '../../../services/promotion';


const { Text } = Typography;
const PromotionList = (props) => {
  const { promos = [],currentUser={}, fetching } = props;
  const [sorter, setSorter] = useState('');
  const history = useHistory();
  const [visible,setVisible]= useState(false);
  const [promotion, setPromotion] = useState({});
  const dispatch = useDispatch();
  const [loadingPromotionInativatio,setLoadingPromotionInativatio]= useState(false);

  const actionRef = useRef();

  const handleCancelvisibleDeleteProduct = async () => setVisible(false);

  const addPromotion=()=>{
    history.push('/promotion/create');
  }

  const productcolumns = [
    
    {
      title: formatMessage({ id: 'product.name'}),
      dataIndex: 'name',
      valueType: 'text',
      render:(text)=><div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'promotion.previous.price'}),
      dataIndex: 'sellprice',
      valueType: 'text',
      render:(text)=><div>{text} MZN</div>,
    },

    {
      title: formatMessage({ id: 'promotion.promotional.price'}),
      dataIndex: 'promotionalprice',
      valueType: 'text',
      render:(text)=><div>{text} MZN</div>,
    },

    {
      title: formatMessage({ id: 'promotion.discount'}),
      dataIndex: 'discount',
      valueType: 'text',
      render:(text)=><div>{text} MZN</div>,
    },
   
  ];


  const columns = [
    
      {
        title: formatMessage({ id: 'promotion.description'}),
        dataIndex: 'description',
        valueType: 'text',
        render:(text)=><Text strong>{text}</Text>,
      },
  
      {
        title: formatMessage({ id: 'promotion.startdate'}),
        dataIndex: 'startdate',
        valueType: 'text',
        render:(text)=><div>{moment(new Date(text)).format('DD-MM-YYYY HH:mm')}</div>,
      },

      {
        title: formatMessage({ id: 'promotion.enddate'}),
        dataIndex: 'enddate',
        valueType: 'text',
        render:(text)=><div>{moment(new Date(text)).format('DD-MM-YYYY HH:mm')}</div>,
      },

      {
        title: formatMessage({ id: 'promotion.percentage'}),
        dataIndex: 'percentage',
        valueType: 'text',
        render:(text)=><div>{text} %</div>,
      },
      {
        title: formatMessage({ id: 'promotion.all.products'}),
        dataIndex: 'applytoall',
      render:(_,record)=><div>{record.applytoall?formatMessage({ id: 'global.yes'}):formatMessage({ id: 'global.no'}) }</div>
    
      },

      {
        title: formatMessage({ id: 'global.active'}),
        dataIndex: 'active',
      render:(_,record)=><div>{record.active && record.active =='1'?<Badge color='green' text= {formatMessage({ id: 'global.yes'})}  /> :<Badge color='red' text= {formatMessage({ id: 'global.no'})}  /> }</div>
    
      },
  
      {
        title: formatMessage({ id: 'operations'}),
        dataIndex: 'option',
        key: 'operation',
        valueType: 'option',
        fixed: 'right',
        render: (_, record) => (
       
        <>
        <Divider type="vertical" />
            <Button type='primary' size='small'
            disabled={ !(record.active && record.active =='1')}
              onClick={() => {
                setVisible(true);
                setPromotion(record)
              }}
            >{formatMessage({ id: 'global.inativate'})}</Button>
            </>
        ),
      },
    ];

    const confirmvisibleDeleteProduct=()=>{
        setLoadingPromotionInativatio(true);
        inativatePromotion(promotion).then( data => {
          setVisible(false);
          setLoadingPromotionInativatio(false);
          dispatch({
            type: 'promotion/fetch',
            payload: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
          });
        });
      
    }
  

  useEffect(() => {
    dispatch({
      type: 'promotion/fetch',
      payload: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
    });
    

    },[]);
  return (
     <Card extra={<span>
      <>
       <Button size='middle' type='primary' onClick={addPromotion}> <PlusOutlined /> {formatMessage({ id: 'promotion.add'})}</Button>
      
        </>
     </span>} bordered={false}  >

      <Table
      size='middle'
        actionRef={actionRef}
        rowKey="id"
        loading={fetching}
        search={false}
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}

        params={{
          sorter,
        }}

        expandable={{
          expandedRowRender: (record) => {
            return <Table columns={productcolumns} dataSource={record.products} pagination={false} />;  
            },
          rowExpandable: record => !record.applytoall,
        }}
    
        dataSource={promos}
        columns={columns}
      
      />

      <InativatePromotion handleCancelvisibleDeleteProduct ={handleCancelvisibleDeleteProduct} 
      confirmvisibleDeleteProduct={confirmvisibleDeleteProduct} 
       loadingPromotionInativatio={loadingPromotionInativatio} 
       visible={visible} 
      />

</Card>
  );
};

export default connect(({ promotion, loading,user }) => ({
  promos: promotion.promotions,
  currentUser:user.currentUser,
  fetching: loading.effects['promotion/fetch'],
}))(PromotionList);

