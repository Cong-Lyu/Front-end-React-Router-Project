import { useState } from 'react'
import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Header } from './pages/userpages/Header.jsx'
import { Login, action as logInAction} from './pages/userpages/login.jsx'
import { Vip, Loader } from './pages/userpages/Vip.jsx'
import { SubHeader } from './pages/publicpages/subHeader.jsx'
import { Videos, loader as videoLoader } from './pages/publicpages/Videos.jsx'
import { CreationLeftBar } from './pages/userpages/creationLeftBar.jsx'
import { CreationUpload, action as uploadAction, loader as creationLoader } from './pages/userpages/creationUpload.jsx'
import { VideoPlaying } from './pages/publicpages/VideoPlaying.jsx'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' element={<Header />}>
      <Route element={<SubHeader />}>
        <Route index loader={videoLoader} element={<Videos defaultPage={true}/>} />
        <Route path=':type' loader={videoLoader} element={<Videos defaultPage={false}/>}>
          <Route path='video' loader={videoLoader} element={<VideoPlaying />} />
        </Route>
        <Route path='video' loader={videoLoader} element={<VideoPlaying />} />
      </Route>

      <Route path='vip' loader={Loader} element={<Vip />} />
    </Route>
    <Route action={logInAction} path='/login' element={<Login />}/>
    <Route element={<CreationLeftBar />}>
      <Route loader={creationLoader} action={uploadAction} path='/creation' element={<CreationUpload />} /> 
    </Route>
    </>
  )) 

  return (
    <RouterProvider router={router}/>
  )
}

export default App
