import styles from './creationUpload.module.css'
import { Form, useActionData, redirect } from 'react-router-dom'
import { useRef, useState } from 'react'

function splitFileName(fullName) {
  const parts = fullName.split('.')
  const extension = parts.pop() 
  const name = parts.join('.');         
  return [name, extension]
}

export async function loader() {
  const token = JSON.parse(localStorage.getItem('latestUser') || '{}')['user-token']
  if(token) {
    const varify = await fetch('http://localhost:5000/api/token/tokenVarify', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'user-token': token
      })
    })
    const result = await varify.json()
    console.log('This is the token varifying:', result)
    if(!result['token-status']) {
      throw redirect('/login')
    }
  }
  else {
    throw redirect('/login')
  }
}

export async function action({ request }) {
  const formData = await request.formData()
  const type = formData.get('uploadImage')
  const image = formData.get('image')
  const imageName = splitFileName(image)
  const name = imageName[0]
  const extension = imageName[1]
  const token = JSON.parse(localStorage.getItem('latestUser'))['user-token']
  let url = ``
  if(type === 'big') {
    url = 'http://localhost:5000/api/public/' + 'big'
  }
  else {
    url = 'http://localhost:5000/api/public/' + 'general'
  }
  const sendPictureName = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'user-token': token
    },
    body: JSON.stringify({
      'pictureName': name,
      'pictureExtension': extension
    })
  })
  const result = await sendPictureName.json()
  return result['insertPictureStatus']
}

export function CreationUpload() {
  const imageInput = useRef(null)
  const [hasUploaded, setHasUploaded] = useState(false)
  const uploadStatus = useActionData()

  if(uploadStatus === true) {
    console.log('Uploaded successfully!')
    window.location.reload();
  }
  else if(uploadStatus === false) {
    console.log('Upload failed, please try again later...')
    window.location.reload();
  }

  function getImage() {
    imageInput.current.click() 
  }

  function handleImage() {
    setHasUploaded(true)
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <Form method='post'>
            <input name='image' onChange={handleImage} ref={imageInput} style={{display: 'none'}} type='file' accept="image/*"/>
            <button type='button' onClick={hasUploaded ? undefined : getImage}>choose your image here</button>
            <button type='submit' name='uploadImage' value='big'>upload it as a big image!</button>
            <button type='submit' name='uploadImage' value='small'>upload it as a small image!</button>
          </Form>
        </div>
      </div>
    </>
  )
}