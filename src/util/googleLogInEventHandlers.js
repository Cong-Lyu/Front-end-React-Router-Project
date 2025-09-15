export async function onSuccess(response) {
  const url = import.meta.env.VITE_REACT_APP_API_URL || `http://localhost:5000`
  const request = await fetch(`${url}/api/jwt/logIn`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify({token: response.credential})
  })
  const result = await request.json()
  localStorage.setItem('googleJwt', result['googleJwt'])
  localStorage.setItem('myJwt', result['myJwt'])

  window.location.reload()
}

export function onError() {
  alert('Log in failed!')
}