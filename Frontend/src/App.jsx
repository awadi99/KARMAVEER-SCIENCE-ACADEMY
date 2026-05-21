import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SmoothScroll from './components/scroll/SmoothScroll';
import { ToastContainer, Flip } from 'react-toastify';
import { useAuth } from './hook/useAuth';

// Lazy Loading components
import LandingPage from './page/LandingPage'; 
const Register = lazy(() => import('./page/Register'));
const Login = lazy(() => import('./page/Login'));
const Dashboard = lazy(() => import('./page/Dashboard'));
const Student = lazy(() => import('./page/Student'));
const ForgotPassword = lazy(() => import('./page/ForgotPassword'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const ProfilePage = lazy(() => import('./page/ProfilePage'));
const TestPage = lazy(() => import('./page/TestPage'));
const TestExecution = lazy(() => import('./components/test/TestExecution'));

const GoogleAuthSuccess = lazy(() => import('./page/GoogleAuthSuccess'));

export default function App() {
  const { user, isLoading } = useAuth();

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#020205]">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="antialiased selection:bg-violet-500/30"> 
      <SmoothScroll>
        <ToastContainer position="top-center" autoClose={2000} theme="dark" transition={Flip} />

        <div className="min-h-screen bg-slate-50 dark:bg-[#020205] text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-[#020205]" />}>
            <Routes>
              
              <Route path='/' element={<LandingPage isDark={isDark} setIsDark={setIsDark} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />

              {/* ✅ ADD THIS ROUTE */}
              <Route path='/auth/google/success' element={<GoogleAuthSuccess />} />

              <Route path="/dashboard" element={<MainLayout isDark={isDark} setIsDark={setIsDark} />}>
                
                <Route index element={
                  isAdmin ? <Dashboard /> : <Navigate to="/dashboard/tests" replace />
                } />

                <Route path="tests" element={<TestPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="practice/:testId" element={<TestExecution />} />

                {isAdmin && (
                  <>
                    <Route path="students" element={<Student />} />
                  </>
                )}
                
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </SmoothScroll>
    </div>
  )
}