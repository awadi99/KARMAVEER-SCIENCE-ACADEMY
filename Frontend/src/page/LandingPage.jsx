import React,{lazy} from 'react';
import { Helmet } from 'react-helmet-async';

import Navbar from '../components/common/NavBar';
import Features from '../components/landingPage/Features';
import VisionMission from '../components/landingPage/VisionMission';
 import FAQ from '../components/landingPage/FAQ';
 const Hero = lazy(()=>import('../components/landingPage/Hero'));
 const AboutUs = lazy(()=>import('../components/landingPage/AboutUs'));
 const ContactUs = lazy(()=>import(('../components/landingPage/ContactUs')));
 const Gallery = lazy (()=> import ('../components/landingPage/Gallery'));

 import AchievementSlider from '../components/landingPage/AchievementSlider';
import FacultyPage from '../components/landingPage/FacultyPage';
import Footer from '../components/common/Footer';




export default function Landing({isDark, setIsDark}) {
    return (
<div className='overflow-x-hidden'>
            {/* SEO Metadata */}
            <Helmet>
                <title>Karmaveer Science Academy | Best Coaching for 11th & 12th Science</title>
                <meta name="description" content="Karmaveer Science Academy offers expert coaching for 11th, 12th Science and competitive exams. Join us for guaranteed academic success." />
                <link rel="canonical" href="https://karmaveerscienceacademy.in/" />
            </Helmet>

            <Navbar isDark={isDark} setIsDark={setIsDark} />
            
            <Suspense fallback={<div>Loading...</div>}>
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
    )
}

