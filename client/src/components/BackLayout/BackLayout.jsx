import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ALL_MODAL_CLOSE } from "../../redux/types/modal"

export default function BackLayout({placemarkFormCloseHandler}) {

  
  const dispatch = useDispatch()
  function handler(e) {
    if (e.key === "Escape") {
      placemarkFormCloseHandler()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  },[])

  return (
    <>
    <div className='backLayout' onClick={placemarkFormCloseHandler}></div> : ''
    </>
  )
}
