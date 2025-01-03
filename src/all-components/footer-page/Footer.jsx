import ftrimg from '../../assets/imgages/footerimg.jpg'

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
            <div  className="w-[100vw] h-[450px]">
                <div style={forFtrBg}>

                </div>
            </div>
        </div>
    );
};

export default Footer;