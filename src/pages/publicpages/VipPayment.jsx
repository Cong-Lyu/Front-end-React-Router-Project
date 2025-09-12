import { Form, useLocation, Link } from "react-router-dom"
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"
import styles from './VipPayment.module.css'
import { getFormattedDate } from '../../util/getDateByMonth.js'

export function VipPayment() {
  const option = useLocation()
  const temp = new URLSearchParams(location.search)
  
  const stripePromise = loadStripe('pk_test_你的测试Key')
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
  
  function handleAdd() {setLength(length + 1)}
  function handleSub() {if(length - 1 === 0) {alert('The minimum length is 1 month.')} else {setLength(length - 1)}}

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
        <Form className={styles.form} >
          <h2 className={styles.paymentTitle} >Complete your payment</h2>
          <CardElement options={{style: { base: { fontSize: '16px', color: '#32325d' } }}}/>
          <div className={styles.formButtons} >
            <Link to='/Vip' className={styles.cancelLink} >cancel payment</Link>
            <button className={styles.submitButton} >Confirm</button>
          </div>
        </Form>
      </main>
    </>
    
  )
}