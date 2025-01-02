
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import bgimg from '../../../../assets/imgages/BbusBG.png'


const leftSeat = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];
const leftSecondSeat = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"];
const c1Seat = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"];
const d1Seat = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"];

const BusSlctCard = ({ leavCity, deperCity, data }) => {
    console.log(data);
    const appStyle = {
        backgroundImage: `url(${bgimg})`,
        width: '254px',
        height: '568px',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '44%',
        backgroundPositionY: '50%',
        backgroundSize: '105% 99%',
        borderRadius: '15% 15% 5% 5%',
        borderBottom: '2px solid white',
        borderLeft: '2px solid white',
        borderRight: '2px solid white',
    };

    const [visibility, setVisibility] = useState([]); // Visibility state
    const getBus = data[leavCity][deperCity].buses;

    // এখন এখানে যদি api তে bus সংখায় বাড়ায় তাহলে যেনো এখানে সেটা auto update হয়ে যায় এজন্য useEffect করা হয়েছে
    useEffect(() => {
        const initialVisibility = Array(getBus.length).fill(false); //(4)
        setVisibility(initialVisibility);
    }, [getBus]);


    const toggleVisibility = (indxx) => {
        setVisibility(prev => (
            prev.map((visible, i) => (i === indxx ? !visible : visible))
        ))
    }
    // Hide visibility for a specific index
    const handleCrossBTN = (indxx) => {//(3)
        setVisibility(prevVisibility =>
            prevVisibility.map((visible, i) => (i === indxx ? false : visible))//(2)(6)
        );
    };
    return (
        <div>
            {/* buss time and info card  start*/}
            <div className="flex flex-row justify-between items-center  h-12 bg-gray-400 mx-auto px-2 mt-4 font-bold text-[15px] md:text-lg">
                <p>Coach Info</p>
                <p>Departure Time</p>
                <p>Fare (BDT)</p>
            </div>
            {/* buss time and info card  end*/}
            {/* looping for get each busses */}
            {
                getBus.map((singleBus, indxx) => (
                    <div key={indxx}>
                        <div>
                            {/* available buss card start*/}
                            <div className=" flex flex-row justify-between items-center px-2 py-6 mx-auto bg-white border border-black">
                                <div>
                                    <h1 className="font-bold text-[#656060]">
                                        RAKIB TR <sup className="text-[10px]">TM</sup>
                                    </h1>
                                    <p className="text-[12px] md:text-md text-[#656060]">
                                        Bus ID: {singleBus.busId}
                                    </p>
                                    <p className="italic text-[12px] md:text-md text-[#656060]">
                                        Class: {singleBus.class}
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row md:gap-3 items-center">
                                    <p>Time:</p>
                                    <p className="text-sm md:text-md text-[#656060]">
                                        {singleBus.time}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end items-end gap-2">
                                    <p>{singleBus.fare}(tk)</p>
                                    <button
                                        onClick={() => toggleVisibility(indxx)}
                                        className="px-2 md:px-4 py-1 md:py-1 bg-blue-600 text-sm md:text-md text-white"
                                    >
                                        {visibility[indxx] ? 'Hide Seats' : 'Select Seat'}
                                    </button>
                                </div>
                            </div>
                            {/* available buss card end*/}
                            {/* Seat planning section start*/}
                            {visibility[indxx] && (
                                <div className="w-[100%] md:w-3/4 mx-auto bg-white p-4">
                                    {/* Cross button */}
                                    <div className="flex">
                                        <span
                                            onClick={() => handleCrossBTN(indxx)}
                                            className="ms-auto cursor-pointer text-2xl"
                                        >
                                            <RxCross2 />
                                        </span>
                                    </div>
                                    <div>
                                        <div style={appStyle} className="flex flex-row gap-12 ps-4 text-[#656060]">
                                            <div className="flex flex-row pt-28 gap-3">
                                                <div className="flex flex-col gap-2">
                                                    {leftSeat.map((sinSeat) => (
                                                        <button
                                                            key={sinSeat}
                                                            style={{ borderRadius: '15px 15px 7px 7px' }}
                                                            className="w-8 h-8 xl:w-9 xl:h-9 seatBTN bg-white text-sm"
                                                        >
                                                            {sinSeat}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    {leftSecondSeat.map((sinSeat) => (
                                                        <button
                                                            key={sinSeat}
                                                            style={{ borderRadius: '15px 15px 7px 7px' }}
                                                            className="w-8 h-8 xl:w-9 xl:h-9 seatBTN bg-white text-sm"
                                                        >
                                                            {sinSeat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-row pt-28 gap-3">
                                                <div className="flex flex-col gap-2">
                                                    {c1Seat.map((sinSeat) => (
                                                        <button
                                                            key={sinSeat}
                                                            style={{ borderRadius: '15px 15px 7px 7px' }}
                                                            className="w-8 h-8 xl:w-9 xl:h-9 seatBTN bg-white text-sm"
                                                        >
                                                            {sinSeat}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    {d1Seat.map((sinSeat) => (
                                                        <button
                                                            key={sinSeat}
                                                            style={{ borderRadius: '15px 15px 7px 7px' }}
                                                            className="w-8 h-8 xl:w-9 xl:h-9 seatBTN bg-white text-sm"
                                                        >
                                                            {sinSeat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Seat planning section end*/}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
BusSlctCard.propTypes = {
    leavCity: PropTypes.string,
    deperCity: PropTypes.string,
    data: PropTypes.string
}
export default BusSlctCard;




// (2) ==> এখানে আমার লপিং করে তইরি করা section গুলির index number এর সাথেযদি usestate এর রাখা সেই প্রতিটা section এর জন্য store করা true or false এর indx number মিলে যায় তাহলে সেই index position এর state valu update হয়ে যায়। আর মিলে না গেলে visible হবে মানে আগের অবস্থানেই থাকবে যা অই prevVisibility.map এর পেরামিটার এখন বলতে পারেন এখানে কিভাবে state এর শুধু নির্দিষ্ট ভেলুই আপডেট হচ্ছে কেনো অন্য ভেলু গুলি রিসেট হয়ে যাচ্ছে না এবং কেনো সেখত্ত্রে spreed oparetor use করলাম না তা বুঝতে নিচে দেখুন

// (6)==>আপনার প্রশ্নটি চমৎকার। আপনার useState ব্যবহার এবং spread operator নিয়ে যে দ্বিধা হয়েছে তা ব্যাখ্যা করছি।

// প্রথম উদাহরণ (errs state):
// javascript
// Copy code
// const [errs, setErrs] = useState({ slctLeaving: false, slctDeparting: false, datee: false });

// const handleSlecDeparting = (e) => {
//     const getDepartValue = e.target.value;
//     setErrs(prev => ({ ...prev, slctDeparting: getDepartValue === "Select City" }));
// };
// এখানে spread operator কেনো দরকার?
// errs একটি অবজেক্ট:

// errs স্টেট একটি অবজেক্ট। যখন আমরা setErrs ব্যবহার করি, নতুন ভ্যালু সেট করতে গিয়ে অবজেক্টের বাকি ভ্যালুগুলো হারিয়ে যাবে যদি আমরা শুধু slctDeparting আপডেট করি।
// উদাহরণ:

// javascript
// Copy code
// setErrs({ slctDeparting: true });
// এটা করলে পুরোনো অবজেক্টের slctLeaving এবং datee হারিয়ে যাবে।

// পুরোনো ভ্যালু ধরে রাখতে ...prev ব্যবহার:

// Spread operator (...prev) ব্যবহার করলে prev এর সব ভ্যালু ধরে রাখা হয় এবং আমরা শুধু যে ভ্যালুটি আপডেট করতে চাই সেটি নির্দিষ্ট করে দিতে পারি।
// এখানে:
// javascript
// Copy code
// ({ ...prev, slctDeparting: getDepartValue === "Select City" })
// এটি errs এর বাকি ভ্যালুগুলো (slctLeaving এবং datee) অপরিবর্তিত রেখে শুধু slctDeparting আপডেট করে।
// দ্বিতীয় উদাহরণ (visibility state):
// javascript
// Copy code
// const [visibility, setVisibility] = useState([]);

// const toggleVisibility = (indxx) => {
//     setVisibility(prevVisibility =>
//         prevVisibility.map((visible, i) => (i === indxx ? !visible : visible))
//     );
// };
// এখানে spread operator কেনো লাগেনি?
// visibility একটি অ্যারে:

// visibility একটি অ্যারে, এবং map ফাংশন একটি নতুন অ্যারে তৈরি করে। তাই prevVisibility.map(...) করলে সরাসরি নতুন অ্যারে রিটার্ন হয়।
// map ফাংশন পুরোনো অ্যারেকে পরিবর্তন না করে একটি নতুন অ্যারে তৈরি করে, তাই spread operator ছাড়াই এটি কাজ করে।
// পুরোনো ভ্যালু সংরক্ষণের প্রয়োজন নেই:

// যেহেতু map পুরো অ্যারের প্রতিটি আইটেম নিয়ে কাজ করে, নতুন অ্যারেতে প্রতিটি ভ্যালু আগে থেকেই অন্তর্ভুক্ত থাকে। তাই ...prevVisibility ব্যবহার করার দরকার হয় না।
// মূল পার্থক্য:
// উদাহরণ	স্টেট টাইপ	কেনো Spread Operator দরকার?
// errs	অবজেক্ট	নতুন ভ্যালু যোগ করার সময় পুরোনো ভ্যালুগুলো হারিয়ে যায়। তাই ...prev দিয়ে পুরোনো ভ্যালু ধরে রাখতে হয়।
// visibility	অ্যারে	map ফাংশন নতুন অ্যারে তৈরি করে এবং পুরোনো অ্যারেকে প্রভাবিত করে না। তাই ...prev প্রয়োজন হয় না।
// সংক্ষিপ্ত উত্তর:
// অবজেক্ট স্টেটের ক্ষেত্রে (যেমন: errs): পুরোনো ভ্যালু হারিয়ে না যেতে spread operator ব্যবহার করতে হয়।
// অ্যারে স্টেটের ক্ষেত্রে (যেমন: visibility): map, filter, বা slice এর মতো ফাংশন ব্যবহার করলে স্বাভাবিকভাবেই নতুন অ্যারে তৈরি হয়, তাই spread operator প্রয়োজন হয় না।ঠিক এবং React-এর ইমিউটেবল স্টেট ব্যবস্থাপনার নীতিমালা অনুযায়ী কাজ করছে।






// (4)==> যখন useEffect টা চলবে তখন সে একটি নতুন array create করবে কারন আমরা মেইন জাইগাতে item update করেছি এই জন্য এখানে state এও upadate করা জন্যি এটা করছি এখানে update করার জন্য সে শুধু প্রইবরতন কৃত ভেলুটিকেই update করে দিবে বিশয়টা তা না বন্রং সে নতুন ভেলু add করার জন্য আবার সম্পুন নতুন একটা array create করে update কৃত ভেলু নিয়ে আর প্রতিটা ভেলুতে ডট fill দিয়ে true ভেলু সেট করে দেওয়া হচ্ছে । তাহলে এখানে যেটা হচ্ছে str এর lenght যতটা ঠিক ততগুলি array item তইরি হচ্ছে আর এখানে useEffect যেটা করে সেটা হলো ঠিক তখনি এই নতুন array তইরি হবে যখন str এর মদ্ধগে velu upadte হবে যা dependence তে সেট করা আছে।



// (3)==> এখানে setVisibility এর মদ্ধে যে আমি একটা callback fn create করেছি এর মদ্ধে এই prevVisibility পেরামিটারটা আপনার state এর মদ্ধে থাকা সমস্ত ভেলু কে গেট করে এখানে ভাবতে পারেন একটি sate এর মদ্ধে arrow callback fn তইরি করলে তার পেরামিটার কিভাবে অই state এ থাকা সমস্ত ভালেউ গেট করে এটা আসলে state management এর বিষয় । এখানে মনে রাখবেন আপনি যদি কোনো state এর মদ্ধে array আকারে অনেক ডাটা থাকে তাহলে আপনি সেই প্রতিটা ডাটা অই state fn এর মদ্ধে একটা arrow calback fn create করে তার পেরামিটার দিয়ে আপনি সব ভেলু গুলিকে ধরতে পারবেন। আর  এখানে ভেলু গুলিকে অই পেরামিটার দিয়ে ধরে তার উপরে আমারা loop চালিয়ে নিজেদের কাজে ব্যবহার করেছি।