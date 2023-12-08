import getStatus from './status';

import moment from 'moment';
export default function getXLSData(datasource){
let data=[]
datasource.forEach(o => {
  let  order ={};
  order.id=o.id;
  order.client=o.client.firstName+o.client.lastName;
  order.status=getStatus(o.status);
  order.itemsCount=o.quantity;
  order.total=o.total;
  order.remarks=o.notes;
  order.updatedAt=o.updatedAt
  data.push(order);
});

    return data;
}
