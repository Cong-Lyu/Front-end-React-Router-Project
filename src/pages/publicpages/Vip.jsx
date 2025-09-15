import { Link, redirect, useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import { 
  AcademicCapIcon,
  UserPlusIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { onSuccess, onError } from '../../util/googleLogInEventHandlers.js'
import styles from './Vip.module.css'

export function Vip() {
  const isLoggedIn = useLoaderData()
  
  return (
    <>
      <VipPageElements isLoggedIn={isLoggedIn} />
    </>
  )
}

function VipPageElements(props) {
  const isLoggedIn = props.isLoggedIn
  const [showLogIn, setShowLogIn] = useState(false)
  function showLogInElems(e) {if(!isLoggedIn) {setShowLogIn(true); e.preventDefault()}}
  function closeLogInElems() {if(showLogIn) {setShowLogIn(false)}}

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
              <Link to={`/premiumPayment?option=${0}`} onClick={showLogInElems} className={styles.paymentLink} >Pick this option</Link>
            </div>
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><UserPlusIcon className={styles.icon2} style={{marginRight: '10px'}} />Family-set</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$38.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${1}`} onClick={showLogInElems} className={styles.paymentLink} >Pick this option</Link>
            </div>
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><UserPlusIcon className={styles.icon2} style={{marginRight: '10px'}} />Two-people</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$24.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${2}`} onClick={showLogInElems} className={styles.paymentLink} >Pick this option</Link>
            </div>
            <div className={styles.options} >
              <div className={styles.optionSubTitle} ><AcademicCapIcon className={styles.icon2} style={{marginRight: '10px'}} />Student-plan</div>
              <p className={styles.des} >Monthly</p>
              <p className={styles.des} style={{fontSize: '18px', margin: '0px'}} >$9.99/month</p>
              <p className={styles.des} >1 month free trial</p>
              <p className={styles.des} style={{marginBottom: '30px'}} >policies apply</p>
              <button className={styles.tryButton2} >Try 1 month for free</button>
              <Link to={`/premiumPayment?option=${3}`} onClick={showLogInElems} className={styles.paymentLink} >Pick this option</Link>
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