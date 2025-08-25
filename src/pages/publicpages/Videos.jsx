import styles from './Videos.module.css'
import { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'

export async function loader() {
  const getData = await fetch(`http://localhost:5000/api/public/general?amount=16`)
  const result = await getData.json()

  // const downloadTokenFetch = await fetch('http://localhost:5000/api/downloadToken')
  // const downloadToken = await downloadTokenFetch.json()

  // return [result['pictureList'], downloadToken['downloadUrl'], downloadToken['downloadTempToken']]
  return result['pictureList']
}

export function Videos() {
  const location = useLocation()
  const path = location.pathname
  const firstList = useLoaderData()
  // const downloadUrl = firstList[1]
  // const downloadToken = firstList[2]
  // //-----pictures' names are saved in state.------//
  // const [list, setList] = useState(firstList[0])
  const [list, setList] = useState(firstList)
  const lastPicName = list[list.length - 1]
  console.log(list, lastPicName)
  
  const downloadUrl = `https://raw.githubusercontent.com/Cong-Lyu/publicFiles/master/pictures/video-pictures`
  let folderName
  if(path === '/') { folderName = 'homePageVideos/' }
  const bigPicPath = downloadUrl + '/big/' + folderName
  const generalPicPath = downloadUrl + '/general/' + folderName
  const bigPic = 'S-torii.jpg'
  console.log(`${generalPicPath}` + list[0])

  useEffect(() => {
    async function handleScrolling() {
      const passedSize = window.scrollY
      const currentSize = window.innerHeight
      const totalSize = document.body.scrollHeight
      if(totalSize - passedSize - currentSize < 5) {
        const getData = await fetch(`http://localhost:5000/api/public/general?amount=10&last=${lastPicName}`)
        const result = await getData.json()
        console.log('see!::', result)
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
        {/* <img loading="lazy"  className={styles.picture} src={generalPicPath + list[i] + `?Authorization=${downloadToken}`} /> */}
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