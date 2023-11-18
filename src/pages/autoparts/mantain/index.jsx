


import { PrinterOutlined, PlusOutlined } from '@ant-design/icons';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Input, Typography, Form, Tabs, Card, Modal, Select, Alert, Badge, notification, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import { useDispatch } from 'react-redux';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from './utils/productxlscolumns';
import getXLSData from './utils/productxlsdata';
const FormItem = Form.Item;
import stockcolumns from '../utils/stockcolumns';
import categories from '../utils/categories';

import { deleteProduct,addNewStock } from '@/services/product';


const { Search } = Input;
const { TabPane } = Tabs;
const { Text } = Typography;

const AutoPartsListing = (props) => {
  const { products = [], stocks = [], fetching } = props;
  const [sorter, setSorter] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [visibleDeleteProduct, setVisibleDeleteProduct] = useState(false);
  const [product, setProduct] = useState({});
  const [lastdata, setLastdata] = useState([]);
  const [productName, setProductName] = useState('');
  const [updateStock, setUpdateStock] = useState(false)
  const [loadingProductDeletion, setLoadingProductDeletion] = useState(false);
  const [formVals, setFormVals] = useState({})

  const actionRef = useRef();

  const addProduct = () => {
    history.push('/product/create');
  }

  const addStock = async () => {
    let form = Form.useForm();
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    if (formVals.quantity && formVals.sellprice) {
      addNewStock({
        availablequantity: formVals.availablequantity,
        quantity: formVals.quantity,
        sellprice: formVals.sellprice,
        applyPriceToAllProducts:formVals.applyPriceToAllProducts,
        sucursalId: currentUser.sucursalId,
        createdBy: currentUser.id,
        activatedBy: ccurrentUser.id,
        type: 'ENTRANCE',
        product: {
          id: product.id,
          name: product.name,
          images: product.filenames
        }

      }).then(data=>{
        dispatch({
          type: 'product/fetchStocks',
          payload:{
          sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7'
          }
        });
        setUpdateStock(false);
      })
      .catch(err => {
        notification.error({
          description: formatMessage({ id: 'error.processing.request.description' }),
          message: formatMessage({ id: 'error.processing.request.title' }),
        });
      });
    }
  }

  const callback = (key) => {

  }

  const [form2] = Form.useForm();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }

  }

  const handleCancelvisibleDeleteProduct = async () => setVisibleDeleteProduct(false);

  const productcolumns = [
    {
      title: formatMessage({ id: 'product.image' }),
      dataIndex: 'filenames',
      valueType: 'text',
      render: (text) => <img style={{ width: '60px', height: '60px', 'vertical-align': 'middle', 'opacity': '0.9' }} alt="Image" src={text[0]} />,
    },


    {
      title: formatMessage({ id: 'product.name' }),
      dataIndex: 'name',
      valueType: 'text',
      render: (text) => <a href='/product/view'>{text}</a>,
    },

    {
      title: formatMessage({ id: 'product.featured' }),
      dataIndex: 'featured',
      valueType: 'text',
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },

    {
      title: formatMessage({ id: 'product.specialoffer' }),
      dataIndex: 'specialOffer',
      valueType: 'text',
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },

    {
      title: formatMessage({ id: 'product.category' }),
      dataIndex: 'category',
      valueType: 'text',
      render: (_, record) => <div>{record.category.name}</div>,
    },

    {
      title: formatMessage({ id: 'product.subcategory' }),
      dataIndex: 'subcategory',
      valueType: 'text',
      render: (_, record) => <div>{record.subcategory.name}</div>,
    },
    {
      title: formatMessage({ id: 'product.availablequantity' }),
      dataIndex: 'availablequantity',
      render: (_, record) => <div>{record.availablequantity === record.alertquantity ? <Badge color='red' text={`${record.availablequantity}`} /> : <Badge color='green' text={`${record.availablequantity} `} />}</div>

    },
    {
      title: formatMessage({ id: 'product.price' }),
      dataIndex: 'sellprice',
      sorter: true,
      hideInForm: true,
      render: (val) => val == null ? ` - ` : `${val} MZN`,
    },

    {
      title: formatMessage({ id: 'promotional.price' }),
      dataIndex: 'promotionalprice',
      valueType: 'text',
      render: (text) => <div>{text == null ? 0 : text} MZN</div>,
    },

    {
      title: formatMessage({ id: 'operations' }),
      dataIndex: 'option',
      key: 'operation',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => (
        <>

          <a onClick={() => {
            dispatch({
              type: 'product/setCurrentProduct',
              payload: record,
            });

            history.push('/product/edit');

          }}>
            {<EditTwoTone style={{ fontSize: '20px', color: '#1890ff' }} />}

          </a>

          <a style={{ 'margin-left': '20px' }} onClick={() => {
            setVisibleDeleteProduct(true);
            setProduct(record);
          }}>
            {<DeleteTwoTone twoToneColor="#FC550B" style={{ fontSize: '20px' }} />}

          </a>
        </>
      ),
    },
  ];

  const confirmvisibleDeleteProduct = async () => {
    setLoadingProductDeletion(true);
    await deleteProduct(product)
      .then(data => {
        dispatch({
          type: 'product/fetchAll',
          payload: {
            sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7'
          }
        });
        setVisibleDeleteProduct(false);
        setLoadingProductDeletion(false);
      })
      .catch(err => {
        notification.error({
          description: formatMessage({ id: 'error.processing.request.description' }),
          message: formatMessage({ id: 'error.processing.request.title' }),
        });
      });

  }

  useEffect(() => {

  }, []);

  return (
    <Card title={<span>
      <div style={{ 'margin-left': '0px' }}>
        <Search enterButton name='namesearch'
          placeholder={formatMessage({ id: 'product.search' })}
          onChange={(evt) => {
            let s = products.filter(d => d.name.toLowerCase().indexOf(evt.target.value.toLowerCase()) > -1);
            setLastdata(s);
          }}
          onSearch={(value) => {
            let s = products.filter(d => d.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
            setLastdata(s);
          }}
          style={{ width: '60%' }}
        />
        <Select placeholder={formatMessage({ id: 'search.bycategory' })}

          onChange={(categoryid) => {
            let s = products.filter(d => d.categoryid == categoryid);
            setLastdata(s);
          }}

          style={{ 'margin-left': '10px' }}>
          {
            categories.length != 0 ? categories.map((u) =>
              <Option value={u.id}>{u.name}</Option>
            ) : null

          }

        </Select></div>
    </span>} extra={<span>
      <>
        <Button size='middle' type='primary' icon={<PlusOutlined />} onClick={addProduct}>  {formatMessage({ id: 'product.add' })}</Button>
        <Button size='middle' type='primary' onClick={() => {
          setUpdateStock(true)
        }} style={{ 'margin-left': '10px' }}> <PlusOutlined /> {formatMessage({ id: 'stock.add' })}</Button>
        <Button size='middle' onClick={() => { history.push('/report') }} style={{ 'margin-left': '10px' }}> <PrinterOutlined /> {formatMessage({ id: 'product.print' })}</Button>
        <ExportXLS dataset={getXLSData(lastdata.length == 0 ? products : lastdata)} sheetName={formatMessage({ id: 'product.list' })} collumns={getXLSColumns(productcolumns)} />

      </>
    </span>} bordered={false}  >

      <Tabs animated defaultActiveKey="1" onChange={callback}>
        <TabPane tab={formatMessage({ id: 'product.list' })} key="1" style={{ marginButton: 20 }} >
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

            dataSource={lastdata.length == 0 ? products : lastdata}
            columns={productcolumns}
            rowSelection={{}}
          />


          <Modal
            open={visibleDeleteProduct}
            title={<Alert message={formatMessage({ id: 'delete.product.question' })} description={formatMessage({ id: 'delete.product.warning' })} type="error" showIcon />}
            footer={[
              <Button key="back" onClick={handleCancelvisibleDeleteProduct}>
                {formatMessage({ id: 'global.cancel' })}
              </Button>,
              <Button key="submit" type="danger" disabled={!product.name || productName.toLowerCase() != product.name.toLowerCase()} loading={loadingProductDeletion} onClick={confirmvisibleDeleteProduct}>
                {formatMessage({ id: 'product.remove' })}
              </Button>,
            ]}
            closable={false}
            onCancel={handleCancelvisibleDeleteProduct}
          >
            <Form {...layout} form={form2}>
              <Text type="secondary" > {formatMessage({ id: 'confirm.product.delection' })}</Text>
              <FormItem

                label={formatMessage({ id: 'product.name' })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'error.product.name.required' }),
                  },

                ]}
              >
                <Input
                  name="name"
                  autoComplete='off'
                  onChange={(ev) => {

                    setProductName(ev.target.value);
                  }}
                  placeholder={product.name}
                />
              </FormItem></Form>
          </Modal>


        </TabPane>
        <TabPane tab={formatMessage({ id: 'stock.history' })} key="2">


          <Table
            actionRef={actionRef}
            rowKey="id"
            onChange={(_, _filter, _sorter) => {
              const sorterResult = _sorter;
              if (sorterResult.field) {
                setSorter(`${sorterResult.field}_${sorterResult.order}`);
              }
            }}
            params={{
              sorter,
            }}

            dataSource={stocks}
            columns={stockcolumns}
            rowSelection={{}}
          />

          <Modal
            open={updateStock}
            title={formatMessage({ id: 'stock.update' })}
            footer={[
              <Button key="back" onClick={setUpdateStock(false)}>
                {formatMessage({ id: 'global.cancel' })}
              </Button>,
              <Button key="submit" type="primary" onClick={addStock} >
                {formatMessage({ id: 'stock.add' })}
              </Button>,
            ]}
            closable={false}
            onCancel={setUpdateStock(false)}
          >
            <Form {...layout} form={form2}>
              <Descriptions title={formatMessage({ id: 'product.data' })} column={2} >
                <Descriptions.Item label={formatMessage({ id: 'product.name' })}>{product.name}</Descriptions.Item>
              </Descriptions>
              <FormItem name="quantity" label={formatMessage({ id: 'stock.quantity' })}
                rules={[
                  {
                    required: false,
                    message: formatMessage({ id: 'stock.quantity.required' }),
                  },
                ]}
              >

                <Input
                  placeholder={formatMessage({ id: 'stock.quantity' })}
                  type='number'
                />

              </FormItem>

              <FormItem name="sellprice" label={formatMessage({ id: 'product.price' })}
                rules={[
                  {
                    required: false,
                    message: formatMessage({ id: 'error.product.price.required' }),
                  },
                ]}
              >
                <Input suffix="MZN"
                  type='number'
                />

              </FormItem></Form>
          </Modal>
        </TabPane>
      </Tabs></Card>
  );
};

export default connect(({ user, product, loading }) => ({
  currentUser: user.currentUser,
  products: product.products,
}))(AutoPartsListing);
