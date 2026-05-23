import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/NavBar';
import Features from '../components/landingPage/Features';
import VisionMission from '../components/landingPage/VisionMission';
import FAQ from '../components/landingPage/FAQ';
const Hero = lazy(() => import('../components/landingPage/Hero'));
const AboutUs = lazy(() => import('../components/landingPage/AboutUs'));
const ContactUs = lazy(() => import(('../components/landingPage/ContactUs')));
const Gallery = lazy(() => import('../components/landingPage/Gallery'));

import AchievementSlider from '../components/landingPage/AchievementSlider';
import FacultyPage from '../components/landingPage/FacultyPage';
import Footer from '../components/common/Footer';
import { Helmet } from 'react-helmet-async';




export default function Landing({ isDark, setIsDark }) {
    return (
        <div className='overflow-x-hidden '>
            <Helmet>
                <title>Karmaveer Science Academy, Baramati | Best Coaching for 11th & 12th Science</title>
                <meta name="description" content="Karmaveer Science Academy offers expert coaching for 11th, 12th Science and competitive exams." />
                <link rel="canonical" href="https://karmaveerscienceacademy.in/" />
            </Helmet>
            <Navbar isDark={isDark} setIsDark={setIsDark} />

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
            <Footer />
        </div>

    )
};

