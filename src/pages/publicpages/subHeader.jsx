import { Link, Outlet, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { 
  FireIcon,
  BarsArrowUpIcon,
  NewspaperIcon,
  FlagIcon,
  ChatBubbleLeftRightIcon,
  PlayCircleIcon,
  BookOpenIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/solid'
import styles from './subHeader.module.css'
import { SelectorContainer } from './selectorContainer'

export function SubHeader() {
  const [selectorNum, setSelectorNum] = useState(18)
  const location = useLocation()
  const isDisplay = !location.pathname.includes('/video')
  useEffect(() => {
    function handleResize() {
      if(window.innerWidth < 1366) {
        setSelectorNum(14)
      }
      else {
        setSelectorNum(18)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {window.removeEventListener('resize', handleResize)}
  }, [])

  return (
    <>
      {isDisplay && <SelectorDisplay selectorNum={selectorNum} />}
      <Outlet />
    </>
  )
}

function SelectorDisplay(props) {
  const selectorNum = props.selectorNum
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.leftBox}>
            <BarsArrowUpIcon className={styles.leftIcon1}/>
            <p className={styles.leftPrompt}>live updates</p>
          </div>
          <div className={styles.leftBox}>
            <FireIcon className={styles.leftIcon2}/>
            <p className={styles.leftPrompt}>hot videos</p>
          </div>
        </div>
        <SelectorContainer selectorNum = {selectorNum}/>
        <div className={styles.rightContainer}>
          <div className={styles.rightSubContainer}><NewspaperIcon className={styles.rightIcons}/><p>column</p></div>
          <div className={styles.rightSubContainer}><FlagIcon className={styles.rightIcons}/><p>activities</p></div>
          <div className={styles.rightSubContainer}><ChatBubbleLeftRightIcon className={styles.rightIcons}/><p>community</p></div>
          <div className={styles.rightSubContainer}><PlayCircleIcon className={styles.rightIcons}/><p>streams</p></div>
          <div className={styles.rightSubContainer}><BookOpenIcon className={styles.rightIcons}/><p>tutorials</p></div>
          <div className={styles.rightSubContainer}><MusicalNoteIcon className={styles.rightIcons}/><p>hot songs</p></div>
        </div>
      </div>
    </>
  )
}