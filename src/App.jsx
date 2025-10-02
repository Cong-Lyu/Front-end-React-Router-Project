import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Header } from './pages/userpages/Header.jsx'
import { Premium } from './pages/publicpages/Premium.jsx'
import { SubHeader } from './pages/publicpages/subHeader.jsx'
import { Videos, loader as videoLoader } from './pages/publicpages/Videos.jsx'
import { CreationUpload } from './pages/userpages/creationUpload.jsx'
import { VideoPlaying } from './pages/publicpages/VideoPlaying.jsx'
import { PremiumPayment, Loader as paymentLoader } from './pages/publicpages/PremiumPayment.jsx'
import { PremiumVideos } from './pages/publicpages/PremiumVideos.jsx'
import { PremiumVideoPlaying, Loader as premiumVideoLoader } from './pages/userpages/PremiumVideoPlaying.jsx'
import { UserSubHeader, Loader as userPageLoader } from './pages/userpages/UserSubHeader.jsx'
import { UserPage } from './pages/userpages/UserPage.jsx'
import { MyVideos, loader as userIdLoader  } from './pages/userpages/MyVideos.jsx'

function App() {
  const router = createBrowserRouter(createRoutesFromElements( //test jenkins push
    <>
    <Route path='/' loader={paymentLoader} element={<Header />}>
      <Route element={<SubHeader />}>
        <Route index loader={videoLoader} element={<Videos defaultPage={true}/>} />
        <Route path=':type' loader={videoLoader} element={<Videos defaultPage={false}/>}>
          <Route path='video' loader={videoLoader} element={<VideoPlaying />} />
        </Route>
        <Route path='video' loader={videoLoader} element={<VideoPlaying />} />
      </Route>

      <Route loader={userPageLoader} element={<UserSubHeader />}>
        <Route path='userPage' element={<UserPage />} />
        <Route path='upload' element={<CreationUpload />} />
        <Route path='myVideos' loader={userIdLoader} element={<MyVideos />} />
      </Route>
      <Route path='premiumVideoPlaying' loader={premiumVideoLoader} element={<PremiumVideoPlaying />} />
      <Route path='premium' loader={paymentLoader} element={<Premium />} />
      <Route path='premiumVideos' loader={videoLoader} element={<PremiumVideos />} />
    </Route>
    <Route path='premiumPayment' loader={paymentLoader} element={<PremiumPayment />}/>
    </>
  )) 

  return (
    <RouterProvider router={router}/>
  )
}

export default App
