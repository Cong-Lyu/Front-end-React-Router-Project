import styles from './Header.module.css'
import { Form, Link, Outlet, useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { 
  AcademicCapIcon, 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon,
  GiftIcon,
  EnvelopeIcon,
  BarsArrowUpIcon,
  StarIcon,
  ClockIcon,
  LightBulbIcon,
  ArrowUpTrayIcon,
  GiftTopIcon, 
  XMarkIcon
} from '@heroicons/react/24/solid'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { onSuccess, onError } from '../../util/googleLogInEventHandlers.js'

export function Header() {
  const isLoggedIn = useLoaderData()
  
  return (
    <>
      <HeaderElems isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  )
}

function HeaderElems(props) {
  const isLoggedIn = props.isLoggedIn
  const [showLogIn, setShowLogIn] = useState(false)
  function showLogInElems() {if(!isLoggedIn) {setShowLogIn(true)}}
  function closeLogInElems() {if(showLogIn) {setShowLogIn(false)}}
  function clearUser() {if(isLoggedIn) {localStorage.clear(); window.location.reload()}}

  return (
    <>
      <header className={styles.header}>
        <div className={styles.iconsContainer}>
          <div className={styles.leftContainer}>
            <Link to='/' className={styles.homePageContainer}>
              <AcademicCapIcon className={styles.icon}/>
              <p>home</p>
            </Link>
            <Link className={styles.prompt}>
              <p>lives</p>
            </Link>
            <Link className={styles.prompt}>
              <p>games</p>
            </Link>
            <Link className={styles.prompt}>
              <p>vip column</p>
            </Link>
            <Link className={styles.prompt}>
              <p>anime</p>
            </Link>
            <Link className={styles.prompt}>
              <p>gaming</p>
            </Link>
            <Link className={styles.downloadMobileappContainer}>
              <ArrowDownTrayIcon className={styles.icon}/>
              <p>app download</p>
            </Link>
          </div>
          <Form className={styles.middleContainer}>
            <input className={styles.searchBar} />
            <button className={styles.searchButton}>
              <MagnifyingGlassIcon className={styles.searchIcon}/>
            </button>
          </Form>
          <div className={styles.rightContainer}>
            {isLoggedIn 
            ? <button onClick={clearUser} className={styles.logOutButton}>log out</button> 
            : <button onClick={showLogInElems} className={styles.logInButton}>log in</button>}
            <div className={styles.subContainer}>
              <Link to='vip'>
                <GiftIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.subContainer}>
              <Link to='premiumVideos'>
                <GiftTopIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.subContainer}>
              <Link>
                <EnvelopeIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.subContainer}>
              <Link>
                <BarsArrowUpIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.subContainer}>
              <Link>
                <StarIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.subContainer}>
              <Link>
                <ClockIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.subContainer}>
              <Link to='/creation'>
                <LightBulbIcon className={styles.icon}/>
              </Link>
            </div>
            <Link className={styles.uploadContainer}>
              <ArrowUpTrayIcon className={styles.icon}/>
              <p>upload</p>
            </Link>
          </div>
        </div>
      </header>
      {showLogIn && 
      <div className={styles.logInCover} >
        <div className={styles.logInWindow} >
          <button className={styles.logInWindowClose} onClick={closeLogInElems} ><XMarkIcon /></button>
            <h2 style={{marginTop: '50px'}} >Select your way</h2>
            <GoogleOAuthProvider clientId="921371467501-6a2oag4udjf0a2u1db7a4n7teuk26q63.apps.googleusercontent.com" locale="en">
              <GoogleLogin onSuccess={onSuccess} onError={onError} size='medium' />
            </GoogleOAuthProvider>         
        </div>
      </div>}
    </>
  )
}

