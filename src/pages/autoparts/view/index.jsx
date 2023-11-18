import React, { useState, useEffect } from 'react';
import { Form, Button, Upload, Checkbox, Row, Col, Divider, Statistic, Modal, Descriptions, Card, Table, Steps } from 'antd';
const FormItem = Form.Item;
import { formatMessage } from 'umi-plugin-react/locale';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';

const tailLayout = {
  wrapperCol: { offset: 7, span: 16 },
};


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ViewProduct = props => {
  const { currentProduct = {} } = props;
  const [fileList, setFileList] = useState([]);
  const history = useHistory();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [product, setProduct] = useState({
    description: currentProduct.description,
    name: currentProduct.name,
    sellprice: currentProduct.sellprice,
    availablequantity: currentProduct.availablequantity,
    category: currentProduct.category ? currentProduct.category.id : '',
    subcategory: currentProduct.subcategory ? currentProduct.subcategory.id : '',
    featured: currentProduct.featured,
    specialOffer: currentProduct.specialOffer,
    features: currentProduct.features,

  });

  const handleCancel = async () => setPreviewVisible(false);

  useEffect(() => {
    let fileUrls = []
    currentProduct.filenames.forEach(fileName => {
      fileUrls.push({ url: fileName });

    });

    setFileList(fileUrls)

  }, {});

  const columns = [
    {
      title: 'Designação',
      dataIndex: 'name',
    },

    {
      title: 'Valor',
      dataIndex: 'value',
      render: (text, record) => <div>{text}</div>
    },
  ];


  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

  };


  const renderContent = () => {
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          crossOrigin='anonymous'
        >
        </Upload>
        <Divider ></Divider>

        <Row>
          <Col span={12}>
            <Checkbox
              name="featured"
              checked={product.featured}
              disabled
            >
              {formatMessage({ id: 'product.featured' })}
            </Checkbox>
          </Col>

          <Col span={12}>
            <Checkbox
              disabled
              name="featured"
              checked={product.specialOffer}
            >
              {formatMessage({ id: 'product.special.offer' })}
            </Checkbox>
          </Col>
        </Row>

        <Divider ></Divider>
        <Descriptions title={formatMessage({ id: 'product.data' })} column={2} >
          <Descriptions.Item label="Nome">{product.name}</Descriptions.Item>
          <Descriptions.Item label={formatMessage({ id: 'product.availablequantity' })}>{product.availablequantity}</Descriptions.Item>
          <Descriptions.Item label={formatMessage({ id: 'product.category' })}>{product.category ? product.category.name : ''}</Descriptions.Item>
          <Descriptions.Item label={formatMessage({ id: 'product.subcategory' })}>{product.subcategory ? product.subcategory.name : ''}</Descriptions.Item>
          <Descriptions.Item label={formatMessage({ id: 'product.price' })}>  <Statistic value={product.sellprice} suffix="MZN" /> </Descriptions.Item>
          <Descriptions.Item label={formatMessage({ id: 'product.vehicle' })}>{product.vehicle}</Descriptions.Item>
        </Descriptions>
        <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="previewImage" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Divider ></Divider>
        <h3 style={{ 'margin-top': '15px' }}>
          {formatMessage({ id: 'product.keyfeatures' })}
        </h3>
        <Table
          columns={columns}
          dataSource={product.features}
          size='small'
        />
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        {newTaxType === false && success === false ?
          <FormItem {...tailLayout}>
            <Button type='danger' onClick={() => history.goBack()}>{formatMessage({ id: 'global.cancel' })}</Button>
          </FormItem> : null}

      </>
    );
  };

  return (
    <Card  >
      {renderContent()}
      {renderFooter()}
    </Card>
  );
};

export default connect(({ product, user }) => ({
  currentUser: user.currentUser,
  currentProduct: product.currentProduct,
}))(ViewProduct);