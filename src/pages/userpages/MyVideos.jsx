import styles from './MyVideos.module.css'
import { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'

export async function loader() {
  const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
  const getPic = await fetch(`${url}/api/public/general?amount=16`)
  const result = await getPic.json()

  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  const getVideoList = await fetch(`${url}/api/user/userVideoList`, {
    method: 'GET',
    headers: {
      'X-Google-Jwt': googleJwt,
      'X-My-Jwt': myJwt
    }
  })
  const getVideoListResult = await getVideoList.json()
  return [result['pictureList'], getVideoListResult['videoList']]
}

export function MyVideos() {
  const [firstList, videoList] = useLoaderData()
  console.log(firstList, videoList)
  const [list, setList] = useState(firstList)
  const lastPicName = list[list.length - 1]

  return (
    <>
      <MyVideosList list={list} videoList={videoList}/>
    </>
  )
}

function MyVideosList(props) {
  const list = props.list
  const videoList = props.videoList
  const downloadUrl = `https://shirahama-imgs.s3.ap-southeast-2.amazonaws.com/pictures/video-pictures`
  let folderName = 'homePageVideos/'
  const generalPicPath = downloadUrl + '/general/' + folderName
  
  function imgGenerator(nums) {
    const picList = []
    for(let i = 0; i < nums; i++) {
      picList.push(
      <Link to={`/video?videoId=${videoList[i]}`} className={styles.container} >
        <img loading="lazy" className={styles.videoImg} src={generalPicPath + list[i]} />
        <div style={{marginLeft: '-50px'}} >
          <p className={styles.description} >This is the description part</p>
          <p className={styles.description} >
            02/05/2021 
            <span style={{marginLeft: '26px'}} >1.2M views</span> 
          </p>
        </div>
      </Link>)
    }
    return picList
  }

  return (
    <>
      {videoList.length ? 
        <main className={styles.main}>
          {imgGenerator(videoList.length)}
        </main>
        : <EmptyPrompt />
      }
    </>
  )
}

function EmptyPrompt() {
  return (
    <>
      <div className={styles.emptyContainer} >
        <div className={styles.emptyImgContainer} >
          <img className={styles.emptyImg} src='../../../public/empty.jpg' />
          <p className={styles.emptyPrompt} >Waiting for your video......</p>
          <Link to='/upload' className={styles.uploadPrompt} >Upload Now</Link>
        </div>
      </div>
    </>
  ) 
}