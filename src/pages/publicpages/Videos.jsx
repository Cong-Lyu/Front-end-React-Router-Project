import styles from './Videos.module.css'
import { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'

export async function loader() {
  const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
  const getData = await fetch(`${url}/api/public/general?amount=16`)
  const result = await getData.json()
  return result['pictureList']
}

export function Videos() {
  const location = useLocation()
  const path = location.pathname
  const firstList = useLoaderData()
  const [list, setList] = useState(firstList)
  const lastPicName = list[list.length - 1]
  
  const downloadUrl = `https://shirahama-imgs.s3.ap-southeast-2.amazonaws.com/pictures/video-pictures`
  let folderName
  if(path === '/') { folderName = 'homePageVideos/' }
  const bigPicPath = downloadUrl + '/big/' + folderName
  const generalPicPath = downloadUrl + '/general/' + folderName
  const bigPic = 'S-torii.jpg'

  useEffect(() => {
    async function handleScrolling() {
      const passedSize = window.scrollY
      const currentSize = window.innerHeight
      const totalSize = document.body.scrollHeight
      if(totalSize - passedSize - currentSize < 5) {
        const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
        const getData = await fetch(`${url}/api/public/general?amount=10&last=${lastPicName}`)
        const result = await getData.json()
        setList([...list, ...result['pictureList']])
        window.removeEventListener('scroll', handleScrolling)
      }
    }

    window.addEventListener('scroll', handleScrolling)

    return () => {window.removeEventListener('scroll', handleScrolling)}
  }, [list])

  function imgGenerator(start, nums) {
    const picList = []
    for(let i = start; i < start + nums ; i++) {
      picList.push(<div className={styles.subContainer}>
        <img loading="lazy"  className={styles.picture} src={generalPicPath + list[i]} />
        <p className={styles.description}>This is the description part</p>
      </div>)
    }
    return picList
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.upContainer}>
          <div className={styles.leftContainer}>
            {/* <img className={styles.leftPicture} src={bigPicPath + bigPic + `?Authorization=${downloadToken}`} /> */}
            <img className={styles.leftPicture} src={bigPicPath + bigPic} />
            <div className={styles.navBar}>This is the navi bar</div>
          </div>
          <div className={styles.rightContainer}>
            {imgGenerator(0, 6)}
          </div>
        </div>
        <div className={styles.downContainer}>
          {imgGenerator(6, list.length - 6)}
        </div>
      </div>
    </>
  )
}