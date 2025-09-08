import videojs from "video.js"
import 'video.js/dist/video-js.css'
import { useRef, useEffect } from "react"
import 'videojs-youtube'

export function VideoPlaying() {
  const videoRef = useRef(null)
  const playRef = useRef(null)
  const videoSrc = 'https://www.youtube.com/watch?v=cBvtC5qPac0'

  useEffect(() => {
    const id = setTimeout(() => {
      if(videoRef.current) {
        playRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
          fluid: true,
          techOrder: ['youtube'],
          sources: [{
            type: 'video/youtube',
            src: videoSrc
          }],
          youtube: {
            modestbranding: true,
            rel: 0,
            showinfo: false
          }
        })

        // playRef.current.src({
        //   src: '',
        //   type: 'video/mp4'
        // })
      }
    }, 10)
    
    
    return () => {
      clearTimeout(id)
      if(playRef.current) {playRef.current.dispose(); playRef.current = null}
      if(videoRef.current) {videoRef.current.innerHTML = ''}
    }
  }, [])

  return (
    <>
      <div>
        <div data-vjs-player>
          <video ref={videoRef} className="video-js" width='400px' height='600px' />
        </div>
      </div>
    </>
  )
}