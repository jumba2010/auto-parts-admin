import { GlobalOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { getLocale, setLocale } from 'umi-plugin-react/locale';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const SelectLang = props => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }) => setLocale(key);

  const locales = [ 'en-US', 'pt-BR'];
  const languageLabels = {
    'en-US': 'English',
    'pt-BR': 'Português',
  };
  const languageIcons = {
    'en-US': '🇺🇸',
    'pt-BR': '🇧🇷',
  };
  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={classNames(styles.dropDown, className)}>
        <GlobalOutlined title="Lang" />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
