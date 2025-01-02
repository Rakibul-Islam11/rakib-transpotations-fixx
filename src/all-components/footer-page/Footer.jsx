import ftrimg from '../../assets/imgages/footerimg.png'

const Footer = () => {
    const forFtrBg = {
        backgroundImage: `url(${ftrimg})`,
  
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',

    };
    return (
        <div>
            <div style={forFtrBg} className="w-[100%] h-[450px]">

            </div>
        </div>
    );
};

export default Footer;