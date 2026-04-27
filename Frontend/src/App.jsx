import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './page/LandingPage'
import SmoothScroll from './components/scroll/SmoothScroll';
import Register from './page/Register';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    
    <div className={isDark ? "dark" : ""}>
      <SmoothScroll>
      <div className="min-h-screen transition-colors duration-700 bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-indigo-500 selection:text-white">
        <Routes>

          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element ={<ForgotPassword/>}/>







          <Route 
            path='/' 
            element={<LandingPage isDark={isDark} setIsDark={setIsDark} />}
          />
        </Routes>
      </div>
      </SmoothScroll>
    </div>
  )
}