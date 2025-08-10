import { Link, Outlet } from "react-router-dom";
import { 
  AcademicCapIcon
} from '@heroicons/react/24/solid'
import styles from './creationLeftBar.module.css'



export function CreationLeftBar() {
  return (
    <>
      <div className={styles.topBar}>
        <div>
          <Link to='/'>{<AcademicCapIcon className={styles.homePageIcon}/>}</Link>
          <div>Home</div>
        </div>
        
      </div>
      <div className={styles.leftBar}>
        <div>upload</div>
        <div>home</div>
        <div>content management</div>
        <div>data center</div>
      </div>
      <Outlet />
    </>
  )
}