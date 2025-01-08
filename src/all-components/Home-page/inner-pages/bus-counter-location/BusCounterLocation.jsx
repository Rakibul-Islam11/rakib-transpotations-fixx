import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router Hook
import counterimg from '../../../../assets/imgages/counter-log.webp'


const BusCounterLocation = () => {
    const [scities, setScities] = useState([]);
    const navigate = useNavigate(); // Navigate Hook for redirection

    useEffect(() => {
        // Fetching data from the public folder JSON file
        fetch('/cities.json')
            .then((response) => response.json())
            .then((data) => setScities(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleSelect = (event) => {
        const cityId = event.target.value;
        const city = scities.find((c) => c.id.toString() === cityId);

        if (city) {
            const citySlug = city.name.toLowerCase().replace(/ /g, '-'); // Create slug
            navigate(`/home/${citySlug}`); // Redirect to dynamic page
        }
    };

    return (
        <div className="bg-white flex flex-col sm:flex-row justify-start gap-0 sm:gap-10 items-start sm:items-center py-4 px-14">
            <div className="block sm:hidden">
                <div className="w-36">
                    <img src={counterimg} alt="" />
                </div>
            </div>
            <div >
                <div className="text-4xl text-[#0fa87f]"><h1>City Counter List</h1></div>
                <div className="text-[#0fa87f]"><p>Please choose your counter to view full address and contact no.</p></div>
                <div>
                    <select id="city-select" onChange={handleSelect} className="select select-primary w-full max-w-xs px-2 py-3">
                        <option value="">-- Select a City --</option>
                        {scities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="hidden sm:block">
                <div className="w-36">
                    <img src={counterimg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default BusCounterLocation;







