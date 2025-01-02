import { Tooltip } from '@mui/material';

import imgbrand from '../../assets/imgages/centerbrand.png'
import './aboutUs.css'
import { Link } from 'react-router-dom';
const AboutUs = () => {
    return (
        <div className='w-[96%] md:w-10/12 mx-auto bg-white px-1 md:px-4 pt-6 md:pt-10 for_appy_aboout_couch_font_about'>
            
            <div className="">
                <div className="text-slate-500 font-bold text-2xl"><h1>Company Profile</h1></div>
                <p className="text-slate-600 mb-4    text-justify">
                    RAKIB COUCH Paribahan is apparently a family-owned transport company specializing in transportation of passenger bus services since 1990. From a humble beginning of local services, our transport system encompasses all reachable areas of Bangladesh and also beyond the border, extending our reach to Kolkata in India.
                    We worked hard and honest, we put our vision forward and explored ways and means to continuously improve passenger comfort, and as a result, we were able to introduce the 1st ever Air-Conditioned bus services in Bangladesh. We take pride in mentioning that our fleet of buses includes the most luxurious models of VOLVO and SCANIA imported from Europe, which provide the ultimate in passenger comfort and safety.
                    The company at present operates more than 60 (Sixty) buses on schedule routes employing over 200 trained staff and safely transporting over a million passengers a year.
                </p>
                <div className="text-slate-500 font-bold text-2xl"><h1>Our Mission</h1></div>
                <p className="text-slate-600 mb-4 text-justify">The mission of the Transport Company may be categorized by 3 principal activities as follows.
                    Aim for efficient services through constant development towards world-class standards. The priorities are safety, convenience, cleanliness, modernity and punctuality on each and every journey.
                    Create customer satisfaction and meet passenger needs. The service network must allow for ease of connections and uninterrupted nationwide travel.
                    Implement a system of management that is both efficient and streamlined. Capitalise on the potential of employees, by building teamwork. Reduce waste and non-productivity, in the interest of quality management and to compete with the private sector.</p>
                <div className="text-slate-500 font-bold text-2xl"><h1>Our Vision</h1></div>
                <p className="text-slate-600 mb-4 text-justify">To be the leader of domestic land based transport, with world-class service standards, efficient management, employing modern technologies and quality personnel.</p>
                <div className="text-slate-500 font-bold text-2xl"><h1>Our Founder</h1></div>
                <p className='mb-4 text-slate-600 text-justify'>
                    <Tooltip title="RAKIB'S FB PROFILE" placement="top">
                        <a className='text-blue-600' href="https://www.facebook.com/rakib.al.muqtadir.2024/">RAKIB AL MUQADIR</a>
                    </Tooltip> is the pioneer and an entrepreneur in this sector. A humble man with an idea of tremendous magnitude has taken him to the pinnacle of success in passenger bus service in Bangladesh. Honesty and dedication pays off, and it shows in the effort of Mr. Mohammad Alauddin, Who personally takes care of the day-to-day business of his nationwide service. He has keen eyes for passenger comfort and safely, and takes amy comments for the passenger with great seriousness. He is a 58year young man who is not very fond of media exposure and want to remain behind the scenes of his transportation empire as a happy dedicated man.</p>
                <div className="text-slate-500 font-bold text-2xl"><h1>Our Management</h1></div>
                <div className="text-black font-bold text-lg"><h2>AL-HAJJ MOHAMMAD ALAUDDIN</h2></div>
                <p>Managing Director</p>
                <div className="text-black font-bold text-lg"><h2>SALAUDDIN APU</h2></div>
                <p>Deputy Managing Director</p>
                <div className="text-black font-bold text-lg"><h2>SHAMSUDDIN AHAMED</h2></div>
                <Link className='flex justify-start ' to={'/'}>
                <div>
                    <img className='w-24' src={imgbrand} alt="" />
                </div>
            </Link>
            </div>
        </div>
    );
};

export default AboutUs;