import { useState } from 'react'
import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Header } from './pages/userpages/Header.jsx'
import { Premium } from './pages/publicpages/Premium.jsx'
import { SubHeader } from './pages/publicpages/subHeader.jsx'
import { Videos, loader as videoLoader } from './pages/publicpages/Videos.jsx'
import { CreationLeftBar } from './pages/userpages/creationLeftBar.jsx'
import { CreationUpload, action as uploadAction, loader as creationLoader } from './pages/userpages/creationUpload.jsx'
import { VideoPlaying } from './pages/publicpages/VideoPlaying.jsx'
import { PremiumPayment, Loader as paymentLoader } from './pages/publicpages/PremiumPayment.jsx'
import { PremiumVideos } from './pages/publicpages/PremiumVideos.jsx'
import { PremiumVideoPlaying, Loader as premiumVideoLoader } from './pages/userpages/PremiumVideoPlaying.jsx'

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path='/' loader={paymentLoader} element={<Header />}>
      <Route element={<SubHeader />}>
        <Route index loader={videoLoader} element={<Videos defaultPage={true}/>} />
        <Route path=':type' loader={videoLoader} element={<Videos defaultPage={false}/>}>
          <Route path='video' loader={videoLoader} element={<VideoPlaying />} />
        </Route>
        <Route path='video' loader={videoLoader} element={<VideoPlaying />} />
      </Route>

      <Route path='premiumVideoPlaying' loader={premiumVideoLoader} element={<PremiumVideoPlaying />} />
      <Route path='premium' loader={paymentLoader} element={<Premium />} />
      <Route path='premiumVideos' loader={videoLoader} element={<PremiumVideos />} />
    </Route>
    <Route path='premiumPayment' loader={paymentLoader} element={<PremiumPayment />}/>
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
