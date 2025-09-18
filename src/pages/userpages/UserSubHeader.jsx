import { Link, Outlet, NavLink, useLoaderData, redirect } from "react-router-dom"
import { 
  AcademicCapIcon
} from '@heroicons/react/24/solid'
import styles from './UserSubHeader.module.css'

export async function Loader() {
  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  try {
    const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
    const userInfoFetch = await fetch(`${url}/api/jwt/userInfo`, {
      // credentials: 'include',
      method: 'GET',
      headers: {
        'X-Google-Jwt': googleJwt,
        'X-My-Jwt': myJwt
      }
    })
    const result = await userInfoFetch.json()
    if(result['status']) {
      const userInfo = result['userInfo']
      return userInfo
    }
    else{alert('please log in first'); throw redirect('/')}
  }
  catch(err) {
    console.log(err)
    throw redirect('/')
  }
}

export function UserSubHeader() {
  const userInfo = useLoaderData()

  return (
    <>
      <UserSubHeaderElems userInfo={userInfo} />
      <Outlet />
    </>
  )
}

function UserSubHeaderElems(props) {
  const userInfo = props.userInfo

  return (
    <>
      <div className={styles.subHeader} >
        <div className={styles.upperContainer} >
          <img className={styles.userProfileImg} src={userInfo.userImg?.replace('-c', '')} alt={userInfo.userName} />
          <h1 className={styles.userName} >{userInfo['userName']}</h1>
          <AcademicCapIcon style={{color: userInfo.userRole === 'premium' ? 'orange' : 'grey'}} className={styles.premiumIcon} />
        </div>
        
        <div className={styles.lowerContainer} >
          <div className={styles.leftContainer} >
            <NavLink to='https://google.com' style={({isActive}) => ({color: isActive ? 'orange' : 'black'})} className={styles.userSubHeaderLink} >Home</NavLink>
            <NavLink to='https://google.com' style={({isActive}) => ({color: isActive ? 'orange' : 'black'})} className={styles.userSubHeaderLink} >my videos</NavLink>
            <NavLink to='https://google.com' style={({isActive}) => ({color: isActive ? 'orange' : 'black'})} className={styles.userSubHeaderLink} >liked videos</NavLink>
            <NavLink to='https://google.com' style={({isActive}) => ({color: isActive ? 'orange' : 'black'})} className={styles.userSubHeaderLink} >settings</NavLink>
          </div>
          <div className={styles.rightContainer} >
            <div className={styles.followAndLike} >
              <Link className={styles.userSubHeaderLink} >follower</Link>
              <p>3</p>
            </div>
            <div className={styles.followAndLike} >
              <Link className={styles.userSubHeaderLink} >following</Link>
              <p>6</p>
            </div>
            <div className={styles.followAndLike} >
              <Link className={styles.userSubHeaderLink} >received likes</Link>
              <p>600</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}