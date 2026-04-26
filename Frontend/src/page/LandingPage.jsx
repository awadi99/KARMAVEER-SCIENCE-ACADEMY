import Navbar from '../components/common/NavBar';
import Hero from '../components/landingPage/Hero';
import Features from '../components/landingPage/Features';
import VisionMission from '../components/landingPage/VisionMission';
import AboutUs from '../components/landingPage/AboutUs';
 import FAQ from '../components/landingPage/FAQ';
 import ContactUs from '../components/landingPage/ContactUs';
import Footer from '../components/common/Footer';


export default function Landing({isDark, setIsDark}) {
    return (
        <div className='overflow-x-hidden '>
            <Navbar isDark={isDark} setIsDark={setIsDark} />
            <Hero />
            <Features />
            <VisionMission />
            <AboutUs/>
            <FAQ/>
            <ContactUs/>
            <Footer /> 
        </div>
    )
}

