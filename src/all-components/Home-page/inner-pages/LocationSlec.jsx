import PropTypes from 'prop-types';

const LocationSlec = ({ leavingCities, depurtingCities }) => {
    return (
        <div>
            <form className="flex flex-col sm:flex-row gap-3 md:gap-5 flex-wrap justify-center">
                {/* Leaving City */}
                <div className="relative w-full sm:w-auto">
                    <select
                        name="leavingCity"
                        id="leavingCity"
                        className="w-full sm:w-auto px-3 py-2 text-black border border-gray-300 rounded-md h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {leavingCities.map((livCity, indx) => (
                            <option value={livCity.value} key={indx} className="text-black">
                                {livCity.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Departing City */}
                <div className="relative w-full sm:w-auto">
                    <select
                        name="depurtingCity"
                        id="depurtingCity"
                        className="w-full sm:w-auto px-3 py-2 text-black border border-gray-300 rounded-md h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {depurtingCities.map((dipCity, indxx) => (
                            <option value={dipCity.value} key={indxx} className="text-black">
                                {dipCity.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="w-full sm:w-auto">
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-10 py-3 bg-green-500 text-white rounded-md h-12 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Search Bus
                    </button>
                </div>
            </form>
        </div>
    );
};

LocationSlec.propTypes = {
    leavingCities: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    depurtingCities: PropTypes.array,
};

export default LocationSlec;
