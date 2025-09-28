export async function getUploadCredential(fileType) {
  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  try {
    const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
    const credentialFetch = await fetch(`${url}/api/upload/credential?fileType=${fileType}`, {
      // credentials: 'include',
      method: 'GET',
      headers: {
        'X-Google-Jwt': googleJwt,
        'X-My-Jwt': myJwt
      }
    })
    const result = await credentialFetch.json()
    if(result['status']) {return [result['credential'], result['videoId']]}
    else {throw new Error(result)}
  }
  catch(err) {console.log(err); return null}
}

export async function uploadVideo(credential, file, fileType) {
  try {
    const uploadFetch = await fetch(credential, {
      method: 'PUT',
      body: file,
      headers: {'Content-Type': fileType}
    })
    if(uploadFetch.ok) {alert('upload successful!'); return true}
    else {
      const errorText = await uploadFetch.text()
      console.log(errorText)
      alert('something wrong with your upload, please try again later...')
      return false
    }
  }
  catch(err) {console.log(err); return false}
}

export async function insertRecord(videoId, fileType, fileSize) {
  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
  const insertion = await fetch(`${url}/api/upload/insertRecord`, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json', 'X-Google-Jwt': googleJwt, 'X-My-Jwt': myJwt},
    body: JSON.stringify({
      'fileType': fileType, 
      'fileSize': fileSize,
      'videoId': videoId
    })
  })
  const insertResult = await insertion.json()
  return insertResult['insertStatus']
}