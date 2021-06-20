import ReactGA from 'react-ga'
import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import logo from './logo.svg'
import './App.css'

// const TRACKING_ID = '252869480' // YOUR_OWN_TRACKING_ID
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)

function App() {
  const [clientId, setClientId] = useState()
  const [fingerprint, setFingerprint] = useState()
  useEffect(() => {
    ReactGA.ga(function (tracker) {
      setClientId(tracker.get('clientId'))
    })
    FingerprintJS.load()
      .then((fp) => {
        return fp.get().then((result) => {
          setFingerprint(result.visitorId)
        })
      })
      .catch((err) => {
        window.alert(err.message)
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          GA clientId: <code>{clientId}</code>
        </p>
        <p>
          Fingerprint: <code>{fingerprint}</code>
        </p>
      </header>
    </div>
  )
}

export default App
