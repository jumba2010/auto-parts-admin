import { Card, Table, DatePicker } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { findAuditingByDateInterval } from '@/services/auditing';
import { getTimeDistance, DateRangeKeys } from '@/utils/DateTimeUtils';

const { RangePicker } = DatePicker;

const AuditingList = (props) => {
  const { currentUser = {} } = props;
  const [sorter, setSorter] = useState('');
  const [fetching, setFetching] = useState(true);
  const [auditingList, setAuditingList] = useState([]);
  const [rangePickerValue, setRangePickerValue] = useState([])

  const actionRef = useRef();

  const columns = [
    {
      title: formatMessage({ id: 'auditing.date' }),
      dataIndex: 'createdAt',
      render: (text) => <div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'auditing.operation' }),
      dataIndex: 'operation',
      render: (text) => <div>{text}</div>,
    },

    {
      title: formatMessage({ id: 'auditing.user' }),
      dataIndex: 'user',
      render: (_,record) => <div>{record.name}</div>,
    },

    {
      title: formatMessage({ id: 'auditing.details' }),
      dataIndex: 'user',
      render: (text) => <div>{text}</div>,
    },

  ];

  const isActive = (type) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return 'currentDate';
    }
    
    return '';
  };

  useEffect(() => {
    setFetching(true);
    let rangePickerValue = getTimeDistance(DateRangeKeys.THIS_MONTH);
    setRangePickerValue(rangePickerValue);
    findAuditingByDateInterval({
      sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
      startDate: rangePickerValue[0].format('YYYY-MM-DD HH:mm:ss'),
      endDate: rangePickerValue[1].format('YYYY-MM-DD HH:mm:ss')
    }).
      then(data => {
        setAuditingList(data);
        setFetching(false);
      })

  }, []);

  const setDateRange = (datRange) =>{
    let rangePickerValue = getTimeDistance(datRange);
    setRangePickerValue(rangePickerValue); 
  }

  const handleRangePickerChange = (rangePickerValue) => {
    if (!fetching) {
      setFetching(true);
      setRangePickerValue(rangePickerValue);
      findAuditingByDateInterval({
        sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
        startDate: rangePickerValue[0].format('YYYY-MM-DD HH:mm:ss'),
        endDate: rangePickerValue[1].format('YYYY-MM-DD HH:mm:ss')
      }).
        then(data => {
          setAuditingList(data);
          setFetching(false);
        })
    }
  }


  const fetchData = (dateEnum) => {
    if(!fetching){
    setFetching(true);
    let rangePickerValue = getTimeDistance(dateEnum);
    setRangePickerValue(rangePickerValue);
    findAuditingByDateInterval({
      sucursalId: '9a3f2a7c-733f-401c-b20a-6612470cdcd7',
      dateEnum
    }).
      then(data => {
        setViews(data);
        setFetching(false);
      })
  }
}

  return (
    <Card bordered={false}
      title={
        <div className={styles.salesExtraWrap}>
          <div className={styles.salesExtra}>
            <a className={isActive('TODAY')} onClick={() => setDateRange('TODAY')}>
              {formatMessage({ id: 'dates.today' })}
            </a>
            <a className={isActive('THIS_WEEK')} onClick={() => fetchData('THIS_WEEK')}>
              {formatMessage({ id: 'dates.thisweek' })}
            </a>
            <a className={isActive('THIS_MONTH')} onClick={() => fetchData('THIS_MONTH')}>
              {formatMessage({ id: 'dates.thismonth' })}
            </a>
            <a className={isActive('LAST_QUARTER')} onClick={() => fetchData('LAST_QUARTER')}>
              {formatMessage({ id: 'dates.lastquarter' })}
            </a>
            <a className={isActive('LAST_SEMESTER')} onClick={() => fetchData('LAST_SEMESTER')}>
              {formatMessage({ id: 'dates.lastsemester' })}
            </a>
            <a className={isActive('THIS_YEAR')} onClick={() => fetchData('THIS_YEAR')}>
              {formatMessage({ id: 'dates.thisyear' })}
            </a>
          </div>
          <RangePicker
            value={rangePickerValue}
            onChange={handleRangePickerChange}
            style={{ width: 256 }}
          />
        </div>
      }

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

        dataSource={auditingList}
        columns={columns}

      />
    </Card>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AuditingList);

