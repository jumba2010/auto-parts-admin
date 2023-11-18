import { PrinterOutlined } from '@ant-design/icons';
import { Button,message,Form,Select,Card,Tabs} from 'antd';
import React, { useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import {dates} from './../../../utils/DateTimeUtils';
import paymentstatus from './../../../utils/paymentstatus';
import { connect } from 'dva';
import {useDispatch} from  'react-redux';
import ConfirmPaymentModal from './component/confirmpayment';
import RefundPaymentModal from './component/refundpayment';
import RefundList from './component/refundlist';
import PaymentList from './component/paymentlist';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from '../mantain/utils/paymentxlscolumns';      
import getXLSData from '../mantain/utils/paymentxlsdata';
import expandedRowRender from '@/components/Product/productitems';
import { confirmPayment,refundPayment } from '@/services/sale';
import { paymentMethods } from './utils/PaymentUtils';
const { TabPane } = Tabs;

const ListSales = (props) => {
  const {refundedlist = [], sales = [],fetching } = props;
  const [sorter, setSorter] = useState('');
  const [visibleConfirm,setVisibleConfirm]= useState(false);
  const [visibleRefund,setVisibleRefund]= useState(false);
  const [sale, setSale] = useState({});
  const [paymentType,setPaymentType]=useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const dispatch = useDispatch();
  const [lastdata, setLastdata] = useState([]);

  const [form2] = Form.useForm();
  const [form] = Form.useForm();


  const columns = [
    {
      title: formatMessage({ id: 'order.id'}),
      dataIndex: 'id',
      valueType: 'text',
    },
  
      {
        title: formatMessage({ id: 'order.client'}),
        dataIndex: 'client',
        valueType: 'text',
        render:(text)=><div>{text.name}</div>,
      },
  
      {
        title: formatMessage({ id: 'order.status'}),
        dataIndex: 'payment',
        width:40,
        valueType: 'text',
        render:(text)=> <Badge status={getBadge(text.status)} text={getStatus(text.status)} />,
      },
  
      {
        title: formatMessage({ id: 'order.items'}),
        dataIndex: 'itemsCount',
        valueType: 'text',
        render:(text)=><div>{text}</div>,
      },
  
      {
        title: formatMessage({ id: 'order.total'}),
        dataIndex: 'total',
        valueType: 'text',
        render:(text)=><div>{text} MZN</div>,
      },
  
      {
        title: formatMessage({ id: 'payment.date'}),
        dataIndex: 'payment',
        valueType: 'text',
        render:(text)=><div>{text?moment((new Date(parseInt(parseInt(text.date))))).format('DD-MM-YYYY HH:mm'):''}</div>,
      },
  
    ];

  const handleSearchByDates = (dateEnum) => {
    dispatch({
      type: 'order/fetchOrders',
      payload:{
      sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7',
      dateEnum
      }
    });
  }

    const confirm = async () => {
      const fieldsValue = await form.validateFields();
      const {payment} = sale;
      payment.status='CONFIRMED';
      payment.date=new Date().toISOString()
      confirmPayment(sale,{
        remarks:fieldsValue.remarks,
        payment
      })
      .then( data  => {
        dispatch({
          type: 'order/fetchOrders',
          payload:{
          sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7',
          dateEnum:'TODAY'
          }
        });
        form.resetFields();
        setVisibleConfirm(false);
      });
     
    }

    const refund=async ()=>{
      const fieldsValue = await form2.validateFields();
      const {payment} = sale;
      payment.status='REFUNDED';
      payment.refundedAt=new Date().toISOString();
      refundPayment(sale,{
        remarks:fieldsValue.remarks,
        payment
      })
      .then( data  => {
        dispatch({
          type: 'sale/fetchRefundedPayments',
          payload:{
          sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7',
          dateEnum:'THIS_MONTH'
          }
        });
        setVisibleRefund(false);
      });
      
    }

  
  return (
     <Card 
     title={<span>
      <div style={{'margin-left':'0px'}}>
    <Select
    labelInValue
    defaultValue={{ key: '1' ,value:formatMessage({ id: 'dates.today'})}}
    style={{ 'margin-left': '0px','width':'35%'}}
    onChange={handleSearchByDates}
  >
{dates.map((d)=> <Option value={d.key}>{d.des}</Option>)}

  </Select>
    <Select  placeholder={formatMessage({ id: 'search.by.status'})} 
   mode="multiple"
      onChange={(statuscodes) =>{
        setSelectedKeys(statuscodes);
        if(statuscodes.length===0){
          setLastdata([]);
        }
        else{
          let s=sales.filter(d=>statuscodes.includes(d.status));
          setLastdata(s);
        }
      }}

    style={{ 'margin-left': '10px','width':'45%' }}>       
    {
                paymentstatus.length!=0?paymentstatus.map((u)=>
              <Option value={u.code}>{u.des}</Option>
                ):null

              }

</Select>

</div>
     </span>} 
     
     extra={<span>
      <>
  <Button size='middle' style={{'margin-left':'10px'}}> <PrinterOutlined /> {formatMessage({ id: 'product.print'})}</Button>
  <ExportXLS dataset={getXLSData(sales)} sheetName={formatMessage({ id: 'sale.list'})} collumns={getXLSColumns(columns)} />
      
        </>
     </span>} bordered={false}  >
     <Tabs defaultActiveKey="1" type="card">
    <TabPane tab={formatMessage({ id: 'sale.list'})} key="1" style={{ marginButton: 20 }} >

   <PaymentList sorter={sorter} setVisibleRefund={setVisibleRefund} selectedKeys={selectedKeys} fetching={selectedKeys} 
   setVisibleConfirm={setVisibleConfirm} 
   sales={sales} lastdata={lastdata} setSale={setSale}
   expandedRowRender={expandedRowRender}/>
</TabPane>

<TabPane tab={formatMessage({ id: 'sale.payout.list'})} key="2" style={{ marginButton: 20 }} >
<RefundList sorter={sorter} refundedlist={refundedlist} expandedRowRender={expandedRowRender}/>
</TabPane>

</Tabs>

<ConfirmPaymentModal form={form} visible={visibleConfirm} onClickBack={()=>setVisibleConfirm(false)} 
confirmPayment={confirm} paymentMethod={paymentMethods.filter(p => p.code ===sale.payment.method)[0]} />
<RefundPaymentModal form={form2} visible={visibleRefund} onClickBack={()=>setVisibleRefund(false)} 
refundPayment={refund} />
</Card>
  );
};

export default  connect(({ sale,order, loading }) => ({
  sales: order.orders,
  refundedlist: sale.refundedlist,
  fetching: loading.models.sale,
}))(ListSales);
