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
  ];

  export default columns;