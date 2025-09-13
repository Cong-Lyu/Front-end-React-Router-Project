import { Link, redirect } from 'react-router-dom'
import { 
  AcademicCapIcon,
  UserPlusIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid'
import styles from './Vip.module.css'

export function Vip() {
  return (
    <>
      <VipPageElements />
    </>
  )
}

function VipPageElements() {

  return (
    <>
      <main className={styles.main} >
        <div className={styles.description} >
          <div className={styles.titleContainer} ><AcademicCapIcon className={styles.icon1} />Video Premium</div>
          <h1>Enjoy the priviledge as a premium user and get away from ads</h1>
          <p>Videos and Music ad-free, offline, smooth experience</p>
          <p style={{marginBottom: '30px'}} >1 month free trial, plans start from $7.99/month, more benefits come from better plan, cancel anytime</p>
          <button className={styles.tryButton} >Try 1 month for $0</button>
        </div>
        
        <div className={styles.optionsDisplay} >
          <h1 style={{marginBottom: '40px'}} >Pick your plan</h1>
          <div className={styles.optionContainer} >
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><UserIcon className={styles.icon2} style={{marginRight: '10px'}} />Yourself-only</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$15.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${0}`} className={styles.paymentLink} >Pick this option</Link>
            </div>
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><UserPlusIcon className={styles.icon2} style={{marginRight: '10px'}} />Family-set</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$38.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${1}`} className={styles.paymentLink} >Pick this option</Link>
            </div>
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><UserPlusIcon className={styles.icon2} style={{marginRight: '10px'}} />Two-people</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$24.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${2}`} className={styles.paymentLink} >Pick this option</Link>
            </div>
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><AcademicCapIcon className={styles.icon2} style={{marginRight: '10px'}} />Student-plan</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$9.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${3}`} className={styles.paymentLink} >Pick this option</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.comparison} >
          <p></p>
          <div>
            <h2>Free-plan</h2>
          </div>
          <div>
            <h2 style={{margin: '0'}}>Premium</h2>
            <p style={{fontWeight: 'bold', marginTop: '10px', marginBottom: '10px', fontSize: '20px'}} >$15.99/month</p>
            <p style={{margin: '0'}}>flexible cancel</p>
          </div>
          <p>watching videos without ad</p>
          <XCircleIcon className={styles.icon3} />
          <CheckCircleIcon className={styles.icon3} />
          <p>download videos</p>
          <XCircleIcon className={styles.icon3} />
          <CheckCircleIcon className={styles.icon3} />
          <p>music without ad</p>
          <XCircleIcon className={styles.icon3} />
          <CheckCircleIcon className={styles.icon3} />
        </div>

        <div className={styles.qAndA} >
          <h1>Q&A</h1>
          <details>
            <summary>What can I have with premium?</summary>
            <p>1.xxx</p>
            <p>2.xxx</p>
            <p>3.xxx</p>
          </details>
          <details>
            <summary>How can I cancel my premium plan?</summary>
            <p>1.xxx</p>
            <p>2.xxx</p>
            <p>3.xxx</p>
          </details>
          <details>
            <summary>What are the premium policies?</summary>
            <p>1.xxx</p>
            <p>2.xxx</p>
            <p>3.xxx</p>
          </details>
        </div>
      </main>
    </>
  )
}