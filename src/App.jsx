import { useState } from 'react'
import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Header, Loader as HeaderLoader} from './pages/userpages/Header.jsx'
import { Login, action } from './pages/userpages/login.jsx'
import { Vip, Loader as VipLoader } from './pages/userpages/Vip.jsx'
import { SubHeader } from './pages/publicpages/subHeader.jsx'
import { Videos } from './pages/publicpages/Videos.jsx'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Header />}>
      <Route element={<SubHeader />}>
        <Route path=':type' element={<Videos />}/>
      </Route>

      <Route path='vip' loader={VipLoader} element={<Vip />} />
    </Route>
    <Route action={action} path='/login' element={<Login />}/>
    </>
  )) 

  return (
    <RouterProvider router={router}/>
  )
}

export default App
