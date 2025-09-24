import styles from './creationUpload.module.css'
import { useState } from 'react'

export function CreationUpload() {
  

  return (
    <>
      <UploadElems />
    </>
  )
}

function UploadElems() {
  const [videoName, setVideoName] = useState(null)
  const [coverName, setCoverName] = useState(null)

  return (
    <>
      <main className={styles.main} >
        <label className={videoName ? styles.uploadContainerDisabled : styles.uploadContainer} >
          {videoName ? 
            <div className={styles.instance} >
              {videoName}
              <button className={styles.deleteInstance} onClick={(e) => {e.stopPropagation(); e.preventDefault(); setVideoName(null)}} >
                ×
              </button>
            </div> : "Upload your video here"
          }
          <input 
            key={videoName || 'empty'} 
            disabled={videoName} 
            type='file' 
            accept='video/*' 
            onChange={(e) => {if (e.target.files.length > 0) {setVideoName(e.target.files[0].name)}}} 
            style={{display: "none"}} />
        </label>
        <button disabled={!videoName} className={styles.uploadButton} >Upload your video</button>
        <label className={coverName ? styles.uploadContainerDisabled : styles.uploadContainer} >
          {coverName ? 
            <div className={styles.instance} >
              {coverName}
              <button className={styles.deleteInstance} onClick={(e) => {e.stopPropagation(); e.preventDefault(); setCoverName(null)}} >
                ×
              </button>
            </div> : "Upload your video cover image here"
          }
          <input
            key={coverName || 'empty'} 
            disabled={coverName}
            type='file' 
            accept='image/*' 
            onChange={(e) => {if (e.target.files.length > 0) {setCoverName(e.target.files[0].name)}}} 
            style={{display: "none"}}/>
        </label>
        <button disabled={!coverName} className={styles.uploadButton} >Upload a cover image</button>
      </main>
    </>
  )
}