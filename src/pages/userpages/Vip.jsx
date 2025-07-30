import { Link, redirect } from 'react-router-dom'

export async function Loader() {
  const token = JSON.parse(localStorage.getItem('latestUser') || '{}')['user-token']
  if(token) {
    const varify = await fetch('http://localhost:5000/api/token/tokenVarify', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'user-token': token
      })
    })
    const result = await varify.json()
    console.log(result)
    if(!result['token-status']) {
      throw redirect('/login')
    }
  }
  else {
    throw redirect('/login')
  }
}

export function Vip() {
  return (
    <>
      <div>This is the vip page!</div>
    </>
  )
}