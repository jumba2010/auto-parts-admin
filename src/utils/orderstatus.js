import { formatMessage } from 'umi-plugin-react/locale';

  const orderstatus=[{id:'1',code:'PENDING',des:formatMessage({ id: 'order.pending'})},
{id:'2',code:'PROCESSING',des:formatMessage({ id: 'order.preparing'})},
{id:'4',code:'ON_THE_WAY',des:formatMessage({ id: 'order.ontheway'})},
{id:'5',code:'DELIVERED',des:formatMessage({ id: 'order.delivered'})},
{id:'3',code:'READY',des:formatMessage({ id: 'order.ready'})},
{id:'6',code:'CANCELED',des:formatMessage({ id: 'order.canceled'})},

];


export default orderstatus;