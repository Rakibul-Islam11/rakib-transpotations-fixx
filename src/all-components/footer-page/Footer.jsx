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
            <div  className="w-[100vw] h-fit md:h-[450px]">
                <div style={forFtrBg} className='for_bg_img_setup'>
                    <div className='px-2'>
                        <div className="flex flex-col md:flex-row w-full gap-0 md:gap-8 md:pt-16">
                            {/* Left Section */}
                            
                            <div className="flex-1">
                                <img src={ssl} alt="Green Line Logo" className="w-full h-auto object-cover" />
                            </div>

                            {/* Right Section */}
                            <div className="flex-1">
                                <h1 className="text-xl font-bold mb-4 text-white underline">ABOUT GREENLINE</h1>
                                <p className='text-white'>
                                    Green Line Paribahan is apparently a family-owned transport company
                                    specializing in transportation of passenger bus services since 1990.
                                    From a humble beginning of local services, our transport system
                                    encompasses all reachable areas of Bangladesh and also beyond the
                                    border, extending our reach to Kolkata in India.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row w-full gap-8 justify-around '>
                            <div>
                                <div className='text-3xl md:text-4xl text-white'><h1>Quick Menus</h1></div>
                                <div className='text-blue-200 underline flex flex-row gap-4'>
                                    <Link>Home</Link>
                                    <Link>About</Link>
                                    <Link>Contact</Link>
                                    <Link>Service</Link>
                                    <Link>Cancel Ticket</Link>

                                </div>
                            </div>
                            <div>
                                <h1 className='text-3xl md:text-4xl text-blue-600'>GET NEWSLETER</h1>
                                <input className='mt-2 py-3 px-6' type="text" placeholder='newslater'/>
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center mt-9 text-white'><span>Copyright © {new Date().getFullYear()} - All right reserved by RAKIB COUCH Ltd</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;