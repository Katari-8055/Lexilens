import React, { useContext } from 'react'
import Home from './pages/Home'
import Result from './pages/Result'
import ByCredit from './pages/ByCredit'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PaymentForm from './components/PaymentForm'

const App = () => {


  const {showLogin, showPaymentForm} = useContext(AppContext);


  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showPaymentForm && <PaymentForm/>}
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<ByCredit/>}/>
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App