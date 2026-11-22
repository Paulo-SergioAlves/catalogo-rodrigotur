import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

function DismissSplash() {
  React.useEffect(() => {
    const splash = document.getElementById('boot-splash')
    if (!splash || splash.dataset.dismissScheduled === 'true') return
    splash.dataset.dismissScheduled = 'true'

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        splash.classList.add('is-exiting')
        const finish = () => {
          document.getElementById('root')?.removeAttribute('inert')
          splash.remove()
        }
        if (reduceMotion) finish()
        else window.setTimeout(finish, 300)
      }))
    }, reduceMotion ? 0 : 750)
  }, [])

  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <DismissSplash />
  </React.StrictMode>,
)
