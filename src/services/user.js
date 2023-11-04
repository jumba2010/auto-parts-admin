

export async function query() {
  
}
export async function queryCurrent() {
  let userdata={id:"3459345935",name:"Judiao Mbaua", 
                picture:"", address:"Av. Judiao Mbaua", email:"judiao.mbaua@gmail.com",
                contact:"876767893",
                location:{
                  longitude:23.44,
                  latitude:34.45
                },
                currentAuthority: 'admin'};

  return userdata;

}

export async function queryNotices() {
  
}

export async function signup(params) {

}

export async function signin(email, password) {
 
}

export async function signInWithGoogle() {

}

export async function saveCurrentUser(latitude,longitude,contactPrefix,countryCode) {
   
}


export async function getCurrentUser() {
  let userdata={id:"3459345935",name:"Judiao Mbaua", 
                picture:"", address:"Av. Judiao Mbaua", email:"judiao.mbaua@gmail.com",
                contact:"876767893",
                location:{
                  longitude:23.44,
                  latitude:34.45
                },
                currentAuthority: 'admin'};

  return userdata;
}

export async function signOut() {

 
}

export async function updateUser(params) {

}


export async function sendVerificationEmail() {

}

export async function updateUserPassword(newPassword) {

}

export async function sendPasswordResetEmail(emailAddress) {

}

export async function deleteUser() {

}