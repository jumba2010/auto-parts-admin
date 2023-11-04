import React, { useState } from 'react';
import { Layout, Menu,Row,Col,Form,Input,Upload,Modal,Button,message} from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import { BankTwoTone,IdcardTwoTone,MailTwoTone,PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import SecurityView from './components/security';
import {useDispatch} from  'react-redux';
import MapPicker from 'react-google-map-picker';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const success = () => {
  message.success(formatMessage({id:'user.updated.successfully'}), 5);
};

const loading = () => {
  message.success(formatMessage({id:'global.loading'}),);
};

setInterval(function(){
  //my code
  },60);

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AccountSetting = (props) => {
  const { loading, currentUser } = props;
  const [visible,setVisible]=useState(false);
  const [currentKey, setCurentKey] = useState('1');
  const [uploading, setUploading] = useState(false);
  const [formVals, setFormVals] = useState({
    name: currentUser.name,
    email: currentUser.email,
    addres: currentUser.address,
    phoneNumber:currentUser.phoneNumber,
    website:currentUser.companyWebsite,
    companyName:currentUser.companyName,
  
  });

  const DefaultLocation = { lat: currentUser.location.latitude, lng: currentUser.location.longitude};
  const DefaultZoom = 10;
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
   const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [imageUrl, setImageUrl] = useState(currentUser.companyBanner);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleChangeLocation= (lat, lng)=>{
    setLocation({lat:lat, lng:lng});
  }

  const handleUpdateUser =async()=>{
    dispatch({
      type: 'user/update',
      payload: {
        companyBanner: imageUrl,
        companyName: formVals.companyName,
        phoneNumber: formVals.phoneNumber,
        name:formVals.name,
        website:formVals.website,
        addres:formVals.addres,
        sellerId:currentUser.id,
        location:defaultLocation
      },
    });

    message.loading({ content: 'Loading...', key });
    var myVar=setInterval(() => {
      if(!loading){
        message.success({ content: 'User Updated Successfully!', key, duration: 4 });
        clearInterval(myVar);
      }
    }, 600);
  
  }
      
  const handleChangeZoom= (newZoom)=>{
    setZoom(newZoom);
  }

  const uploadButton = (
    <div style={{'width': '128px',
    'height': '128px'}}>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const props2 = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [],
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        setImageUrl(imageUrl);
        setUploading(false);
      }
      );
    }
  };


return (
 <div>Teste</div>)};
export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/update'],
}))(AccountSetting);
