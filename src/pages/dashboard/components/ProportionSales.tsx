import { Card, Radio } from 'antd';

import { FormattedMessage,formatMessage } from 'umi-plugin-react/locale';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="menu.orders"
        defaultMessage="Proporcao das Encomendas"
      />
    }
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="all">
              <FormattedMessage id="BLOCK_NAME.channel.all" defaultMessage="ALL" />
            </Radio.Button>
            <Radio.Button value="online">
              <FormattedMessage id="BLOCK_NAME.channel.online" defaultMessage="Online" />
            </Radio.Button>
            <Radio.Button value="stores">
              <FormattedMessage id="BLOCK_NAME.channel.stores" defaultMessage="Stores" />
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        <FormattedMessage id="menu.orders" defaultMessage="Orders" />
      </h4>
      <Pie
        hasLegend
        subTitle={<FormattedMessage id="menu.orders" defaultMessage="Orders" />}
        total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
        data={salesPieData}
        valueFormat={(value) => value}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
);

export default ProportionSales;
