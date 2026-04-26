// contactData.js
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const CONTACT_CONFIG = {
    header: {
        badge: "Official Contact",
        title: "Start Your",
        titleAccent: "Success Story."
    },

    contacts: [
        {
            id: 1,
            href: "tel:+919763120121",
            icon: Phone,
            title: "Direct Admissions",
            detail: "+91 97631 20121",
            subDetail: "Click to Call"
        },

        {
            id: 3,
            href: "mailto:karmaveerstudycenter@gmail.com",
            icon: Mail,
            title: "Official Email",
            detail: "karmaveerstudycenter@gmail.com",
            subDetail: "Tap to Mail"
        },
        {
            id: 4,
            icon: Clock,
            title: "Office Hours",
            detail: "10:00 AM - 08:00 PM",
            subDetail: "Open Daily"
        }
    ],
    location: {
        address: "Jijamatanagar, Tandulwadi Road",
        city: "Baramati, Maharashtra",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.123456789!2d74.58!3d18.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA5JzAwLjAiTiA3NMKwMzQnNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
    }
};