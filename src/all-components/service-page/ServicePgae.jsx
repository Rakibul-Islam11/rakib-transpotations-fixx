import nbrnd from '../../assets/imgages/centerbrand.png'
import { Link } from 'react-router-dom';

const ServicePgae = () => {
    return (
        <div>
            <div className="w-[96%] md:w-10/12 mx-auto bg-white px-6 py-5 shadow-[0_12px_15px_1px_rgba(0,0,0,1)]">
                <Link to={'/'} className='flex justify-center w-32'>
                    <img src={nbrnd} alt="" />
                </Link>
                <div>
                    <div className="text-slate-500 font-bold text-2xl mb-3">
                        <h1>Rakib Couch All Route</h1>
                    </div>
                    <div className="text-slate-600 space-y-4">
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Chittagong – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Cox’s Bazar – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Teknaf – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Sylhet – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Banapole – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Khulna – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Dhaka – Rajsahi – Dhaka.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Chittagong – Sylhet – Chittagong.</p>
                        </div>
                        <div className="bg-white p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <p>Chittagong – Banapole – Chittagong.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePgae;
