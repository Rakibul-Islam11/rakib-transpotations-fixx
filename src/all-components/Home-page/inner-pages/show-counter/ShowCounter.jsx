import { useLoaderData } from "react-router-dom";

const ShowCounter = () => {
    const cityData = useLoaderData(); // Loader provides city data

    if (!cityData) {
        return <div>No city details provided or city not found.</div>; // Fallback if no city found
    }

    return (
        
        <div className="w-[96%] md:w-10/12 mx-auto h-[80vh] flex justify-center items-center bg-white shadow-[0_12px_15px_1px_rgba(0,0,0,1)]">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                    City Details
                </h1>
                <p className="text-lg text-gray-700 mb-2">
                    <strong className="text-blue-600">Name:</strong> {cityData.name}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong className="text-blue-600">Email:</strong> {cityData.email}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <strong className="text-blue-600">Phone:</strong> {cityData.phone}
                </p>
                <p className="text-lg text-gray-700">
                    <strong className="text-blue-600">Website:</strong>
                    <a href={cityData.website} className="text-blue-500 hover:underline">
                        {cityData.website}
                    </a>
                </p>
            </div>

        </div>
        
    );
};

export default ShowCounter;
