import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import { VisitDataType } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData2: VisitDataType[],visitData: VisitDataType[]  }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage id="BLOCK_NAME.analysis.total-sales" defaultMessage="Total Sales" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126960</Yuan>}
        footer={
          <Field
            label={
              <FormattedMessage id="BLOCK_NAME.analysis.day-sales" defaultMessage="Daily Sales" />
            }
            value={`MZN ${numeral(12423).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="BLOCK_NAME.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="BLOCK_NAME.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="BLOCK_NAME.analysis.visits" defaultMessage="Visits" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage id="BLOCK_NAME.analysis.day-visits" defaultMessage="Daily Visits" />
            }
            value={numeral(1234).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="BLOCK_NAME.analysis.payments" defaultMessage="Payments" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="BLOCK_NAME.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage
                id="BLOCK_NAME.analysis.conversion-rate"
                defaultMessage="Conversion Rate"
              />
            }
            value="60%"
          />
        }
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
     

    <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="menu.orders" defaultMessage="Orders" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="menu.orders" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(7046).format('0,0')}
        footer={
          <Field
            label={
              <FormattedMessage id="dayly.orders" defaultMessage="Daily Visits" />
            }
            value={numeral(134).format('0,0')}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#00e673" data={visitData} />
      </ChartCard>


    </Col>
  </Row>
);

export default IntroduceRow;
