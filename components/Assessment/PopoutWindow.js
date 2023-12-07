import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export default function PopoutWindow({ children, setWindowClosed, title }) {
  const [containerElement, setContainerElement] = useState()
  useEffect(() => {
    const features = 'width=800, height=500, left=300, top=200'
    const extWindow = window.open('', '', features)
    let containerEle = null
    if (extWindow) {
      containerEle = extWindow.document.createElement('div')
      extWindow.document.body.appendChild(containerEle)
      extWindow.document.title = title
      extWindow.addEventListener('beforeunload', () => {
        setWindowClosed()
      })
    } else {
      setWindowClosed()
    }
    setContainerElement(containerEle)
    return () => {
      if (extWindow) {
        extWindow.close()
      }
    }
  }, [title, setWindowClosed])
  return containerElement ? ReactDOM.createPortal(children, containerElement) : null
}
