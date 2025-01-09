import ftrimg from '../../assets/imgages/footerimg.jpg'
import './footer.css'
import ssl from '../../assets/imgages/payment-methods.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    const forFtrBg = {
        width: '100vw',  // সম্পূর্ণ স্ক্রীন প্রস্থ
        height: '450px', // সম্পূর্ণ স্ক্রীন উচ্চতা
        backgroundImage: `url(${ftrimg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '20% -29%', // ইমেজটি স্ক্রীনে কেন্দ্রীভূত হবে
        backgroundSize: 'cover', // ইমেজের সম্পূর্ণ অংশ দেখানোর জন্য
    };





    return (
        <div>
            <div className="w-full h-auto md:h-[450px]">
                <div style={forFtrBg} className="for_bg_img_setup bg-cover bg-center p-4 md:p-8">
                    <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                        {/* Left Section */}
                        <div className="flex-1 flex justify-center items-center">
                            <img
                                src={ssl}
                                alt="Green Line Logo"
                                className="w-full md:w-[80%] h-auto object-contain"
                            />
                        </div>

                        {/* Right Section */}
                        <div className="flex-1 text-white">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4 underline">
                                ABOUT GREENLINE
                            </h1>
                            <p className="text-sm md:text-base leading-relaxed">
                                Green Line Paribahan is apparently a family-owned transport company
                                specializing in transportation of passenger bus services since 1990.
                                From a humble beginning of local services, our transport system
                                encompasses all reachable areas of Bangladesh and also beyond the
                                border, extending our reach to Kolkata in India.
                            </p>
                        </div>
                    </div>

                    {/* Quick Menus & Newsletter Section */}
                    <div className="flex flex-col gap-8 mt-12 md:mt-16 md:flex-row justify-between items-start">
                        {/* Quick Menus */}
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl text-white mb-4">Quick Menus</h1>
                            <div className="flex flex-wrap gap-4 text-blue-300 underline text-sm md:text-base">
                                <Link to="/">Home</Link>
                                <Link to="/about">About</Link>
                                <Link to="/contact">Contact</Link>
                                <Link to="/service">Service</Link>
                                <Link to="/cancel-ticket">Cancel Ticket</Link>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl text-blue-400 mb-4">GET NEWSLETTER</h1>
                            <input
                                className="w-full md:w-[80%] px-4 py-3 text-black rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                type="text"
                                placeholder="Enter your email"
                            />
                            <button className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-12 text-center text-white">
                        <span>
                            Copyright © {new Date().getFullYear()} - All rights reserved by RAKIB COUCH Ltd
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Footer;