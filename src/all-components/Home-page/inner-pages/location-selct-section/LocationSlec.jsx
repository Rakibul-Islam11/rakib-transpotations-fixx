import PropTypes from 'prop-types';
import Flatpickr from "react-flatpickr";
import { useState } from "react";
import "flatpickr/dist/themes/material_green.css"; // Flatpickr এর থিম
import { useNavigate } from 'react-router-dom';


const LocationSlec = ({ locations }) => {
    const [leavCity, setLeavCity] = useState("Select Leaving City");//leaving city stor state
    const [deperCity, setDeperCity] = useState("Select Destination City")//deper city stor state
    const [dateStor, setDateStor] = useState(null)// date stor state
    const [errors, setErrors] = useState({ leavCityError: false, deperCityError: false, dataError: null });//(1)
    const { LeavingCities, DepurtingCities } = locations;
    const navigate = useNavigate()

    // leaving city handler
    const leavingCityHandler = (e) => {
        const getLeavCityValue = e.target.value;
        setLeavCity(getLeavCityValue);
        setErrors(prev => ({ ...prev, leavCityError: getLeavCityValue === "Select Leaving City"}))//(2)
    }
    //deperting city handle
    const DeperCityHandler = (e) => {
        const getDeperCityValue = e.target.value;
        setDeperCity(getDeperCityValue);
        setErrors((prev) => ({...prev, deperCityError: getDeperCityValue === "Select Destination City"}));//same as a (2)
    };


    //date handler
    const dateHandler = (e) => {
        setDateStor(e.length > 0 ? e[0] : null);
        setErrors(prev => ({ ...prev, dataError: e.length === 0 }))//same as a (2)
    }
    //from handler
    const formHandler = (e) => {//validate when u click submit button
        e.preventDefault();
        setErrors(prev => ({ ...prev, leavCityError: leavCity === "Select Leaving City" }));
        setErrors(prev => ({ ...prev, deperCityError: deperCity === "Select Destination City" }));
        setErrors(prev => ({ ...prev, dataError: dateStor === null }))
        
        //navigate
        if (leavCity !== "Select Leaving City" && deperCity !== "Select Destination City" && dateStor !== null) {
            navigate('/bus-select', {
                state: { // (7)
                    leavCity, // Leaving city
                    deperCity, // Departing city
                    dateStor, // Selected date
                }
            });
        }
        
    }

    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 md:p-6 rounded-lg shadow-xl max-w-6xl mx-auto">
            <div className="bg-white p-3 rounded-lg shadow-lg">
                <form onSubmit={formHandler} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                    {/* Leaving City */}
                    <div className="flex flex-col">
                        <div className='flex flex-row items-center gap-1 pb-1'>
                            <label htmlFor="leavingCity" className="text-gray-700 text-[14px]  font-bold md:mb-2">
                                LEAVING CITY
                            </label>
                            <div className='block md:hidden'>
                                <p
                                    className={`text-red-500 text-sm mt-0 md:mt-1 min-h-[20px] transition-all duration-300 ${errors.leavCityError ? "opacity-100 visible" : "opacity-0 invisible"
                                        }`}
                                >
                                    Please select a city
                                </p>
                            </div>
                        </div>
                        <select
                            onChange={leavingCityHandler}
                            className={`w-full h-10 md:h-12 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-md focus:outline-none ${errors.leavCityError
                                ? "border-red-500 ring-4 ring-red-500"
                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                        >
                            
                            {LeavingCities.map((livCity, indx) => (
                                <option value={livCity.value} key={indx} className="text-gray-700">
                                    {livCity.label}
                                </option>
                            ))}
                        </select>
                        {/* error text */}
                        <div className='hidden md:block'>
                            <p
                                className={`text-red-500 text-sm mt-0 md:mt-1 min-h-[20px] transition-all duration-300 ${errors.leavCityError ? "opacity-100 visible" : "opacity-0 invisible"
                                    }`}
                            >
                                Please select a city
                            </p>
                        </div>
                    </div>

                    {/* Departing City */}
                    <div className="flex flex-col">
                        <div className='flex flex-row items-center gap-1 pb-1'>
                            <label htmlFor="departingCity" className="text-gray-700 font-bold text-[14px] md:mb-2">
                                DEPARTING CITY
                            </label>
                            <div className='block md:hidden '>
                                <p
                                    className={` text-red-500 text-sm mt-0 md:mt-1  min-h-[20px] transition-all duration-300 ${errors.deperCityError ? "opacity-100 visible" : "opacity-0 invisible"
                                        }`}
                                >
                                    Please select a city
                                </p>
                            </div>
                        </div>
                        <select
                            id="departingCity"
                            onChange={DeperCityHandler}
                            className={`w-full h-10 md:h-12 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-md focus:outline-none ${errors.deperCityError
                                ? "border-red-500 ring-4 ring-red-500"
                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                        >
                            
                            {DepurtingCities.map((dipCity, indxx) => (
                                <option value={dipCity.value} key={indxx} className="text-gray-700">
                                    {dipCity.label}
                                </option>
                            ))}
                        </select>
                            {/* error text */}
                        <div className='hidden md:block'>
                            <p
                                className={` text-red-500 text-sm mt-0 md:mt-1  min-h-[20px] transition-all duration-300 ${errors.deperCityError ? "opacity-100 visible" : "opacity-0 invisible"
                                    }`}
                            >
                                Please select a city
                            </p>
                        </div>
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-col ">
                        <div className='flex flex-row items-center gap-2 pb-1'>
                            <label htmlFor="datePicker" className="text-gray-700 text-[14px] font-bold md:mb-2 ">
                                TRAVEL DATE

                            </label>
                            <div className='block md:hidden '>
                                <p
                                    className={`text-red-500 text-sm mt-0 md:mt-1  min-h-[20px] transition-all duration-300 ${errors.dataError ? "opacity-100 visible" : "opacity-0 invisible"
                                        }`}
                                >
                                    Please select a date
                                </p>
                            </div>
                        </div>
                        <Flatpickr
                            id="datePicker"
                            onChange={dateHandler}
                            options={{
                                dateFormat: "Y-m-d",
                                minDate: "today",
                                maxDate: new Date().fp_incr(10),
                                 disableMobile: true, // মোবাইলের ডিফল্ট UI বন্ধ করতে এই লাইনটি যোগ করা হয়েছে এছাড়াও responsive screen এ জেনো  style ঠিক মত্ন কাজ করে 
                            }}
                            placeholder="Select Date"
                            className={`w-full  h-10 md:h-12 px-4 text-gray-700 bg-gray-100 rounded-lg shadow-md focus:outline-none ${errors.dataError
                                ? "border-red-500 ring-4 ring-red-500"
                                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                }`}
                        />
                        {/* error text */}
                        <p
                            className={`hidden md:block text-red-500 text-sm mt-0 md:mt-1  min-h-[20px] transition-all duration-300 ${errors.dataError ? "opacity-100 visible" : "opacity-0 invisible"
                                }`}
                        >
                            Please select a date
                        </p>
                    </div>

                    {/* Search Button */}
                    <div className="flex items-center pt-2">
                        <button
                            type="submit"
                            className="w-full h-12 md:h-14 px-4 text-white bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:ring-4 focus:ring-green-500 font-bold"
                        >
                            Search Bus
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

LocationSlec.propTypes = {
    locations: PropTypes.object,
};

export default LocationSlec;


// (1)==> দেখুন যেহেতু আমাদের তিনটা input box validate করতে হবে তাই আমাদের তিন্তা state বানাতে হতো validate করার জন্য কিন্তু এখানে আমরা জানি একটা state এর মদ্ধেই আমরা multiple value store করে রাখতে পারি object আকারে হোক বা array আকারে হোক যেভাবে আপনার প্রয়োজন প্রক্রিত অরথে একটা STATE তইরি করে multiple value staor করেছি ঠিকই সেই state কিন্তু প্রতি multiple value এর জন্য আলাদা আল্কাদা করে perform করবে সো সে multiple data এর জন্য আলাদা আলদা state create করাও যা আবার একই state এর মদ্ধে array or object আকারে data store করাটাও সেইম তাহলে আমাদের কখন এরকম multi value একই state এর মদ্ধে রাখা উচিত যখন দেখবেন যে প্রতিটা store কৃত multi value এর কাজ সেইম তাহলে তাদেরকে আপনার উচিত আলাদ আলাদা state use na করে এভাবে একই state এর মদ্ধে রেখে কাজ করার।

// (2) ==> আপনি সবসময় মনে রাখবেন আপনি যদি কোনো setstate এর মদ্ধে একটা fn চালিয়ে দেন তাহলে সেই fn এর first perameter autometic সেই state এ থাকা যতো ভেলু আছে তা এক এক করে রিসিভ করবে লুপের মাদ্ধমে অরথার সে প্রতিটা ভেলু কে পেতে সব কয়টা ভেলুর উপরে কোনো লুপ না সেট করেই লুপের মতন সেই তার প্রতিট ভেলুকে রিসিভ করে থাকে।

// তাহলে এখানে আমরা কি করছে এবার বুঝুন তা হলো আমরা prev perameter দিয়ে state এর মদ্ধে থাকা সমস্ত ভেলু কে ধরে নিলাম আর এর জন্যি আমাদের এই falsestate এর মদ্ধে fn চালাতে হয়েছে এক্ষণ prev দিয়ে প্রতি ভেলু ধরার পরে তার মদ্ধে থেকে আমরা নিরদিস্টহ ভেলু নিয়ে কাজ করবো বা update করবো এখত্ত্রে আমরা অই state এর মদ্ধে থাকা leavCityError: এই ভালু update করবো এক্ষণ আপডেট করার আগে একটা গুরুতপুরন বিশ্য মনে রাখবেন তা হল যেহেতু আমাদের এখানে একটা state এর মদ্ধে multiple velu আছে আর প্রতিটা ভেলু যেহেতু object আকারে stoare করা আছে এর মদ্ধে থেকে নিরদিস্টহ ভেলুকে যদি আপডেট করতে চান তাহলে state এর মদ্ধে থাকা বাকি সব ভেলু আপনার update কৃত ভেলু দিয়ে আপডেট হয়ে যায় তাহলে দিন শেশে আপনি কেবল সেই আপডেট কৃত ভেলুই পাবেন এই state এর মদ্ধে এখানে বাকি ভেলু গুলি পাবেন না যা object আকারে store করেছিলেন।  এজন্যি এখানে পূর্বের ভেলু গুলিকে ধরে রেকে শুধু সুনিরদিস্ট ভেলু আপডেট করতে হলে আপনাকে আবশ্যি spreed oparetor triple dot use করতে হবে তাই আমরা ...prev use করে পুরব othars velu ধরে রেখে নির্দিষ্ট ভেলু আপডেট করেছি মাত্র । আর যদি এই state এ multiple value না থাক্তো তাহলে আপনাকে পূর্বের ভেলু আপডেট করার প্রয়োজন হতো না। আর এখানে যেটা আপডেট করেছি তা হলো  leavCityError: getLeavCityValue === "Select Leaving City" এটাএখানে এই leavCityError: মদ্ধে এই getLeavCityValue === "Select Leaving City" condition টা apply করেছি যদি এটি মিলে যায় তাহলে এটার eavCityError: মদ্ধে true set হবে আর না মিল্লে আর এখানে এই লাইনে যা করা হয়েছে তা হল selectbox এ যদি ক্লিক করে কোণ কিছু সিলেক্ট না করে তাহলে যেনো একটা error text দেখাই বা box টার কালার change করে ফ্লে আর যদি তাতখনি কোনো option select করে তাহলে জেনো erro চলে যায়। মনে রাখবেন এটা submite button এর ক্লিক করলে error টা দেখানোর জন্য জন্য নয় এটা আলাদা ভাবে submit button এ ক্লিক না করেই যদি আপনি by deafult থাকা অবস্থাতে কণ option select করে থাকেন এবং তারপরে আবার unselect করে থাকেন তাহলে সেই error কে handle করতে পাশাপাশি submit button এ ক্লিক করার পরে অই box টা যদি unselected অবস্তাহতে থাকে তাহলে সেখানে কোনো option select করলে জেনো সাথে সাথে warnning চলে যায়। এজন্য। আর এখানে আরেকটা গুরুতপুরন বিষয় তা হলো এখানে আমি যে এই leavCityError: getLeavCityValue === "Select Leaving City" condition apply করেছি এখানে আমি এই getLeavCityValue টা use না করে এটার ভেলু তো উপরেই অই state এর store করা আছে তাহলে সেই state name use না করে সরাসরি ভেলু গেট করে যে ভেরি তে রেখেছি সেটা কেনো ব্যবিহার করলাম এটা করেছি এজন্য কারন state এর velu কিছু কিছু খেত্ত্রে এক ধাপ পিছিয়ে তাকে আর আমি রিয়েলটাইম ভেলু আপডেট করতে হয়েছে কারন এই box এর মদ্ধে যখন কোনো ভেলু unselect থাকবে সাথে সাথেই warnning দিবে আর যদি তাতখনিক select করে তাহলে সাথে আস্থেই warnning চলে যাবে।