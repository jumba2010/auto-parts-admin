
export default function getBadge (status) {
    if(status==='PENDING'){

        return 'default';
    }

    else  if(status==='PROCESSING'){

        return 'processing';
    }
    else if(status==='ON_THE_WAY'){

        return 'warning';
    }

    else if(status==='CANCELLED'){

        return 'error';
    }
   else  if(status==='DELIVERED' || status==='READY'){

        return 'success';
    }
else{
    return 'dafault';
}

  }