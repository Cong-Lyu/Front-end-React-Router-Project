import { Form, Link } from "react-router-dom"
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
import styles from './PremiumPayment.module.css'
import { getFormattedDate } from '../../util/getDateByMonth.js'

export async function Loader() {
  const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
  const googleJwt = localStorage.getItem('googleJwt')
  const myJwt = localStorage.getItem('myJwt')
  try {
    const varify = await fetch(`${url}/api/jwt/jwtVarify`, {
      // credentials: 'include',
      method: 'GET',
      headers: {
        'X-Google-Jwt': googleJwt,
        'X-My-Jwt': myJwt
      }
    })
    const result = await varify.json()
    console.log(result)
    if(!result['status']) {return false}
    return true
  }
  catch(err) {
    return false
  }
}

export function PremiumPayment() {
  const temp = new URLSearchParams(location.search)
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  
  return (
    <Elements stripe={stripePromise}>
      <Checkout option = {temp.get('option')}/>
    </Elements>
  )
}

function Checkout(props) {
  const option = props.option
  const plans = ['Yourself-only', 'Family-set', 'Two-people', 'Student-plan']
  const amount = [1599, 3899, 2499, 999]
  const [length, setLength] = useState(1)
  const stripe = useStripe()
  const elements = useElements()
  
  function handleAdd() {setLength(length + 1)}
  function handleSub() {if(length - 1 === 0) {alert('The minimum length is 1 month.')} else {setLength(length - 1)}}
  async function onSubmit(e) {
    try {
      e.preventDefault()
      const card = elements.getElement(CardElement)
      const { error, paymentMethod } = await stripe.createPaymentMethod({type: "card", card})
      if (error) {alert(error.message); return}
      const googleJwt = localStorage.getItem('googleJwt')
      const myJwt = localStorage.getItem('myJwt')
      const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
      const body = {
        'start-date': getFormattedDate(0), 
        'end-date': getFormattedDate(length), 
        'length': length, 
        'premiumType': plans[option],
        'paymentId': paymentMethod.id,
        'returnUrl': window.location.origin
      }
      const request = await fetch(url + `/api/premium/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Google-Jwt': googleJwt,
          'X-My-Jwt': myJwt
        },
        body: JSON.stringify(body)
      })
      const result = await request.json()
      console.log(result['payment-status'])
      if(result['payment-status']) {
        localStorage.setItem('googleJwt', result['googleJwt'])
        localStorage.setItem('myJwt', result['myJwt'])
        window.location.href = '/'
      }
      else {alert(result['error'])}
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <main className={styles.main} >
        <h2>Confirm your order here:</h2>
        <div className={styles.optionDetail} >
          <p>user:</p>
          <p>test user A</p>
        </div>
        <div className={styles.optionDetail} >
          <p>premium type:{}</p>
          <p>{plans[option]}</p>
        </div>
        <div className={styles.optionDetail} >
          <p>amount:</p>
          <p>{`$${amount[option] * length / 100}`}</p>
        </div>
        <div className={styles.optionDetail} >
          <p>start date:</p>
          <p>{getFormattedDate(0)}</p>
        </div>
        <div className={styles.optionDetail} >
          <p>end date:</p>
          <p>{getFormattedDate(length)}</p>
        </div>
        <div className={styles.optionDetail} style={{marginBottom: '50px'}} >
          <p>length</p>
          <div className={styles.lengthButton} >
            <button className={styles.adjustButton} onClick={handleSub} >-</button>
            <p>{length}</p>
            <button className={styles.adjustButton} onClick={handleAdd}>+</button>
          </div>
        </div>
        <Form onSubmit={onSubmit} className={styles.form} >
          <h2 className={styles.paymentTitle} >Complete your payment</h2>
          <CardElement options={{style: { base: { fontSize: '16px', color: '#32325d' }}, disableLink: true}} />
          <div className={styles.formButtons} >
            <Link to='/premium' className={styles.cancelLink} >cancel payment</Link>
            <button className={styles.submitButton} >Confirm</button>
          </div>
        </Form>
      </main>
    </>
  )
}