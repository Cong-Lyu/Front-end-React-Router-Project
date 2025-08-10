import styles from './Header.module.css'
import { Form, Link, Outlet, redirect } from 'react-router-dom'
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
  ArrowUpTrayIcon
} from '@heroicons/react/24/solid'

// export function Loader() {
//   const isLoggedIn = false
//   if(!isLoggedIn) {
//     throw redirect('/login')
//   }
// }

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.iconsContainer}>
          <div className={styles.leftContainer}>
            <Link className={styles.homePageContainer}>
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
            <button className={styles.logInButton}>log in</button>
            <div className={styles.subContainer}>
              <Link to='vip'>
                <GiftIcon className={styles.icon}/>
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
      <Outlet />
    </>
  )
}

