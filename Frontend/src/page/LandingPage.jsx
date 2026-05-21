import React, { lazy, Suspense } from 'react'; // Suspense yahan import karna zaroori hai
import { Helmet } from 'react-helmet-async';

import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import Features from '../components/landingPage/Features';
import VisionMission from '../components/landingPage/VisionMission';
import FAQ from '../components/landingPage/FAQ';
import AchievementSlider from '../components/landingPage/AchievementSlider';
import FacultyPage from '../components/landingPage/FacultyPage';

// Components lazy load karein
const Hero = lazy(() => import('../components/landingPage/Hero'));
const AboutUs = lazy(() => import('../components/landingPage/AboutUs'));
const ContactUs = lazy(() => import('../components/landingPage/ContactUs'));
const Gallery = lazy(() => import('../components/landingPage/Gallery'));

export default function Landing({ isDark, setIsDark }) {
    return (
        <div className='overflow-x-hidden'>
            <Helmet>
                <title>Karmaveer Science Academy | Best Coaching for 11th & 12th Science</title>
                <meta name="description" content="Karmaveer Science Academy offers expert coaching for 11th, 12th Science and competitive exams." />
                <link rel="canonical" href="https://karmaveerscienceacademy.in/" />
            </Helmet>

            <Navbar isDark={isDark} setIsDark={setIsDark} />

            {/* Suspense wrapper use karna compulsory hai jab aap lazy load karte hain */}
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <main>
                    <Hero />
                    <AchievementSlider />
                    <Features />
                    <Gallery />
                    <VisionMission />
                    <AboutUs />
                    <FacultyPage />
                    <FAQ />
                    <ContactUs />
                </main>
            </Suspense>

            <Footer />
        </div>
    );
}