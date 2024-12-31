import Marquee from "react-fast-marquee";
import dbgr from '../../../../assets/branf-img-for-marque/dbgr.png'
import dem from '../../../../assets/branf-img-for-marque/demier.svg'
import scina from '../../../../assets/branf-img-for-marque/scina.svg'
import imgee from '../../../../assets/branf-img-for-marque/imgne.png'
import isu from '../../../../assets/branf-img-for-marque/Isuzu.svg'
import toyo from '../../../../assets/branf-img-for-marque/Toyota.svg'
const BrandMarque = () => {
    return (
        <div className="w-[96%] md:w-10/12 mx-auto bg-white px-1 md:px-2">
            
            <div className='bg-white pt-8 '>
                <div>
                    <h1 className='text-slate-500 text-2xl text-center'>With Our Spuer Couches</h1>
                    <Marquee>
                        <div className='flex flex-row items-center gap-1 md:gap-10'>
                            <div className=' w-20 md:w-28'><img src={dbgr} alt="" /></div>
                            <div className='w-20 md:w-32'><img src={dem} alt="" /></div>
                            <div className='w-20 md:w-24'><img src={scina} alt="" /></div>
                            <div className='w-20 md:w-28'><img src={imgee} alt="" /></div>
                            <div className='w-20 md:w-28'><img src={isu} alt="" /></div>
                            <div className='w-20 md:w-40'><img src={toyo} alt="" /></div>
                        </div>

                    </Marquee>
                </div>
            </div>
            
        </div>
    );
};

export default BrandMarque;