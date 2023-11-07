import React, { useState } from 'react';
import { Form, Button,Input,Result,Upload,Select,Divider,Statistic,Modal,Descriptions,Card, Table,Steps } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
const FormItem = Form.Item;
const { Step } = Steps;
const { Option } = Select;
import columns from '../components/taxcolumns';
import { formatMessage } from 'umi-plugin-react/locale';
import { useHistory } from "react-router-dom";
import { connect } from 'dva';
import {useDispatch} from  'react-redux';
import {uploadFile,deleteFile} from '../../../utils/fileutils';
import categories from '../utils/categories';
import { createProduct } from '@/services/product';


const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};


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

const CreateProduct = props => {

  const {vehicles=[],taxes=[],currentUser={},vhicles = [] } = props;
  const [formVals, setFormVals] = useState({
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [newTaxType, setNewTaxType] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const [selectedRowKeys,setSelectedRowKeys]=useState([]);
  const [selectedKeyFeatures,setSelectedKeyFeatures]=useState([]);
  const [previewVisible,setPreviewVisible]= useState(false);
  const [previewImage,setPreviewImage]= useState('');
  const [previewTitle,setPreviewTitle]= useState('');
  const [fileList, setFileList]=useState([]);
  const dispatch = useDispatch();
  const [fileNameHistories, setFileNameHistories]=useState([]);
  const history = useHistory();
  const [features, setFeatures]=useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);

  const  onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleCancel = async () => setPreviewVisible(false);

  const handleChange = async (info) => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      let filename=await uploadFile(info.file.originFileObj);
      if(filename){
        fileList.forEach(fl =>{
          fl.status ='done'
        })
      }
     
      setFileList(fileList);
      
      let fileNamehistory={originalFileName:info.file.originFileObj.name,url:filename.imageUrl};
      fileNameHistories.push(fileNamehistory);
      setFileNameHistories(fileNameHistories);
    }

  }

 const  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
setPreviewImage(file.url || file.preview);
setPreviewVisible(true);
setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const addNewTaxType=()=>setNewTaxType(true);

  const saveNewType=async ()=>{
    const fieldsValue = await form2.validateFields();
  setSaving(true);
  features.push({
      name: fieldsValue.designation,
      value:fieldsValue.value,
    } );

    setFeatures(features);

      setSaving(false);
      setNewTaxType(false);
      form2.resetFields();
   
  }

  const onRemove=(file)=>{
    console.log(fileNameHistories)
   let newName=fileNameHistories.filter((fh)=>fh.originalFileName===file.originFileObj.name)[0].url;
   console.log(newName)
   deleteFile(newName);
  }

  const restart=()=>{
    form.resetFields();
    setCurrentStep(currentStep - 4);
    setNewTaxType(false);
    setSuccess(false);
    setSavingProduct(false);
    setFeatures([]);
    setSelectedRowKeys([]);
  }
  
  const extra = (
    <>
      <Button type="primary" onClick={restart}>
      {formatMessage({ id: 'addnew.product'})}
       
      </Button>
      <Button onClick={()=>history.push('/product/mantain')}>
      {formatMessage({ id: 'list.products'})}
      </Button>
    </>
  );

  const normFile = e => {
    setFileList(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    forward();

  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCreateProduct =async()=>{
    setSavingProduct(true);
    let category = categories.filter((c)=>c.id===formVals.category)[0];
    console.log(category)
   // let vhicle = vhicles.filter(v => v.id ===formVals.vhicle)[0];
    await createProduct({
          description: formVals.description,
          name:formVals.name,
          category,
          filenames:fileNameHistories,
          sellprice:formVals.sellprice,
          availablequantity:formVals.availablequantity,
          features:features,
          seller:currentUser,
          sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7',
          createdBy:currentUser.id,activatedBy:currentUser.id,
        }).then(data => {
          
          dispatch({
            type: 'product/fetchAll',
            payload:{
              sucursalId:'9a3f2a7c-733f-401c-b20a-6612470cdcd7'
            }
          });

          setSuccess(true);
          setSavingProduct(false);
          forward();

        });


     
  }

  const renderContent = () => {
  const tailLayout={
    wrapperCol:{offset:5,span:16}

    }

    const layout={
      labelCol:{span:5},
      wrapperCol:{span:16}
      
          }

          if (currentStep === 1) {
            return (
              <>
    <FormItem name="availablequantity" label={formatMessage({ id: 'product.availablequantity'})}
           rules={[
            {
              required: false,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >

            <Input 
            placeholder={formatMessage({ id: 'product.availablequantity'})}
             type='number'
            />
            
          </FormItem>

          <FormItem name="sellprice" label={formatMessage({ id: 'product.price'})}
           rules={[
            {
              required: false,
              message: formatMessage({ id: 'error.product.price.required'}),
            },
          ]}
          >
            <Input suffix="MZN"
             type='number'
            />
            
          </FormItem>
        
              </>
            );
          }

          if (currentStep === 2 && newTaxType===true) {
            return (
              <>
              <Form {...layout} form={form2}> 
              
      <FormItem
                  name="designation"
                  label={formatMessage({ id: 'keyfeature.name'})}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'error.keyfeature.name.required'}),
                    },
                  ]}
                >
                  <Input
              
                    placeholder={formatMessage({ id: 'keyfeature.name'})}
                  />
                </FormItem>
          
                <FormItem
                  name="value"
                  label={formatMessage({ id: 'keyfeature.value'})}
                  rules={[
                    {
                      required: true         ,
                      message: formatMessage({ id: 'error.keyfeature.value.required'}),
                    },
                  ]}
                >
                  <Input  />
                </FormItem>
                <FormItem {...tailLayout} >
                <Button onClick={()=>setNewTaxType(false)} >{formatMessage({ id: 'global.cancel'})}</Button>
                <Button type='primary' loading={saving} style={{'margin-left': '5px'}}  onClick={saveNewType}>{formatMessage({ id: 'global.save'})}</Button>
                </FormItem>
                </Form>
             
              </>
            );
          }


    if (currentStep === 2 && newTaxType===false) {
      return (
        <>
    <Button type='primary' style={{'margin-left': '76%','margin-button': '50px'}} onClick={addNewTaxType} >{formatMessage({ id: 'add.tax'})}</Button>
<Table style={{'margin-top': '20px'}}
          columns={columns}
          rowKey='name'
          dataSource={features}
        />
       
        </>
      );
    }

    if (currentStep === 3) {
      return (
        <>
       <Descriptions title={formatMessage({ id: 'product.data'})} column={2} >
          <Descriptions.Item label="Nome">{formVals.name}</Descriptions.Item>
          
                       <Descriptions.Item label={formatMessage({ id: 'product.availablequantity'})}>{formVals.availablequantity}</Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.category'})}>{formVals.category && categories.length!=0?categories.filter((c)=>c.id===formVals.category)[0].name:''}</Descriptions.Item> 
                      <Descriptions.Item label={formatMessage({ id: 'product.price'})}>  <Statistic value= {formVals.sellprice} suffix="MZN" /> </Descriptions.Item>
                      <Descriptions.Item label={formatMessage({ id: 'product.vehicle'})}>{formVals.vehicle}</Descriptions.Item>
                     
                    </Descriptions>  
                    <Divider ></Divider> 
                    <h3 style={{'margin-top': '15px'}}>
                    {formatMessage({ id: 'product.keyfeatures'})}
                    </h3> 
                   
          <Table 
          columns={columns}
          dataSource={features}
        /> 
        </>
      );
    }

    if (currentStep === 4) {
      return (
        <>
       <Form {...formItemLayout} style={{ padding: '50px 0' }}>
<Result
    status="success"
    title= {formatMessage({ id: 'global.success'})}
    subTitle= {formatMessage({ id: 'product.registered.successfuly'})}
    extra={extra}
    />
<Form.Item >

        
        </Form.Item>
      </Form>
        </>
      );
    }

    return (
      <>
       
        <FormItem
          name="name"
          label={formatMessage({ id: 'product.name'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.name.required'}),
            },
          ]}
        >
          <Input placeholder={formatMessage({ id: 'product.name'})}/>
        </FormItem>

        <FormItem
          name="description"
          label={formatMessage({ id: 'product.description'})}
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'product.desrcription.required'}),
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={formatMessage({ id: 'product.description'})}/>
        </FormItem>

        <Form.Item label={formatMessage({ id: 'product.images'})}>
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
      
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={onRemove}
        crossOrigin='anonymous'
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
         
        </Form.Item>
      </Form.Item>

        <FormItem name="vehicle" label={formatMessage({ id: 'product.vehicle'})}  rules={[
            {
              required: false
            },
          ]}
     
        >
            <Select placeholder="Type here ..."   
              style={{
                width: '100%',
              }}
            >
             {
                vehicles.length!=0?vehicles.map((u)=>
              <Option value={u.id}>{u.name}</Option>
                ):null

              }
            </Select>
          </FormItem>

          <FormItem name="category" label={formatMessage({ id: 'product.category'})}  rules={[
            {
              required: true,
              message: formatMessage({ id: 'error.product.category.required'}),
            },
          ]}
          
        >
            <Select placeholder={formatMessage({ id: 'product.category'})}
              style={{
                width: '100%',
              }}
            >
             {
                categories.length!=0?categories.map((c)=>
                <Option value={c.id} label={c.name}>
                <div className="demo-option-label-item">
                 
                  {c.name}
                </div>
              </Option>
                ):null

              }
            </Select>
          </FormItem>
          <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1 ||(currentStep === 2 && newTaxType===false && success===false)) {
      return (
        <FormItem {...tailLayout}>
          <Button
          
            onClick={backward}
          >
            {formatMessage({ id: 'global.previous'})}
          </Button>
          <Button  type='danger' style={{'margin-left': '8px'}} onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
          <Button type="primary"  style={{'margin-left': '8px'}} onClick={() => handleNext()}>
            {formatMessage({ id: 'global.next'})}
          </Button>
        </FormItem>
      );
    }

    if (currentStep === 3 && newTaxType===false && success===false) {
      return (
        <FormItem {...tailLayout}>
          <Button
          
            onClick={backward}
          >
            {formatMessage({ id: 'global.previous'})}
          </Button>
          <Button  type='danger' style={{'margin-left': '8px'}}  onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
          <Button type="primary" style={{'margin-left': '8px'}}  loading={savingProduct} onClick={() => handleCreateProduct()}>
          {formatMessage({ id: 'global.confirm'})}
          </Button>
        </FormItem>
      );
    }


    return (
      <>
      {newTaxType===false  && success===false?
      <FormItem {...tailLayout}>
        <Button  type='danger' onClick={()=>history.goBack()}>{formatMessage({ id: 'global.cancel'})}</Button>
        <Button type="primary"  style={{'margin-left': '8px'}}  onClick={() => handleNext()}>
          {formatMessage({ id: 'global.next'})}
        </Button>
      </FormItem>:null}

      </>
    );
  };

  return (
      <Card  >
      <Steps
        style={{
          marginBottom: 28
        }}
        size="small"
        current={currentStep}
      >
        <Step title={formatMessage({ id: 'product.data'})}/>
        <Step title={formatMessage({ id: 'product.initial.stock'})} />
        <Step title={formatMessage({ id: 'product.keyfeatures'})} />
        <Step title={formatMessage({ id: 'global.confirmation.step'})} />
        <Step title={formatMessage({ id: 'global.success.step'})} />
      </Steps>
      <Form
        {...formLayout}
        form={form}
     
      >
        {renderContent()}
        {renderFooter()}
      </Form>
      </Card>
  );
};

export default  connect(({ product,user }) => ({
  vehicles: product.vehicles,
  currentUser:user.currentUser,
  taxes: product.taxes,
}))(CreateProduct);