import { PrinterOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Card, Rate, Switch, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { useDispatch } from 'react-redux';
import ExportXLS from '../../../components/ExportFile/exportXls';
import getXLSColumns from '../utils/reviewxlscolumns';
import getXLSData from '../utils/reviewxlsdata';
import { findReviews, approveOrInapproveReview } from '@/services/review';
const MarketReview = (props) => {
  const { currentUser = {} } = props;
  const [sorter, setSorter] = useState('');
  const [reviews, setReviews] = useState([]);
  const [fetching, setFetching] = useState(true);
  const dispatch = useDispatch();

  const actionRef = useRef();

  const columns = [

    {
      title: formatMessage({ id: 'review' }),
      dataIndex: 'review',
      valueType: 'text',
      render: (text) => <div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'review.rate' }),
      dataIndex: 'rate',
      valueType: 'text',
      render: (text) => <Rate disabled value={parseFloat(text)} allowHalf={true} />,
    },

    {
      title: formatMessage({ id: 'product.name' }),
      dataIndex: 'product',
      render: (record) => <div>{record.name}</div>,
    },

    {
      title: formatMessage({ id: 'review.user' }),
      dataIndex: 'user',
      render: (record) => <div>{record.name}</div>,
    },

    {
      title: formatMessage({ id: 'review.updatedAt' }),
      dataIndex: 'createdAt',

      render: (text) => <div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'review.status' }),
      dataIndex: 'approved',
      render: (_, record) => <Switch checkedChildren={formatMessage({ id: 'review.approved' })} 
      unCheckedChildren={formatMessage({ id: 'review.unapproved' })} checked={record.approved}
      onClick ={(checked)=>{
      approveOrInapproveReview(record,{checked});
      fetchReviews();

      }}
      />
    }
  ];

  useEffect(() => {
    fetchReviews();

  }, []);

const fetchReviews = () => {
  findReviews({ sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7' })
  .then(data => {
    setReviews(data);
  })
}


  return (
    <Card extra={<span>
      <>
        <Button size='middle' > <PrinterOutlined /> {formatMessage({ id: 'product.print' })}</Button>
        <ExportXLS dataset={getXLSData(reviews)} sheetName={formatMessage({ id: 'menu.market.reviews' })} collumns={getXLSColumns(columns, false)} />

      </>
    </span>} bordered={false}  >

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

        dataSource={reviews}
        columns={columns}

      />
    </Card>
  );
};

export default connect(({ review, loading, user }) => ({
  reviews: review.productReviews,
  currentUser: user.currentUser,
}))(MarketReview);

