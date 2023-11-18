 const columns = [
    {
      title: 'Designação',
      dataIndex: 'name',
    },

    {
      title: 'Valor',
      dataIndex: 'value',
      render:(text,record)=><div>{text}</div>
    },

      <a style={{'margin-left':'20px'}} onClick={() => {
                setVisibleDeleteProduct(true);
                setProduct(record);
              }}>
            {<DeleteTwoTone  twoToneColor="#FC550B"  style={{ fontSize: '20px' }}/>}

            </a>
  ];

  export default columns;