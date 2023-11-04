import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import { Link } from 'umi';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';
import { Layout } from 'antd';
const { Footer } = Layout;

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div >
              <Link to="/">
            
                <span className={styles.title}>AUTO PEÇAS </span>
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
        </div>
        <Footer style={{ textAlign: 'center' }}>AUTO PEÇAS ©2023 Created by Judiao Mbaua </Footer>
      </div>
      \
      []]
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
