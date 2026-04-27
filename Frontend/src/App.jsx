import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './page/LandingPage'
import SmoothScroll from './components/scroll/SmoothScroll';
import Register from './page/Register';
import Login from './page/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './page/Dashboard';
import Student from './page/Student';
import ForgotPassword from './page/ForgotPassword';


export default function App() {
  // Initialize from localStorage so it remembers the user's choice on refresh
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || !('theme' in localStorage);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className={isDark ? "light" : ""}>
      <SmoothScroll>
        <div className="min-h-screen transition-colors duration-700 bg-slate-50 dark:bg-[#020205] text-slate-900 dark:text-white selection:bg-violet-500 selection:text-white">
          <Routes>
            <Route path='/' element={<LandingPage isDark={isDark} setIsDark={setIsDark} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword/>}/>

            {/* Pass the state to the Dashboard Layout */}
            <Route path="/dashboard" element={<MainLayout isDark={isDark} setIsDark={setIsDark} />}>
              <Route index element={<Dashboard/>}></Route>
              <Route path="students" element={<Student/>}/>
            </Route>
          </Routes>
        </div>
      </SmoothScroll>
    </div>
  )
}