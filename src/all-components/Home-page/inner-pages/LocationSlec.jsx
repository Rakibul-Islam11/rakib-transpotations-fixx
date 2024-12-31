import PropTypes from 'prop-types';
import Flatpickr from "react-flatpickr";
import { useState } from "react";
import "flatpickr/dist/themes/material_green.css"; // Flatpickr এর থিম (প্রয়োজনে কাস্টমাইজ করতে পারেন)

const LocationSlec = ({ reciveApiData }) => {
    const { LeavingCities, DepurtingCities } = reciveApiData;

    // State for selected date
    const [date, setDate] = useState(null);

    // Date change handler
    const dateHandler = (selectedDates) => {
        setDate(selectedDates[0]); // প্রথম ডেটটি নিন
    };

    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg">
            <form className="flex flex-col md:flex-row gap-4 md:gap-6 flex-wrap justify-center">
                {/* Leaving City */}
                <div className="w-full md:w-auto">
                    <select
                        name="leavingCity"
                        className="w-full h-12 px-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {LeavingCities.map((livCity, indx) => (
                            <option value={livCity.value} key={indx} className="text-gray-700">
                                {livCity.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Departing City */}
                <div className="w-full md:w-auto">
                    <select
                        name="departingCity"
                        className="w-full h-12 px-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {DepurtingCities.map((dipCity, indxx) => (
                            <option value={dipCity.value} key={indxx} className="text-gray-700">
                                {dipCity.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Picker */}
                <div className="w-full md:w-auto">
                    <Flatpickr
                        options={{
                            dateFormat: "Y-m-d", // তারিখ ফরম্যাট
                            minDate: "today", // আজকের দিন থেকে শুরু
                            maxDate: new Date().fp_incr(10), // সর্বোচ্চ ১০ দিন পর্যন্ত নির্বাচন করা যাবে
                            allowInput: true, // ইনপুটের placeholder দেখাবে
                            disableMobile: true, // মোবাইলে নেটিভ পিকার ডিজেবল করবে
                        }}
                        value={date || undefined} // তারিখ স্টেট থেকে দেখাবে
                        onChange={dateHandler} // হ্যান্ডলার কল হবে
                        className="w-full h-12 px-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                        placeholder="Choose the date" // প্লেসহোল্ডার
                    />
                </div>



                {/* Search Button */}
                <div className="w-full md:w-auto">
                    <button
                        type="submit"
                        className="w-full h-12 px-8 text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500"
                    >
                        Search Bus
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
