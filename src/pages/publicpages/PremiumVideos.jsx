import { useRef, useEffect, useState } from "react"
import { useLoaderData, Link } from "react-router-dom"
import styles from './PremiumVideos.module.css'

export function PremiumVideos() {
  const firstList = useLoaderData()
  const [list, setList] = useState(firstList)
  const lastPicName = list[list.length - 1]

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

  return (
    <>
      <PremiumVideoList list={list} />
    </>
  )
}

function PremiumVideoList(props) {
  const list = props.list
  const downloadUrl = `https://shirahama-imgs.s3.ap-southeast-2.amazonaws.com/pictures/video-pictures`
  let folderName = 'homePageVideos/'
  const generalPicPath = downloadUrl + '/general/' + folderName

  function imgGenerator(nums) {
    const picList = []
    for(let i = 0; i < nums; i++) {
      picList.push(
      <Link to={`/premiumVideoPlaying?premiumVideoName=testPremiumVideo1`} className={styles.container} >
        <img loading="lazy" className={styles.videoImg} src={generalPicPath + list[i]} />
        
        <p >This is the description part</p>
      </Link>)
    }
    return picList
  }
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.premiumTitle} >Welcome to premium channel!</h1>
        <div className={styles.videos} >
          {imgGenerator(list.length)}
        </div>
      </main>
    </>
  )
}