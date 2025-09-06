import { Link, redirect } from 'react-router-dom'

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
    if(!result['status']) {
      throw redirect('/login')
    }
  }
  catch(err) {
    console.log(err)
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