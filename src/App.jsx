import { useState } from 'react'
import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Header, Loader } from './pages/userpages/Header.jsx'
import { Login, action } from './pages/userpages/login.jsx'
import { Vip } from './pages/userpages/Vip.jsx'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Header />}>
      <Route path='/vip' loader={Loader} element={<Vip />} />
    </Route>
    <Route action={action} path='/login' element={<Login />}/>
    </>
  )) 

  return (
    <RouterProvider router={router}/>
  )
}

export default App
