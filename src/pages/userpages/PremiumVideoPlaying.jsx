import videojs from "video.js"
import 'video.js/dist/video-js.css'
import { useRef, useEffect, useState } from "react"
import { useLoaderData, Link } from "react-router-dom"
import 'videojs-youtube'
import { 
  PlayIcon,
  NoSymbolIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/solid'
import styles from '../userpages/PremiumVideoPlaying.module.css'

export async function Loader() {
  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  try {
    const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
    const getData = await fetch(`${url}/api/public/general?amount=16`)
    const dataResult = await getData.json()
    const varify = await fetch(`${url}/api/premium/premiumCheck`, {
      // credentials: 'include',
      method: 'GET',
      headers: {
        'X-Google-Jwt': googleJwt,
        'X-My-Jwt': myJwt
      }
    })
    const result = await varify.json()
    console.log(result)
    if(!result['premium-status']) {return [dataResult['pictureList'], false]}
    else {return [dataResult['pictureList'], true]}
  }
  catch(err) {
    console.log(err)
  }
}

export function PremiumVideoPlaying() {
  const [firstList, isPremium] = useLoaderData()
  console.log(firstList, isPremium)
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
      <main className={styles.main}>
        <div className={styles.leftContainer} >
          <h1 className={styles.videoTitle} >鄭融《終生學習》</h1>
          <div className={styles.titleContainer} >
            <PlayIcon className={styles.Icon} />
            <p className={styles.videoInfo} style={{ marginRight: '8px'}}>845K</p>
            <p className={styles.videoInfo} style={{ marginRight: '14px'}}>2025-09-09</p>
            <NoSymbolIcon className={styles.Icon} />
            <p className={styles.videoInfo} >Do not share without permission</p>
          </div>
          <VideoElem />
          <div className={styles.interactionBar} >
            <button className={styles.likeButton} >
              <HandThumbUpIcon className={styles.likeIcon} />
            </button>
            <p>61K Likes</p>
          </div>
        </div>
        <div className={styles.rightContainer} >
          <div className={styles.ad} >
            <p>This is Advertisement</p>
          </div>
          <div>
            <SubVideoList list={list} />
          </div>
        </div>
      </main>
      {!isPremium && (
        <div className={styles.promptCover} >
          <div className={styles.prompt} >
            <h2 className={styles.promptTitle} >This is for premium user only</h2>
            <p style={{marginBottom: '40px'}} >Would you like to change to premium plan?</p>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/vip" className={styles.upgradeLink} >Upgrade to premium</Link>
              <Link to="/" className={styles.homeLink} >Back to home</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function SubVideoList(props) {
  const list = props.list
  const downloadUrl = `https://shirahama-imgs.s3.ap-southeast-2.amazonaws.com/pictures/video-pictures`
  let folderName = 'homePageVideos/'
  const generalPicPath = downloadUrl + '/general/' + folderName

  function imgGenerator(nums) {
    const picList = []
    for(let i = 0; i < nums; i++) {
      picList.push(
      <Link to={`/video?videoName=testVideo1`} className={styles.subVideoContainer} >
        <div><img loading="lazy" className={styles.subVideoListImg} src={generalPicPath + list[i]} /></div>
        <div><p>This is the description part1</p><p>This is part2</p></div>
      </Link>)
    }
    return picList
  }

  return (
    <>
      {imgGenerator(list.length)}
    </>
  )
}

function VideoElem() {
  const videoRef = useRef(null)
  const playRef = useRef(null)
  const videoSrc = 'https://www.youtube.com/watch?v=cBvtC5qPac0'

  useEffect(() => {
    const id = setTimeout(() => {
      if(videoRef.current) {
        playRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
          fluid: true,
          techOrder: ['youtube'],
          sources: [{
            type: 'video/youtube',
            src: videoSrc
          }],
          youtube: {
            modestbranding: true,
            rel: 0,
            showinfo: false
          }
        })

        // playRef.current.src({
        //   src: '',
        //   type: 'video/mp4'
        // })
      }
    }, 10)
    
    
    return () => {
      clearTimeout(id)
      if(playRef.current) {playRef.current.dispose(); playRef.current = null}
      if(videoRef.current) {videoRef.current.innerHTML = ''}
    }
  }, [])

  return (
    <>
      <div data-vjs-player style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '10px' }}>
        <video ref={videoRef} className="video-js" />
      </div>
    </>
  )
}