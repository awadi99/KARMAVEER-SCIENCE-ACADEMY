import React, { useState, useEffect,lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SmoothScroll from './components/scroll/SmoothScroll';
import TestPage from './page/TestPage';
import { Lasso } from 'lucide-react';

const LandingPage = lazy(() => import('./page/LandingPage'));
const Register = lazy(() => import('./page/Register'));
const Login = lazy(() => import('./page/Login'));
const Dashboard = lazy(() => import('./page/Dashboard'));
const Student = lazy(() => import('./page/Student'));
const ForgotPassword = lazy(() => import('./page/ForgotPassword'));
const MainLayout = lazy(()=>import ('./layouts/MainLayout'));
const FeePage = lazy(()=>import('./page/FeePage'));
const ProfilePage = lazy(()=>import('./page/ProfilePage'));








export default function App() {
  
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
              <Route path='tests' element={<TestPage/>}/>
              <Route path='fees' element={<FeePage/>}/>
              <Route path='profile' element={<ProfilePage/>}/>
              
              
              
            </Route>
          </Routes>
        </div>
      </SmoothScroll>
    </div>
  )
}