import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import { useEffect, useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './components/Notifications/Notifications.css'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'

const notificationIcon = ({ type }) => (
  <span className={`plateful-toast-icon plateful-toast-icon--${type}`} aria-hidden="true">
    <svg viewBox="0 0 24 24">
      {type === 'success' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8 12.2 2.6 2.6 5.5-5.7" />
        </>
      )}
      {type === 'error' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m9 9 6 6m0-6-6 6" />
        </>
      )}
      {type === 'warning' && (
        <>
          <path d="M12 3.5 21 19H3l9-15.5Z" />
          <path d="M12 9v4m0 3h.01" />
        </>
      )}
      {type === 'info' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 11v5m0-8h.01" />
        </>
      )}
    </svg>
  </span>
)

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsInitialLoading(false), 1600)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {isInitialLoading && <LoadingScreen />}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <ToastContainer
          className="plateful-toast-container"
          toastClassName={({ type }) => `plateful-toast plateful-toast--${type || 'default'}`}
          bodyClassName="plateful-toast-body"
          progressClassName="plateful-toast-progress"
          icon={notificationIcon}
          position="top-right"
          autoClose={3800}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
          limit={3}
          transition={Slide}
        />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<div className="app-page"><Cart /></div>} />
          <Route path='/order' element={<div className="app-page"><PlaceOrder /></div>} />
          <Route path='/verify' element={<div className="app-page"><Verify /></div>} />
          <Route path='/myorders' element={<div className="app-page"><MyOrders /></div>} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App