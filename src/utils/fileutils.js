import API from '../services/api';


export async function uploadFile(file) {
  const formData = new FormData();
    
  formData.append('files', file);

  let resp = await   API.post('/file-upload/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }, });
 
    return resp.data[0];
}

export async  function deleteFile(finename){
  // let resp = await   API.delete('/file-upload/upload'+finename);

    return 0;
}