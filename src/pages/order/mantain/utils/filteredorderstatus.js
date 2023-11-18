import { formatMessage } from 'umi-plugin-react/locale';

  export  default function filteredorderstatus(status,statuslist) {

   var newList= statuslist.filter((s)=>s.code!=status);
   
    if(status==='PENDING'){
        return  newList.filter((s)=>s.code==='PROCESSING');
    }

    else  if(status==='PROCESSING'){

        return  newList.filter((s)=>s.code==='READY');
    }
    else if(status==='READY'){

        return  newList.filter((s)=>s.code==='DELIVERED' || s.code==='ON_THE_WAY' );
    }
    else  if(status==='ON_THE_WAY'){

        return  newList.filter((s)=>s.code==='DELIVERED');
    }

    else{
       return  [];
    }
  }