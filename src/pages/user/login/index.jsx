import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox,Card, Divider } from 'antd';
import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'umi';
import { connect } from 'dva';
import LoginFrom from './components/Login';
import styles from './style.less';
import { formatMessage } from 'umi-plugin-react/locale';
import GoogleButton from 'react-google-button';
import {useDispatch} from  'react-redux';
import api from '../../../services/api';
import { setAuthority } from '@/utils/authority';
import { signInWithGoogle,signin,sendVerificationEmail,getCurrentUser,saveCurrentUser } from "../../../services/user";
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [googleerror, setGoogleerror] = useState('');
  const [type, setType] = useState('account');
  const history = useHistory();
  const dispatch= useDispatch();

  useEffect(() => {

   },[]);

  const handleSubmit =async( values )=> {
    const { userName, password } =values; 
    try {
      history.push("/welcome"); 
      dispatch({
          type: 'user/fetchCurrent',
        });
        //setAuthority(['admin'])
      // await signin(userName, password);
      // let user=await getCurrentUser();
      // if( user.emailVerified){
      //   dispatch({
      //     type: 'user/fetchCurrent',
      //   });
       
      // }
      // else{
      //   setGoogleerror(formatMessage({ id: 'email.noverified'}));
      // }
      
    } catch (error) {
      setGoogleerror(error.message);
    }
   
  };

  const googleSignIn=async() =>{
    try {
      await signInWithGoogle();
      saveCurrentUser(latitude?latitude:alternlatitude,longitude?longitude:alternlongitude,contactPrefix,countryCode);
      dispatch({
        type: 'user/fetchCurrent',
      });

    history.push("/welcome"); 
    } catch (error) {
      setGoogleerror(error.message);
    }
  }

  return (
    <div className={styles.main}>
      <Card>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content={formatMessage({ id: 'error.username.or.password.notcorrect'})} />
          )}

{googleerror  && (
            <LoginMessage content={googleerror} />
          )}

          <UserName
            name="userName"
            placeholder={formatMessage({ id: 'username.placeholder'})}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'error.username.required'}),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={formatMessage({ id: 'password.placeholder'})}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'error.password.required'}),
              },
            ]}
          />
      
      
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            {formatMessage({ id: 'stay.loggedin'})}
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
         {formatMessage({ id: 'forgot.password'})}
          </a>
        </div>
          <Submit loading={submitting}>{formatMessage({ id: 'user.login'})}</Submit>
      
       <GoogleButton style={{width:'100%'}} onClick={googleSignIn}
       label={formatMessage({ id: 'signin.withgoogle'})}
       ></GoogleButton>
      

        <div className={styles.other}>
       
          <Link className={styles.register} to="/user/register">
            {formatMessage({ id: 'user.signup.fornew.account'})}
          </Link>
        </div>
      </LoginFrom></Card>
      <div style={{'padding-top':'20px'}}>
      <a >{formatMessage({ id: 'terms.ofuse.andprivacy'})}</a>
      </div>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
