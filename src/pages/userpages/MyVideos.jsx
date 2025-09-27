import styles from './MyVideos.module.css'
import { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'

export async function loader() {
  const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
  const getPic = await fetch(`${url}/api/public/general?amount=16`)
  const result = await getPic.json()

  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  const getUserId = await fetch(`${url}/api/jwt/jwtVarify`, {
    method: 'GET',
    headers: {
      'X-Google-Jwt': googleJwt,
      'X-My-Jwt': myJwt
    }
  })
  const userId = await getUserId.json()
  return [result['pictureList'], userId['userId']]
}

export function MyVideos() {
  const [firstList, userId] = useLoaderData()
  console.log(firstList, userId)
  const [list, setList] = useState(firstList)
  const lastPicName = list[list.length - 1]

  return (
    <>
      <MyVideosList list={list} userId={userId}/>
    </>
  )
}

function MyVideosList(props) {
  const list = props.list
  const userId = props.userId
  const downloadUrl = `https://shirahama-imgs.s3.ap-southeast-2.amazonaws.com/pictures/video-pictures`
  let folderName = 'homePageVideos/'
  const generalPicPath = downloadUrl + '/general/' + folderName
  
  function imgGenerator(nums) {
    const picList = []
    for(let i = 0; i < nums; i++) {
      picList.push(
      <Link to={`/video?videoId=${userId}`} className={styles.container} >
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
      <main className={styles.main}>
        {imgGenerator(list.length)}
      </main>
    </>
  )
}