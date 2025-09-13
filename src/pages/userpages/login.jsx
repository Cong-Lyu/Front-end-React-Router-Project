import { Form, Link, redirect } from "react-router-dom"
import styles from './login.module.css'
import { useState } from "react"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { onSuccess, onError } from '../../util/googleLogInEventHandlers.js'

export function Login() {
  const [logInOption, setLogInOption] = useState(true)
  
  return (
    <>
    <Link to='/'>Back to Home</Link>
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        <div className={styles.leftContainer}>
          <p style={{marginBottom: '20px'}} className={styles.qrPrompt1}>
            login by QR code
          </p>
          <div className={styles.qrContainer}>
            <img className={styles.qrCodeImg} src="/pictures/app-pictures/loginQR.jpg" />
            <p style={{fontSize: '14px', marginTop: '20px'}} className={styles.qrPrompt2}>
              Please scan with <span>your device</span> to login or download the app
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.loginOptionContainer1}>
            <button onClick={() => {setLogInOption(true)}} style={{cursor: logInOption ? 'not-allowed' : 'pointer', color: logInOption ? 'blue' : 'black'}} className={styles.logInOption}>
              login with password
            </button>
            <button onClick={() => {setLogInOption(false)}} style={{cursor: logInOption ? 'pointer' : 'not-allowed', color: logInOption ? 'black' : 'blue'}} className={styles.logInOption}>
              login with Email token
            </button>
          </div>
          <Form method="post" className={styles.formContainer}>
            <div style={{borderBottom: 'none', borderBottomRightRadius: '0', borderBottomLeftRadius: '0'}} className={styles.inputContainer}>
              <p className={styles.inputPrompt}>{logInOption ? 'username' : 'email'}</p>
              <input className={styles.input} name='email' placeholder={logInOption ? 'your email address' : 'your email'}/>
            </div>
            <div style={{borderTopRightRadius: '0', borderTopLeftRadius: '0', marginBottom: '20px'}} className={styles.inputContainer}>
              <p className={styles.inputPrompt}>{logInOption ? 'password' : 'token'}</p>
              <input type={logInOption ? 'password' : 'text'} name={logInOption ? 'password' : 'tokenInput'} className={styles.input} placeholder={logInOption ? 'password here' : 'check your inbox for an one-time token'}/>
              {logInOption || <button formMethod="POST" type="submit" name='button' value='tokenFunction' className={styles.tokenButton}>get token</button>}
            </div>
            <div style={{marginBottom: '20px'}} className={styles.formButtonsContainer}>
              <button type={logInOption ? 'button' : 'submit'} onClick={logInOption ? (event) => {event.preventDefault(); setLogInOption(false)} : undefined} name="button" value='logInWithToken' className={styles.signUp}>sign up</button>
              {logInOption && <button type="submit" className={styles.logIn}>go!</button>}
            </div>
          </Form>
          <div style={{marginBottom: '16px'}}>
            login with other options
          </div>
          <div className={styles.loginOptionContainer2}>
            <GoogleOAuthProvider clientId="921371467501-6a2oag4udjf0a2u1db7a4n7teuk26q63.apps.googleusercontent.com" locale="en">
              <GoogleLogin onSuccess={onSuccess} onError={onError}/>
            </GoogleOAuthProvider>
            
            <Link className={styles.link}>
              login with facebook
            </Link>
            <Link className={styles.link}>
              login with xxx
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.policy}>
        By logging in, you agree with our <span className={styles.userPolicy}>user policy</span> and <span className={styles.userPolicy}>privacy policy</span>
      </div>
    </div>
    </>
  )
} 