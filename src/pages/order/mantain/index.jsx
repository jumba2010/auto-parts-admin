import { PrinterOutlined } from '@ant-design/icons';
import { Button, Avatar, message, Form, Select,Tooltip, Card, Badge, Typography, Table } from 'antd';
import React, { useState, useRef } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { useDispatch } from 'react-redux';
import { UserOutlined,EditTwoTone } from '@ant-design/icons';
import getBadge from './utils/badje';
import getStatus from './utils/status'
import moment from 'moment';
import {dates} from '../../../utils/DateTimeUtils';
import filteredorderstatus from './utils/filteredorderstatus'
import orderstatus from './../../../utils/orderstatus';
import ConfirmOrder from './components/confirmorder';
import CancelOrder from './components/cancelorder';
import expandedRowRender from '@/components/Product/productitems';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from '../mantain/utils/orderxlscolumns';      
import getXLSData from '../mantain/utils/orderxlsdata';
import { connect } from 'dva';
import { updateOrder } from '@/services/order';


const { Text } = Typography;
const ListOrders = (props) => {
  const { orders = [] } = props;
  const [order, setOrder] = useState({});
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [lastdata, setLastdata] = useState([]);
  const [filterstatus, setFilterStatus] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [sorter, setSorter] = useState('');
  const dispatch = useDispatch();

  const actionRef = useRef();
  const [form2] = Form.useForm();
  const [form] = Form.useForm();

  const columns = [

    {
      title: formatMessage({ id: 'order.id' }),
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: formatMessage({ id: 'order.client.image' }),
      dataIndex: 'imageURL',
      valueType: 'text',
      render: (text) => <a>{text ? <image src={text} /> : <Avatar size={40} icon={<UserOutlined />} />}</a>,
    },
    {
      title: formatMessage({ id: 'order.client' }),
      dataIndex: 'client',
      valueType: 'text',
      render: (text) => <Text strong >{text.name}</Text>,
    },


    {
      title: formatMessage({ id: 'order.status' }),
      dataIndex: 'status',
      width: 40,
      valueType: 'text',
      render: (text) =><div> <Badge status={getBadge(text.status)} text={getStatus(text.status)} /></div>,
    },

    {
      title: formatMessage({ id: 'order.items' }),
      dataIndex: 'itemsCount',
      valueType: 'text',
      render: (text) => <div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'order.total' }),
      dataIndex: 'total',
      valueType: 'text',
      render: (text) => <div>{text} MZN</div>,
    },

    {
      title: formatMessage({ id: 'order.remarks' }),
      dataIndex: 'remarks',
    },

    {
      title: formatMessage({ id: 'order.updatedAt' }),
      dataIndex: 'updatedAt',
      valueType: 'text',
      render: (text) => <div>{moment((new Date(parseInt(text)))).format('DD-MM-YYYY HH:mm')}</div>,
    },

    {
      title: formatMessage({ id: 'operations' }),
      dataIndex: 'option',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>



      <Tooltip placement="top" title= {formatMessage({ id: 'order.update.status' })}>
      <a onClick={() => {
            setVisibleConfirm(true);
            setOrder(record);
            let list = filteredorderstatus(record.status.status, orderstatus);
            setFilterStatus(list);
          }}>
      {<EditTwoTone  style={{ fontSize: '20px', color: '#1890ff' }}/>}

      </a>
      </Tooltip>
        </>
      ),
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

  const handleSelectStatus = (status) => {
    //This does not do anything anyway. 
    //The curent status selected is obtained from the form
  }

  const confirmOrder = async () => {

    const fieldsValue = await form.validateFields();
    let status = orderstatus.filter((s) => s.code === fieldsValue.orderStatus)[0];
    updateOrder(order,{ status:{code: status.code, description: status.des},remarks: fieldsValue.remarks })
    .then( data => {
      setVisibleConfirm(false);  
      dispatch({
        type: 'order/fetchOrders',
        payload:{
        sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7',
        dateEnum:'TODAY'
        }
      });

      form2.resetFields();
    })

    

  }

  const cancelOrder = async () => {

    const fieldsValue = await form2.validateFields();
    let status = orderstatus.filter((s) => s.code === 'CANCELED')[0];
    updateOrder(order,{ status:{code: status.code, description: status.des},remarks: fieldsValue.remarks })
    .then( data => {
      setVisibleCancel(false);
      dispatch({
        type: 'order/fetchOrders',
        payload:{
        sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7',
        dateEnum:'TODAY'
        }
      });

      form2.resetFields();
    })
    
  }

  return (

      <Card

        title={<span>
          <div style={{ 'margin-left': '0px' }}>
            <Select
              labelInValue
              defaultValue={{ key: 'TODAY', value: formatMessage({ id: 'dates.today' }) }}
              style={{ 'margin-left': '0px', 'width': '35%' }}
              onChange={handleSearchByDates}

            >
              {dates.map((d) => <Option value={d.key}>{d.des}</Option>)}

            </Select>
            <Select placeholder={formatMessage({ id: 'search.by.status' })}
              mode="multiple"
              onChange={(statuscodes) => {

                setSelectedKeys(statuscodes)
                if (statuscodes.length === 0) {
                  setLastdata([]);
                }

                else {
                  let s = orders.filter(d => statuscodes.includes(d.status.code));
                  setLastdata(s);
                }

              }}

              style={{ 'margin-left': '10px', 'width': '45%' }}>
              {
                orderstatus.length != 0 ? orderstatus.map((u) =>
                  <Option value={u.code}>{u.des}</Option>
                ) : null

              }

            </Select>

          </div>
        </span>}

        extra={<span>
          <>
            <Button size='middle' style={{ 'margin-left': '10px' }}> <PrinterOutlined /> {formatMessage({ id: 'product.print' })}</Button>
            <ExportXLS dataset={getXLSData(selectedKeys.length === 0 ? orders : lastdata)} sheetName={formatMessage({ id: 'menu.orders'})} collumns={getXLSColumns(columns)} />
          </>
        </span>} bordered={false}  >

        <Table
          size='middle'
          actionRef={actionRef}
          rowKey="id"
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
          expandedRowRender={expandedRowRender}

          dataSource={selectedKeys.length === 0 ? orders : lastdata}
          columns={columns}

        />
        <ConfirmOrder form={form} canceled={canceled} orderstatus={filterstatus} visible={visibleConfirm} onClickBack={() => setVisibleConfirm(false)}
          confirmOrder={confirmOrder} handleSelectStatus={handleSelectStatus} />

        <CancelOrder form={form2} visible={visibleCancel} onClickBack={() => setVisibleCancel(false)}
          cancelOrder={cancelOrder} />

      </Card>
  );
};

export default connect(({ order }) => ({
  orders: order.orders,
}))(ListOrders);
