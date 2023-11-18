import { formatMessage } from 'umi-plugin-react/locale';

  export  default function getStatus(status) {
    if(status==='PENDING'){

        return formatMessage({ id: 'order.pending'});
    }

    else  if(status==='PROCESSING'){

        return formatMessage({ id: 'order.preparing'});
    }
    else if(status==='ON_THE_WAY'){

        return formatMessage({ id: 'order.ontheway'});
    }
    else  if(status==='DELIVERED'){

        return formatMessage({ id: 'order.delivered'});
    }

    else  if(status==='CANCELED'){

        return formatMessage({ id: 'order.canceled'});
    }

    else  if(status==='REFUNDED'){

        return formatMessage({ id: 'order.refunded'});
    }

    else  if(status==='READY'){

        return formatMessage({ id: 'order.ready'});
    }
    else{
       return  '';
    }
  }