import { FaFacebookSquare } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import '../globle-css/globle.css'

const TopMiniNav = () => {
    return (
        <div className="w-[96%] md:w-10/12 mx-auto bg-white for_use_font py-3">
            <div className="flex flex-row justify-between items-center gap-2 md:gap-4 px-2 md:px-4">
                <div className="w-[268px] text-blue-600 font-bold text-md md:text-lg">
                    <a href="tel:01736600480">Helpline: 01736600480</a>
                </div>
                <div className="hidden md:block">
                    <Marquee pauseOnHover={true}>
                        I can be a React component, multiple React components, or just some text.
                    </Marquee>
                </div>
                <div className="text-blue-600 font-bold text-xl md:text-2xl hidden md:block">
                    <a href="https://www.facebook.com/rakib.al.muqtadir.2024/"><FaFacebookSquare /></a>
                </div>
            </div>
            {/* only above md screen rander marquer */}
            <div className="px-2 md:px-4 block md:hidden">
                <Marquee pauseOnHover={true}>
                    I can be a React component, multiple React components, or just some text.
                </Marquee>
            </div>
            
        </div>
    );
};

export default TopMiniNav;