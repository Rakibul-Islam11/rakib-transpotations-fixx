import PropTypes from 'prop-types';

const LocationSlec = ({ leavingCities, depurtingCities }) => {
    return (
        <div>
            <form className='flex flex-row gap-3 md:gap-5 flex-wrap justify-center'>
                {/* Leaving City */}
                <div className=''>
                    <select name="" id="" className='px-28 py-3 text-black h-12'>
                        {leavingCities.map((livCity, indx) => (
                            <option value={livCity.value} key={indx} className='text-black'>
                                {livCity.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="" id="" className='px-28 py-3 text-black h-12'>
                        {
                            depurtingCities.map((dipCity, indxx) => (
                                <option value={dipCity.value} key={indxx} className='text-black'>
                                    {dipCity.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='px-10 py-3 bg-green-500 h-12'>
                    <button type='submit'>Search Buss</button>
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
