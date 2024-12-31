import { useState } from 'react';
import vdo from '../../assets/video/covervideoo.mp4';
import vdocoverimg from '../../assets/imgages/untilvideocover.png';
import { useLoaderData } from 'react-router-dom';
import LocationSlec from './inner-pages/LocationSlec';
import './homepage.css'

const HomePage = () => {
    const { leavingCities, depurtingCities } = useLoaderData(); // (1)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false); // ভিডিও লোডিং স্টেট

    const handleVideoLoaded = () => { // (2)
        setIsVideoLoaded(true);
    };

    return (
        <div className="relative"> {/* প্যারেন্ট div-এ relative */}
            {/* video cover section  */}
            <div className="w-[96%] md:w-10/12 mx-auto relative"> {/* ভিডিও কন্টেইনারে relative */}
                <div
                    className="aspect-[16/19] md:aspect-[16/7]"
                    style={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {/* কভার ইমেজ */}
                    {!isVideoLoaded && (
                        <img
                            src={vdocoverimg}
                            alt="Cover"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: 1,
                            }}
                        />
                    )}
                    {/* ভিডিও */}
                    <video
                        src={vdo}
                        muted
                        autoPlay
                        loop
                        onLoadedData={handleVideoLoaded} // (3)
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: isVideoLoaded ? 'block' : 'none',
                        }}
                    ></video>
                </div>

                {/* LocationSlec কম্পোনেন্ট */}
                <div
                    className="   text-white p-4 w-full for_blur_bg"
                    style={{
                        zIndex: 2, // ভিডিওর উপরে দেখানোর জন্য
                    }}
                >
                    <LocationSlec leavingCities={leavingCities} depurtingCities={depurtingCities}></LocationSlec>
                </div>
            </div>
        </div>
    );
};

export default HomePage;



// (1) ==> এখানে আমরা যেহেতু multi api ডাটা fetch করেছিলাম তাই সেগুলিকে distucturring করে নিয়েছি
// (2) ==> যখনি onLoadedData সম্পুরন লোড হবে তখন এই fn truger হবে এবং setIsVideoLoaded() এর মদ্ধে true set হবে
// (3) ==> এখানে onLoadedData হচ্ছে একটা js topic এটি video load হয়ে গেলে একটা কিছু করার জন্য কাজ করে থাকে