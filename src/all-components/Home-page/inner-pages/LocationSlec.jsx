import PropTypes from 'prop-types';

const LocationSlec = ({ reciveApiData }) => {
    const { LeavingCities, DepurtingCities } = reciveApiData;

    return (
        <div>
            <form className="flex flex-col md:flex-row gap-3 md:gap-5 flex-wrap justify-center">
                {/* Leaving City */}
                <div className="w-full md:w-auto">
                    <select
                        name=""
                        id=""
                        className="w-full h-8 md:h-12 px-2 md:px-10 text-black border border-gray-300"
                    >
                        {LeavingCities.map((livCity, indx) => (
                            <option value={livCity.value} key={indx} className="text-black">
                                {livCity.label}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Departing City */}
                <div className="w-full md:w-auto">
                    <select
                        name=""
                        id=""
                        className="w-full h-8 md:h-12 md:px-10 px-2 text-black border border-gray-300"
                    >
                        {DepurtingCities.map((dipCity, indxx) => (
                            <option value={dipCity.value} key={indxx} className="text-black">
                                {dipCity.label}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Search Button */}
                <div className="w-full md:w-auto">
                    <button
                        type="submit"
                        className="w-full h-8 md:h-12 px-10 bg-green-500 text-white hover:bg-green-600"
                    >
                        Search Buss
                    </button>
                </div>
            </form>
        </div>
    );
};

LocationSlec.propTypes = {
    reciveApiData: PropTypes.object,
};

export default LocationSlec;
