import { useState } from 'react';
import vdo from '../../assets/video/covervideoo.mp4';
import vdocoverimg from '../../assets/imgages/untilvideocover.png';
import { useLoaderData } from 'react-router-dom';
import './homepage.css';
import LocationSlec from './inner-pages/location-selct-section/LocationSlec';
import AboutCouh from './inner-pages/about-couch-section/AboutCouh';
import BrandMarque from './inner-pages/brand-marque-section/BrandMarque';
import FlipCard from './inner-pages/show-details-in-the-card/FlipCard';

const HomePage = () => {
    const reciveApiData = useLoaderData(); // (1)
    const [isVideoLoaded, setIsVideoLoaded] = useState(false); //before ভিডিও লোডিং cover image স্টেট

    const handleVideoLoaded = () => { // (2)
        setIsVideoLoaded(true);
    };

    return (
        <div className="relative"> {/* প্যারেন্ট div-এ relative */}
            {/* video cover section  */}
            <div className="w-[96%] md:w-10/12 mx-auto relative"> {/* ভিডিও কন্টেইনারে relative */}
                <div
                    className="aspect-[16/23] md:aspect-[16/7]"
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

                    {/* হেডিং (WELCOME TO RAKIB-COUCH) */}
                    <div
                        className="absolute inset-0 flex items-start justify-center"
                        style={{ zIndex: 2, top: '10%' }}
                    >
                        <h1
                            className="text-2xl md:text-5xl font-bold animate-pulse"
                            style={{
                                background: "linear-gradient(to right, #ff4d4d, #ff6666)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textShadow: "0 4px 6px rgba(255, 77, 77, 0.5)",
                                WebkitTextStroke: "1px rgba(0, 0, 0, 0.8)", // আউটলাইন যোগ করা হয়েছে
                            }}
                        >
                            WELCOME TO RAKIB-COUCH
                        </h1>
                    </div>




                </div>

                {/* LocationSlec কম্পোনেন্ট */}
                <div
                    className="absolute bottom-0 text-white p-4 w-full for_blur_bg"
                    style={{
                        zIndex: 2, // ভিডিওর উপরে দেখানোর জন্য
                    }}
                >
                    <LocationSlec reciveApiData={reciveApiData}></LocationSlec>
                </div>
                
            </div>
            {/* about transpotation sumusry compo start*/}
            <AboutCouh></AboutCouh>
            {/* about transpotation sumusry compo end*/}
            {/* brand img marqur section component start*/}
            <BrandMarque></BrandMarque>
            {/* brand img marqur section component end*/}
            {/* flip card section start */}
            <FlipCard></FlipCard>
            {/* flip card section end */}
            

        </div>
    );
};

export default HomePage;



// (1) ==> এখানে আমরা যেহেতু multi api ডাটা fetch করেছিলাম তাই সেগুলিকে distucturring করে নিয়েছি
// (2) ==> যখনি onLoadedData সম্পুরন লোড হবে তখন এই fn truger হবে এবং setIsVideoLoaded() এর মদ্ধে true set হবে
// (3) ==> এখানে onLoadedData হচ্ছে একটা js topic এটি video load হয়ে গেলে একটা কিছু করার জন্য কাজ করে থাকে