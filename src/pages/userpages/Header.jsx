import styles from './Header.module.css'
import { Form, Link, redirect } from 'react-router-dom'
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

export function Loader() {
  const isLoggedIn = false
  if(!isLoggedIn) {
    throw redirect('/login')
  }
}

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.iconsContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.homePageContainer}>
              <Link className={styles.prompt}>
                <AcademicCapIcon className={styles.icon}/>
                <p>首页</p>
              </Link>
            </div>
              <Link className={styles.prompt}>
                <p>直播</p>
              </Link>
              <Link className={styles.prompt}>
                <p>游戏中心</p>
              </Link>
              <Link className={styles.prompt}>
                <p>会员购</p>
              </Link>
              <Link className={styles.prompt}>
                <p>漫画</p>
              </Link>
              <Link className={styles.prompt}>
                <p>赛事</p>
              </Link>
            <div className={styles.downloadMobileappContainer}>
              <Link className={styles.prompt}>
              <ArrowDownTrayIcon className={styles.icon}/>
              <p>下载客户端</p>
              </Link>
            </div>
          </div>
          <div className={styles.middleContainer}>
            <Form>
              <input className={styles.searchBar} />
              <button className={styles.searchButton}>
                <MagnifyingGlassIcon className={styles.searchIcon}/>
              </button>
            </Form>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.subContainer}>
              <Link to='/vip'>
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
              <Link>
                <LightBulbIcon className={styles.icon}/>
              </Link>
            </div>
            <div className={styles.uploadContainer}>
              <Link>
                <ArrowUpTrayIcon className={styles.icon}/>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

