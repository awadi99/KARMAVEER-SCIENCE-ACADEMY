import React,{lazy} from 'react';

import Navbar from '../components/common/NavBar';
import Features from '../components/landingPage/Features';
import VisionMission from '../components/landingPage/VisionMission';
 import FAQ from '../components/landingPage/FAQ';
 const Hero = lazy(()=>import('../components/landingPage/Hero'));
 const AboutUs = lazy(()=>import('../components/landingPage/AboutUs'));
 const ContactUs = lazy(()=>import(('../components/landingPage/ContactUs')));
 const Gallery = lazy (()=> import ('../components/landingPage/Gallery'));

 import AchievementSlider from '../components/landingPage/AchievementSlider';
import Footer from '../components/common/Footer';
import FacultyPage from '../components/landingPage/FacultyPage';




export default function Landing({isDark, setIsDark}) {
    return (
        <div className='overflow-x-hidden '>
            <Navbar isDark={isDark} setIsDark={setIsDark} />
            <Hero />
            <AchievementSlider/>
            <Features />
            <Gallery/>
            <VisionMission />
            <AboutUs/>
            <FacultyPage/>

            <FAQ/>
            <ContactUs/>
            <Footer /> 
        </div>
    )
}

