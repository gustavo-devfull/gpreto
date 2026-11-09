import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './Landing'
import Admin from './admin/Admin'
import './styles.css'
const App = () => {
  const [route, setRoute] = useState(location.hash)
  useEffect(() => { const f = () => setRoute(location.hash); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return route.startsWith('#/admin') ? <Admin /> : <Landing />
}
createRoot(document.getElementById('root')).render(<App />)
