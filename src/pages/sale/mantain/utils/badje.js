
export default function getBadge (status) {
 
if(status==='PENDING'){

        return 'warning';
    }
   else  if(status==='CONFIRMED'){

        return 'success';
    }
else{
    return 'dafault';
}

  }