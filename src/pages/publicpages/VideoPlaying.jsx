import videojs from "video.js"
import 'video.js/dist/video-js.css'
import { useRef, useEffect, useState } from "react"
import { useLoaderData, Link, useLocation } from "react-router-dom"
import 'videojs-youtube'
import { 
  PlayIcon,
  NoSymbolIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/solid'
import styles from './VideoPlaying.module.css'

export function VideoPlaying() {
  const location = useLocation() 
  const searchParams = new URLSearchParams(location.search) 
  const videoId = searchParams.get('videoId')  
  console.log(videoId)
  
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
      <main className={styles.main}>
        <div className={styles.leftContainer} >
          <h1 className={styles.videoTitle} >{videoId ? videoId : `鄭融《終生學習》`}</h1>
          <div className={styles.titleContainer} >
            <PlayIcon className={styles.Icon} />
            <p className={styles.videoInfo} style={{ marginRight: '8px'}}>845K</p>
            <p className={styles.videoInfo} style={{ marginRight: '14px'}}>2025-09-09</p>
            <NoSymbolIcon className={styles.Icon} />
            <p className={styles.videoInfo} >Do not share without permission</p>
          </div>
          <VideoElem videoId={videoId} />
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
      <Link 
        to={`/video?videoName=testVideo1`} 
        onClick={(e) => {
          e.preventDefault()
          window.location.href = `/video?videoName=testVideo1`
        }}
        className={styles.subVideoContainer} >
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

function VideoElem(props) {
  const videoId = props.videoId
  console.log(videoId)
  const videoRef = useRef(null)
  const playRef = useRef(null)
  const videoSrc = videoId ? `https://shirahama-videos.s3.ap-southeast-2.amazonaws.com/${videoId}` : 'https://www.youtube.com/watch?v=cBvtC5qPac0'

  useEffect(() => {
    const id = setTimeout(() => {
      if(videoRef.current) {
        playRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
          fluid: true,
          techOrder: videoId ?  ['html5'] : ['youtube'],
          sources: [{
            type: videoId ? 'video/mp4' : 'video/youtube',
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