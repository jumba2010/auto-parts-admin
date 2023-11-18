import { formatMessage } from 'umi-plugin-react/locale';

  export  default function getStatus(status) {
  if(status==='CONFIRMED'){
        return formatMessage({ id: 'payment.confirmed'});
    }
    else if(status==='PENDING'){
        return formatMessage({ id: 'payment.unconfirmed'});
    }
  
    else{
       return  '';
    }
  }