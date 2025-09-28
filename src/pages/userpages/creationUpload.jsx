import styles from './creationUpload.module.css'
import { useState, useRef } from 'react'
import { getUploadCredential, uploadVideo, insertRecord } from '../../util/uploadVideo.js'

export function CreationUpload() {
  return (
    <>
      <UploadElems />
    </>
  )
}

function UploadElems() {
  const [videoName, setVideoName] = useState(null)
  const inputRef = useRef()
  const uploadRef = useRef()
  async function submitVideo() {
    try {
      const fileType = inputRef.current.files[0].type
      const fileSize = inputRef.current.files[0].size
      const [credential, videoId] = await getUploadCredential(fileType)

      if(credential) {
        uploadRef.current.disabled = true
        const uploadStatus = await uploadVideo(credential, inputRef.current.files[0], fileType)
        if(uploadStatus) {
          const insertion =  await insertRecord(videoId, fileType, fileSize)
          if(insertion) {alert('Upload successful!'); window.location.reload()}
          else {throw new Error('try again later!')}
        }
      }
    }
    catch(err) {console.log(err); alert('upload failed, please try again later...')}
    finally {uploadRef.current.disabled = false}
  }

  return (
    <>
      <main className={styles.main} >
        <label className={videoName ? styles.uploadContainerDisabled : styles.uploadContainer} >
          {videoName ? 
            <div className={styles.instance} >
              {videoName}
              <button 
              className={styles.deleteInstance} 
              onClick={(e) => {e.stopPropagation(); e.preventDefault(); setVideoName(null); inputRef.current.value = null}} >
                ×
              </button>
            </div> : "Upload your video here"
          }
          <input 
            ref={inputRef}
            disabled={videoName} 
            type='file' 
            accept='video/*' 
            onChange={(e) => {
              if(e.target.files.length > 0) {setVideoName(e.target.files[0].name)}
            }} 
            style={{display: "none"}} />
        </label>
        <button ref={uploadRef} onClick={submitVideo} disabled={!videoName} className={styles.uploadButton} >Upload</button>
      </main>
    </>
  )
}