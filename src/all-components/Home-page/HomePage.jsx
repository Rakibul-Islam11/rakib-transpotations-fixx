import { useState } from 'react';
import vdo from '../../assets/video/covervideoo.mp4';
import vdocoverimg from '../../assets/imgages/untilvideocover.png';

const HomePage = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const handleVideoLoaded = () => {
        setIsVideoLoaded(true);
    };

    return (
        <div>
            <div className="w-[96%] md:w-10/12 mx-auto">
                <div
                    className="aspect-[16/19] md:aspect-[16/7]" // TailwindCSS দিয়ে aspect ratio নিয়ন্ত্রণ
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
                        onLoadedData={handleVideoLoaded}
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
            </div>
        </div>
    );
};

export default HomePage;
