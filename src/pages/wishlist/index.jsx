import { Card, Table,Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { dates } from '../../utils/DateTimeUtils';
import { findWishListByDateInterval } from '@/services/wishlist';

const WishList = (props) => {
  const { currentUser = {} } = props;
  const [sorter, setSorter] = useState('');
  const [fetching, setFetching] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const actionRef = useRef();

  const columns = [
    {
      title: formatMessage({ id: 'product.name' }),
      dataIndex: 'product',
      render: (record) => <div>{record.name}</div>,
    },

    {
      title: formatMessage({ id: 'wishlist.user' }),
      dataIndex: 'user',
      render: (record) => <div>{record.name}</div>,
    },

    {
      title: formatMessage({ id: 'wishlist.date' }),
      dataIndex: 'createdAt',
      render: (text) => <div>{text}</div>,
    },

  ];

  useEffect(() => {
    setFetching(true);
    findWishListByDateInterval({
      sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
      dateEnum: 'THIS_MONTH'
    }).
      then(data => {
        setWishlist(data);
        setFetching(false);
      })

  }, []);


  const handleSearchByDates = (dateEnum) => {
    setFetching(true);
    findWishListByDateInterval({
      sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
      dateEnum
    }).
      then(data => {
        setWishlist(data);
        setFetching(false);
      })
  }

  return (
    <Card bordered={false}
      title={<span>
        <div style={{ 'margin-left': '0px' }}>
          <Select
            labelInValue
            defaultValue={{ key: 'THIS_MONTH', value: formatMessage({ id: 'dates.thismonth' }) }}
            style={{ 'margin-left': '0px', 'width': '50%' }}
            onChange={handleSearchByDates}

          >
            {dates.map((d) => <Option key={d.key}>{d.des}</Option>)}

          </Select>

        </div>
      </span>}
    >

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

        dataSource={wishlist}
        columns={columns}

      />
    </Card>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(WishList);

