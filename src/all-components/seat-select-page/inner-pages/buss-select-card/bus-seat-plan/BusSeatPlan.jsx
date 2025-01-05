 import { RxCross2 } from "react-icons/rx";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert"; // For styled toast
import bgimg from '../../../../../assets/imgages/BbusBG.png'
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import './busseatplan.css'

const leftSeat = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];
const leftSecondSeat = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"];
const c1Seat = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"];
const d1Seat = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"];
const BusSeatPlan = ({ leavCity, deperCity, data }) => {
    const appStyle = {
        backgroundImage: `url(${bgimg})`,
        width: '262px',
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
    // const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState({});
    

    const [openToast, setOpenToast] = useState(false); // State to manage Snackbar visibility
    const getBus = data[leavCity][deperCity].buses;
    console.log(getBus);
    
    // এখন এখানে যদি api তে bus সংখা বাড়ায় তাহলে যেনো এখানে সেটা auto update হয়ে যায় এজন্য useEffect করা হয়েছে
    useEffect(() => {
        const initialVisibility = Array(getBus.length).fill(false); //(4)
        setVisibility(initialVisibility);
    }, [getBus]);

    //select seat button toggle fn
    const toggleVisibility = (indxx) => {
        setVisibility(prev => (
            prev.map((visible, i) => (i === indxx ? !visible : visible))//(2)(6)
        ))
    }
    // cross button fn
    const handleCrossBTN = (indxx) => {//(3)
        setVisibility(prevVisibility =>
            prevVisibility.map((visible, i) => (i === indxx ? false : visible))//(10)
        );
    };

    const seatSelectHandler = (busId, sinSeat) => {//(0091)
        setSelectedSeats((prev) => {//মনে রাখবেন এখানে prev দিয়ে state এর সব ডাটা ধরা হচ্ছে
            // আগের সিটগুলো বের করুন
            const currentSeats = prev[busId] || [];//(001) 

            // সিট আগে থেকে সিলেক্ট করা থাকলে তা সরান
            if (currentSeats.includes(sinSeat)) {
                return {
                    ...prev, [busId]: currentSeats.filter((seat) => seat !== sinSeat),// (002)
                };
            }
            // সিট লিমিট চেক করুন, যদি ৪ এর বেশি হয়
            if (currentSeats.length >= 4) {
                setOpenToast(true); // নোটিফিকেশন দেখান
                return prev;
            }

            // নতুন সিট সিলেক্ট করুন
            return {
                ...prev, [busId]: [...currentSeats, sinSeat],
            };
        });
    };

    //remove from the cart
    const removeSeatFromCart = (busId, seat) => {
        setSelectedSeats((prev) => ({
            ...prev,
            [busId]: prev[busId].filter((s) => s !== seat),
        }));
    };

    //handle toast
    const handleCloseToast = () => {
        setOpenToast(false);
    }
    // Total fare calculation function
    // Total fare calculation function
    const calculateTotalFare = (busId) => {
        const selectedSeatsForBus = selectedSeats[busId] || []; // সিলেক্টেড সিট গুলো বের করা
        if (!selectedSeatsForBus.length) {
            // যদি কোনো সিট সিলেক্ট না করা হয়
            return {
                totalFare: 0,
                processFee: 0,
                bankCharge: 0,
                totalAmount: 0,
            };
        }

        const bus = getBus.find(bus => bus.busId === busId); // সঠিক বাস বের করা
        const totalFare = selectedSeatsForBus.length * bus.fare; // সিট সংখ্যা × বাস ভাড়া
        const processFee = 25; // ফিক্সড প্রসেসিং ফি
        const bankCharge = 0; // ফিক্সড ব্যাংক চার্জ
        const totalAmount = totalFare + processFee + bankCharge;

        return {
            totalFare,
            processFee,
            bankCharge,
            totalAmount,
        };
    };


    return (
        <div>
            <div>
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
                                {visibility[indxx] && ( // (9)
                                    <div className=" bg-white px-4 w-full">
                                        {/* Cross button */}
                                        <div className="flex">
                                            <span
                                                onClick={() => handleCrossBTN(indxx)}
                                                className="ms-auto cursor-pointer text-2xl"
                                            >
                                                <RxCross2 />
                                            </span>
                                        </div>

                                        <div className='flex flex-col gap-4 lg:flex-row items-center lg:items-start'>
                                            {/* refresh button  */}
                                            {/* <div className='absolute left-[7.5%] top-[0.9%]'>
                                                <button className='custom-button shadow-2xl'>
                                                    Refresh
                                                </button>
                                            </div> */}


                                            <div style={appStyle} className="w-1/3 flex flex-row gap-[54px]  items-end justify-center pb-4  text-[#656060] shadow-[0_4px_15px_1px_rgba(0,0,0,1)]">
                                                <div className="flex flex-row pt-28 gap-3">
                                                    <div className="flex flex-col gap-2">

                                                        {leftSeat.map((sinSeat) => (
                                                            <button
                                                                onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
                                                                key={sinSeat}
                                                                style={{ borderRadius: '15px 15px 7px 7px' }}
                                                                className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}

                                                            >
                                                                {sinSeat}
                                                            </button>
                                                        ))}

                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {leftSecondSeat.map((sinSeat) => (
                                                            <button
                                                                onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
                                                                key={sinSeat}
                                                                style={{ borderRadius: '15px 15px 7px 7px' }}
                                                                className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}

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
                                                                onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
                                                                key={sinSeat}
                                                                style={{ borderRadius: '15px 15px 7px 7px' }}
                                                                className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}

                                                            >
                                                                {sinSeat}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {d1Seat.map((sinSeat) => (
                                                            <button
                                                                onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
                                                                key={sinSeat}
                                                                style={{ borderRadius: '15px 15px 7px 7px' }}
                                                                className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}

                                                            >
                                                                {sinSeat}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col items-center w-full md:w-[74.66%] gap-2 md:gap-16">
                                                <div>
                                                    <div className=' '>
                                                        <p className=' text-justify font-bold text-sm sm:text-[16px]'> White Colored Seats Are Available For You. Click Once on which Seat You want to reserve. You Can Buy Maximum 4 Seats at a time. When you select a seat you will get 2 minutes to go for payment. When you go for payment you will get 10 minutes to complete the payment.</p>
                                                    </div>
                                                    <div className="flex flex-row w-full gap-2 sm:pt-1 pt-2 seatinfo_and_fare_sec_cus">
                                                        {/* Cart section start */}
                                                        <div className="flex-1 h-fit min-h-[198px] border border-gray-300 rounded-md bg-white">
                                                            <table className="w-full border-collapse">
                                                                <thead>
                                                                    <tr className="bg-gray-100 border-b border-gray-300 text-[16px]">
                                                                        <th className="py-2 px-2 lg:px-4 font-semibold">Seats</th>
                                                                        <th className="py-2 px-2 lg:px-4 font-semibold">Fare</th>
                                                                        <th className="py-2 px-2 lg:px-4 font-semibold">Class</th>
                                                                        <th className="py-2 px-2 lg:px-4 font-semibold">Cancel</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {selectedSeats[singleBus.busId]?.map((seat) => (
                                                                        <tr key={seat} className="bg-white border-b border-gray-200 text-center">
                                                                            <td className="py-2 px-2 lg:px-4">{seat}</td>
                                                                            <td className="py-2 px-2 lg:px-4">{singleBus.fare}</td>
                                                                            <td className="py-2 px-2 lg:px-4">{singleBus.class}</td>
                                                                            <td className="py-2 px-2 lg:px-4">
                                                                                <button
                                                                                    className="text-red-500 hover:scale-125 transition-transform duration-300"
                                                                                    onClick={() => removeSeatFromCart(singleBus.busId, seat)}
                                                                                >
                                                                                    ✕
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        {/* Cart section end */}

                                                        {/* Fare Calculation */}
                                                        <div className="flex-1 h-fit p-4 bg-white border border-gray-300 rounded-md">
                                                            {(() => {
                                                                const { totalFare, processFee, bankCharge, totalAmount } = calculateTotalFare(singleBus.busId);
                                                                return (
                                                                    <>
                                                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                                            <span className="text-gray-600 font-medium">Total Fare:</span>
                                                                            <span className="text-gray-800 font-semibold">{totalFare} BDT</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                                            <span className="text-gray-600 font-medium">Process Fee:</span>
                                                                            <span className="text-gray-800 font-semibold">{processFee} BDT</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                                                            <span className="text-gray-600 font-medium">Bank Charge:</span>
                                                                            <span className="text-gray-800 font-semibold">{bankCharge} BDT</span>
                                                                        </div>
                                                                        <div className="flex justify-between items-center py-2">
                                                                            <span className="text-gray-600 font-medium">Total Amount:</span>
                                                                            <span className="text-gray-800 font-semibold">{totalAmount} BDT</span>
                                                                        </div>
                                                                    </>
                                                                );
                                                            })()}
                                                        </div>
                                                        {/* Fare Calculation end*/}
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <div className="w-[100%] mx-auto p-3 border rounded-md shadow-md ">
                                                        <div className="grid grid-rows md:grid-cols-2 gap-4">
                                                            {/* Mobile No. */}
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-700">
                                                                    Mobile No.
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="01XXXXXXXXX"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>

                                                            {/* Email Address */}
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-700">
                                                                    Email Address
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    placeholder="abc@example.com"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>

                                                            {/* Full Name */}
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-700">
                                                                    Full Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="MR. XYZ"
                                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>

                                                            {/* Gender */}
                                                            <div>
                                                                <label className="block text-sm font-bold text-gray-700">
                                                                    Gender
                                                                </label>
                                                                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                                    <option>Male</option>
                                                                    <option>Female</option>
                                                                    <option>Other</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {/* Terms and Conditions */}
                                                        <div className="mt-4">
                                                            <label className="inline-flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                                />
                                                                <span className="ml-2 text-sm text-gray-700">
                                                                    I agree to the{" "}
                                                                    <a href="#" className="text-indigo-600 hover:underline">
                                                                        Terms and Conditions
                                                                    </a>{" "}
                                                                    and{" "}
                                                                    <a href="#" className="text-indigo-600 hover:underline">
                                                                        Cancel Policy
                                                                    </a>
                                                                </span>
                                                            </label>
                                                        </div>

                                                        {/* Buttons */}
                                                        <div className="mt-6 flex justify-end space-x-4">
                                                            <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600">
                                                                Cancel
                                                            </button>
                                                            <button className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700">
                                                                Payment Method
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                    </div>
                                )}
                                {/* Seat planning section end*/}
                            </div>

                            <div>

                            </div>


                            {/* Toast (Snackbar) */}
                            <Snackbar
                                open={openToast}
                                autoHideDuration={3000}
                                onClose={handleCloseToast}
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                                <Alert onClose={handleCloseToast} severity="warning" variant="filled">
                                    You can select up to 4 seats only!
                                </Alert>
                            </Snackbar>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
BusSeatPlan.propTypes = {
    leavCity: PropTypes.string,
    deperCity: PropTypes.string,
    data: PropTypes.string
}
export default BusSeatPlan; 

// (001) ==> এখানে prev দিয়ে আমরা জানি এই state এর মদ্ধে যতো ভেলু আছে তা এই prev perameter দিয়ে ধরা যাবে তাহলে এখানে prev এর মদ্ধে সকল ভেলু প্রথমে বাস গুলি object আকারে থাকবে আর সেই প্রতিটা বাস object এর মদ্ধে সেই বাসের সিট গুলি array আকারে store হবে। তাহলে এখানে বলতে পারেন আমরা এই state এর মদ্ধে তো ভেলু গুলি object আকারে রাখতে সেট করেছি stae এর মদ্ধে initially object তাহলে তার মদ্ধে আবার সিট গুলি array আকারে কিভাবে থাখছে আর  এই array আকারে রাকা হচ্ছে নিছের এই ...prev, [busId]: [...currentSeats, sinSeat], এইটার মাদ্ধ্যমে এক্ষণ এখানে এই ...prev, [busId]: [...currentSeats, sinSeat], টার মদ্ধে প্রক্রিত আকারে কি হচ্ছে তা নিছে আলোচনা করা আছে আপনি শুধু এক্ষণ এখান থেকে এইটুকু বুঝেন যে এইটার মাদ্ধমে সিট গুলি array আকারে সেট হচ্ছে । তাহলে এখানে ডাটা যেভাবে সেট হচ্ছে দেখুন
// {
//     "bus1": ["A1", "A2"],
//     "bus2": ["B3"]
// }
// দেখুন আমি state এর মদ্ধে যে object initialize করেছিলাম সে জন্য প্রথমে all data object এর মদ্ধে রেখে দিছে আর সেটার মদ্ধে প্রতিটা bus এর সিট array এর মদ্ধে আছে । তাহলে এখানে এইটা prev[busId]  কি রিটান করছে দেখুন এখানে prev মানে state এর মদ্ধে পুরো object আর তার মদ্ধে আপনি কোন bus array নাম কে ধরতে বাঁ খুজতে চাচ্ছেন সেটাই এখানে[busId] এর নাদ্ধমএ খজা হয়েছে মানে আপনি কোন bus array খুজতে চাচ্ছেন সেটা এই[busId] নামে খজা হচ্ছে প্রক্রিত অরথে এখানে এই array name ই হচ্ছে আপনার api তে থাকা busId. তাহলে এখানে আমি সেই বাসের সিট গুলিকেই filter করতে চাচ্ছি যেই বাস সিলেকশনে আপনি আছেন। আর এখানে পরের অংশে যা করা হয়েছে তা হলো আপনি যে বাস এর সিটগুলি খুজতে চাচ্ছেন যদি না থাকে তাহলে তো undefin or null আসবে তখন আপনার প্রোজেক্ট ভেঙ্গে যেতে পারে এজন্য fallback জিসেবে এটা আপনাকে দিতেই হবে যদি সেটা না পায় তাহলে empty array হবে।




// (002) ==> এখানে ...orev দিয়ে state এর ভেতরে সবকিছু আগে কপি করা হচ্ছে যাতে আমি যেই ভেলু আপডেট করতে চাচ্ছি সেটি ছাড়া বাকি সব ডাটা জেনো অপরিবর্তিত থাকবে সেগুলি জেনো রিসেট না হয় এই spreed oparetor use না করলে state এর মদ্ধে থাকা যেকোনো একটা ভেলুকে আপডেট করতে গেলে সব রিসেট হয়ে যেতো
// কোলন(: ) এর কাজ
// কোলন(: ) ব্যবহার করা হয় object - এর key এবং value আলাদা করার জন্য।

// উদাহরণ:
// javascript
// Copy code
// const obj = {
//     key: value
// };
// key হলো object - এর প্রপার্টি।
// value হলো সেই প্রপার্টির মান।






// (0091) ==> আপনি হয়তো প্রথমেই ভাবতে পারেন যে এখানে কেনো retrun use করা হয়েছে । একটা কথা সবসময় মনেরাখবেন তা হলো { } দিয়ে মোড়ানো থাকলে, return স্পষ্টভাবে লিখতে হবে। অরথাত আপনাকে প্রয়োজন অনুযায়ি দরকারি জিনিশ কে return করতেই হবে। তাহলে এখানে বলতে পারেন যে আমরা আগেও তো এভাবে state এর মদ্ধে valu update করেছি কিন্তু কই সেখানে তো কোনো কিছুই retrun করতে হয়নি তাহলে এখানে কেনো retrun করতে হচ্ছে যেমন দেখুন
// setVisibility(prevVisibility =>
//     prevVisibility.map((visible, i) => (i === indxx ? false : visible))//(10)
// ); এখানেও তো আমরা state update করতেছি তাহলে এখানে কেনো retrun use করলাম না তাহলে শুনে রাখুন এখানে আপনি শুধু একটা লাইনেই single logic apply করেছে তাই সেটা auto retrun হয়ে গেছে । অরথাত মনে রাখবেন আপনি যদি কোনো arrow fn এর মদ্ধে single line logic খাটান তাহলে আপনাকে retrun করার প্রয়োজন হয়না সেটা auto retrun হয়ে যায় যেমন্টা arraow fn এর পেরামিটারে যদি আপনি single perameter use করেন তাহলে peranthesis দেবার কোনো প্রয়োজন হয়না আর যদি multiple perameter use করেন তাহলে অবশ্যি peranthesis দেবার প্রয়োজন পড়বেই। এখানেও বিশয়টা সেইম আপনি যদি multiple line multiple logic apply করেন তাহলে আপনাকে অখানে প্রয়জনিয় জিনিশ retrun করতেই হবে। তবে এখানে আপনা রমনে আরেকটি প্রশন থাকতে পারে যেমন আমরা দেখেছি যে এখানে 
// leftSeat.map((sinSeat) => (
//     <button> ... </button>
//     <button> ... </button>
//     <button> ... </button>

// ))
// দেখুন এখানে আমরা arrow fn এর মদ্ধে multtiple অরথাত তিনটা জিনিস করেছি অরথাত multiple line or logic তাহলে এখানে কেন retrun use করা লাগ্লো না এখানে আরেকটা জিনিস মনে রাখবেন তা হলো যখন arrow function এর body সরাসরি() দিয়ে মোড়ানো হয়(যাকে JSX কনটেক্সটে parenthesis বলা হয়), তখন এটি implicit return করে। অর্থাৎ, return নিজে থেকেই হয়ে যায়, আলাদা করে return লিখতে হয় না। এই ক্ষেত্রে, পুরো JSX অংশটি arrow function এর return value হিসাবে কাজ করে। যেহেতু map ফাংশন একটি নতুন অ্যারে তৈরি করে, তাই প্রতিটি < button > উপাদান map এর মাধ্যমে return করা হচ্ছে। যখন JSX কোড arrow function এর মধ্যে রাখা হয় এবং() দিয়ে মোড়ানো হয়, তখন arrow function সেই JSX কে return করে। 
// যেমন:

// javascript
// Copy code
// leftSeat.map((sinSeat) => (
//     <button> ... </button>
// )) এখানে return অপ্রকাশিত(implicit)। যদি arrow function এর body curly braces { } দিয়ে মোড়ানো হয়, তবে return স্পষ্টভাবে লিখতে হবে, কারণ curly braces ফাংশনের বডিকে নির্দেশ করে এবং JavaScript ধারণা করে যে আপনি ফাংশনের মধ্যে আরও কাজ করতে চান। যেমন:
// leftSeat.map((sinSeat) => {
//     return (
//         <button> ... </button>
//     );
// })
// অরথাতঁ() ব্যবহার করলে return নিজে থেকেই হয়ে যায়(implicit return)।
// { } ব্যবহার করলে return স্পষ্টভাবে লিখতে হয়। 
// তবে এখানেও আপনার প্রশন থাকতে পারে সমস্ত arraow fn এর বডিতে multiple logic or line use করলে তাহলে সেটাকে peranthesis দিয়ে মুড়িয়ে নিবো তাহলেই তো implicit retrun হয়ে যাবে তাহলে আলাদা করে retrun করারও দরকার হবে না তাহলে এখানে কেনো আমরা carle brace use করবো আসুন সেটি বুজি
// মূল কারণ:
// যখন আপনি arrow function এ বডি হিসেবে curly braces { } ব্যবহার করেন, তখন এটি function block নির্দেশ করে। এর ফলে, আপনি যদি ফাংশনের কোনো কিছু রিটার্ন করতে চান, আপনাকে স্পষ্টভাবে return স্টেটমেন্ট ব্যবহার করতে হবে।
// উদাহরণ:
// const add = (a, b) => {
//     return a + b; // curly braces ব্লক তাই return প্রয়োজন
// };
// অন্যদিকে, যদি আপনি বডি হিসেবে parentheses() ব্যবহার করেন, এটি একটি implicit return নির্দেশ করে। তখন return স্টেটমেন্ট লিখতে হয় না।
// const add = (a, b) => (
//     a + b // parentheses থাকার কারণে এটি implicit return করবে
// );
// আপনার উদাহরণ অনুযায়ী:
// setSelectedSeats((prev) => {
//     // লজিক
//     const currentSeats = prev[busId] || [];
//     if (currentSeats.includes(sinSeat)) {
//         return {
//             ...prev, [busId]: currentSeats.filter((seat) => seat !== sinSeat)
//         };
//     }
//     if (currentSeats.length >= 4) {
//         setOpenToast(true);
//         return prev;
//     }
//     return {
//         ...prev, [busId]: [...currentSeats, sinSeat]
//     };
// });
// এখানে curly braces ব্যবহার করা হয়েছে কারণ আপনি এখানে একাধিক লজিক বা শর্ত(if/else) লিখেছেন। যদি parentheses ব্যবহার করতেন, তখন শুধুমাত্র একটি এক্সপ্রেশন রিটার্ন করা সম্ভব হতো। যেমন:
// setSelectedSeats((prev) => (
//     {
//         ...prev,
//         [busId]: [...(prev[busId] || []), sinSeat]
//     }
// ));
// কেন parentheses কাজ করবে না ?
//     parentheses দিয়ে যদি শুধুমাত্র return ব্যবহার করা ছাড়া কাজ করতে চান, তাহলে একাধিক শর্ত বা লজিক(যেমন if ব্লক) লেখা সম্ভব নয়। তাই, আপনার উদাহরণে curly braces ব্যবহার করতে হয়েছে।
// সারাংশ:
// curly braces ব্যবহার করার কারণে return স্পষ্টভাবে লিখতে হয় কারণ এটি ব্লকের শুরু নির্দেশ করে।
// parentheses ব্যবহার করলে শুধুমাত্র একটি এক্সপ্রেশন implicit return করবে।
// যেহেতু এখানে একাধিক শর্ত এবং লজিক রয়েছে, তাই curly braces ব্যবহার যুক্তিযুক্ত।
//  তবে এখানে আরেকটি জিজ্ঞাসা থাকতে পারে তা হলো 
//  আমরা তো দেখেছি peranthesis দিয়ে মুড়ানো তার বডিতে multiline অনেক লজিক ও তো করেছি তাহলে এখানে কাজ করছিলো কেমনে যেমন 
// {
//     leftSeat.map((sinSeat) => (
//         <button
//             onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
//             key={sinSeat}
//             style={{ borderRadius: '15px 15px 7px 7px' }}
//             className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}

//         >
//             {sinSeat}
//         </button>
//     ))
// }
// আপনার প্রশ্নটি গুরুত্বপূর্ণ এবং এটি পরিষ্কারভাবে বুঝিয়ে দেয় যে, JavaScript - এ arrow function এর ব্যবহারে কিছু নির্দিষ্ট নিয়ম থাকে। এখানে আমরা দেখে নেব, কেন আপনার উদাহরণে parentheses ব্যবহার করে কাজ করছে, যদিও একাধিক জিনিস ঘটছে।


// আপনার প্রশ্নটি গুরুত্বপূর্ণ এবং এটি পরিষ্কারভাবে বুঝিয়ে দেয় যে, JavaScript - এ arrow function এর ব্যবহারে কিছু নির্দিষ্ট নিয়ম থাকে। এখানে আমরা দেখে নেব, কেন আপনার উদাহরণে parentheses ব্যবহার করে কাজ করছে, যদিও একাধিক জিনিস ঘটছে।

// কারণ:
// আপনার দেওয়া উদাহরণে যা ঘটছে, তা হল map ফাংশনের মধ্যে একটি arrow function লেখা হয়েছে। এখানে মূল বিষয়টি হলো, আপনি arrow function-এর বডিতে যা কিছু করছেন, তা এক্সপ্রেশন হিসেবেই কাজ করছে। কারণ, () দিয়ে যখন arrow function এর বডি ঘিরে রাখা হয়, তখন JavaScript সেটিকে একটি single expression হিসেবে বিবেচনা করে।

// আপনার কোড:
// leftSeat.map((sinSeat) => (
//     <button
//         onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
//         key={sinSeat}
//         style={{ borderRadius: '15px 15px 7px 7px' }}
//         className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}
//     >
//         {sinSeat}
//     </button>
// ));

// এখানে পুরো button ট্যাগটি একটি JSX expression।

// কী হচ্ছে এখানে:
// JSX element নিজেই একটি এক্সপ্রেশন: JSX একটি JavaScript এক্সপ্রেশনের মতো কাজ করে। অর্থাৎ, এটি একটি value বা result return করে।

// () দ্বারা এক্সপ্রেশন ঘেরা: আপনি যখন() ব্যবহার করেছেন, এটি স্পষ্টভাবে ইঙ্গিত করে যে এই arrow function কেবলমাত্র একটি এক্সপ্রেশন return করছে। যেহেতু JSX নিজেই একটি এক্সপ্রেশন, তাই এখানে return স্টেটমেন্টের প্রয়োজন হয় না।

// তুলনা:
// যদি curly braces {  } ব্যবহার করতেন, তাহলে JavaScript এটি একটি ব্লক হিসেবে বিবেচনা করত, এবং স্পষ্টভাবে return স্টেটমেন্ট ব্যবহার না করলে কিছুই return করত না। উদাহরণ:

// leftSeat.map((sinSeat) => {
//     return (
//         <button
//             onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
//             key={sinSeat}
//             style={{ borderRadius: '15px 15px 7px 7px' }}
//             className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}
//         >
//             {sinSeat}
//         </button>
//     );
// });
// এখানে curly braces থাকলে return স্টেটমেন্ট না দিলে এটি কাজ করত না।

// সংক্ষিপ্ত উত্তর:
// parentheses ব্যবহার করলে এটি একটি implicit return নির্দেশ করে।
// JSX নিজেই একটি এক্সপ্রেশন হওয়ায়, () এর ভেতরে রাখা হলে এটি স্বাভাবিকভাবে return হয়ে যায়।
// যদি curly braces { } ব্যবহার করেন, তবে এটি ব্লক নির্দেশ করে, যেখানে স্পষ্টভাবে return ব্যবহার করতে হবে।
// সারাংশ:
// আপনার কোডে parentheses কাজ করছে কারণ সেখানে শুধুমাত্র একটি এক্সপ্রেশন আছে যা return হচ্ছে। curly braces ব্যবহার করলে এটি ব্লক হয়ে যায়, তাই return প্রয়োজন।







// You said:
// যদি curly braces { } ব্যবহার করেন, তবে এটি ব্লক নির্দেশ করে, যেখানে স্পষ্টভাবে return ব্যবহার করতে হবে। এইটা আমি ঠিক বুঝলাম না আরো সহজ করুন
// ChatGPT said:
// ChatGPT
// অবশ্যই, সহজ করে ব্যাখ্যা করছি।

// Curly Braces { } এবং Parentheses() এর পার্থক্য:
// Curly Braces { } ব্যবহার করলে:

// এটি একটি ব্লক(block) তৈরি করে।
// ব্লকের মধ্যে আপনি যেকোনো লজিক লিখতে পারেন, যেমন: if, for, let বা const ইত্যাদি।
//     কিন্তু, যদি আপনি ফাংশন থেকে কোনো কিছু ফেরত (return) দিতে চান, তাহলে আপনাকে return লিখতে হবে।
// উদাহরণ:

// javascript
// Copy code
// const add = (a, b) => {
//     const sum = a + b; // লজিক
//     return sum;        // রিটার্ন করতে হবে
// };
// Parentheses() ব্যবহার করলে:

// এটি একটি single expression নির্দেশ করে।
// এক্সপ্রেশন হলে JavaScript স্বয়ংক্রিয়ভাবে সেটিকে return করে।
// এখানে return আলাদাভাবে লিখতে হয় না।
// উদাহরণ:

// javascript
// Copy code
// const add = (a, b) => (
//     a + b // এক্সপ্রেশন, যা স্বয়ংক্রিয়ভাবে return হবে
// );
// আপনার উদাহরণে কেন return লাগছে বা লাগছে না:
// Curly Braces { } দিয়ে লিখলে:
// javascript
// Copy code
// leftSeat.map((sinSeat) => {
//     return (
//         <button
//             onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
//             key={sinSeat}
//             style={{ borderRadius: '15px 15px 7px 7px' }}
//             className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}
//         >
//             {sinSeat}
//         </button>
//     );
// });
// এখানে curly braces ব্যবহার করার কারণে JavaScript ভাবছে আপনি একটি ব্লক খুলেছেন।
// ব্লকের মধ্যে যা কিছু লিখবেন, সেটি শুধু লজিক বা প্রসেস চালাবে। কিন্তু আপনি যদি কিছু return করতে চান, সেটা আলাদাভাবে বলতে হবে(এক্ষেত্রে return দিয়ে)।
// Parentheses() দিয়ে লিখলে:
// javascript
// Copy code
// leftSeat.map((sinSeat) => (
//     <button
//         onClick={() => seatSelectHandler(singleBus.busId, sinSeat)}
//         key={sinSeat}
//         style={{ borderRadius: '15px 15px 7px 7px' }}
//         className={`w-9 hover:bg-green-500 h-9 shadow-[0_4px_15px_1px_rgba(0,0,0,1)] font-bold text-sm seatBTN ${selectedSeats[singleBus.busId]?.includes(sinSeat) ? "bg-gray-600" : "bg-white"} text-black`}
//     >
//         {sinSeat}
//     </button>
// ));
// এখানে parentheses ব্যবহার করার কারণে JavaScript এটাকে একটি এক্সপ্রেশন ধরে।
// এক্সপ্রেশন হলে JavaScript স্বয়ংক্রিয়ভাবে return করে।
// তাই এখানে return আলাদা করে লিখতে হয় না।
// এটি মনে রাখুন:
// { }: যখন একটি ব্লক(লজিক, শর্ত, বা অন্যান্য কোড) দরকার হয় এবং return স্পষ্টভাবে লিখতে হয়।
// (): যখন শুধুমাত্র একটি এক্সপ্রেশন রয়েছে এবং return স্বয়ংক্রিয়ভাবে হয়।
// আরো সহজ উদাহরণ:
// javascript
// Copy code
// // Curly Braces: return প্রয়োজন
// const square = (x) => {
//     return x * x; // return না লিখলে কিছুই ফেরত হবে না
// };

// // Parentheses: return অপ্রয়োজনীয়
// const square = (x) => (
//     x * x // JavaScript এটি স্বয়ংক্রিয়ভাবে return করে
// );
// আপনার উদাহরণে:

// map - এর মধ্যে JSX return করছেন।
// যদি { } ব্যবহার করেন, তাহলে return দিতে হবে।
// কিন্তু যদি() ব্যবহার করেন, তাহলে JavaScript তা স্বয়ংক্রিয়ভাবে return করবে।

















// (2) ==> এখানে আমার লপিং করে তইরি করা section গুলির index number এর সাথেযদি usestate এর রাখা সেই প্রতিটা section এর জন্য store করা true or false এর indx number মিলে যায় তাহলে সেই index position এর state valu update হয়ে যায়। আর মিলে না গেলে visible হবে মানে আগের অবস্থানেই থাকবে যা অই prevVisibility.map এর পেরামিটার এখন বলতে পারেন।
// এই কোডটি React - এ একটি visibility স্টেট পরিচালনা করছে, যা একটি অ্যারে হিসেবে কাজ করছে। প্রতিটি উপাদান(item) হয় true(দেখানো হচ্ছে) বা false(লুকানো হচ্ছে) মান ধারণ করে। toggleVisibility ফাংশনটি নির্দিষ্ট ইনডেক্সে থাকা উপাদানের মান true থেকে false বা false থেকে true এ পরিবর্তন করে।

// কোড ভেঙে দেখা:
// visibility স্টেট: এটি একটি অ্যারে, যেখানে প্রতিটি ইনডেক্সে true বা false মান আছে।

// উদাহরণ: [false, false, false]।
// setVisibility ফাংশন: এটি স্টেট আপডেট করার জন্য ব্যবহৃত হচ্ছে।

// toggleVisibility ফাংশন: এই ফাংশনটি একটি নির্দিষ্ট ইনডেক্সে থাকা মান টগল করে(মানে true থাকলে false এবং false থাকলে true)।

// প্রতি ইটারেশনে কী হচ্ছে ?
//     prev.map ব্যবহার করে visibility অ্যারেটি লুপ করা হচ্ছে।

// prev হলো বর্তমান visibility অ্যারের কপি।
// i হলো প্রতিটি উপাদানের ইনডেক্স।
// লজিক:

// যদি বর্তমান ইনডেক্স(i) ফাংশনে পাস করা ইনডেক্স(indxx) এর সমান হয়:
// ঐ ইনডেক্সের মান true থেকে false বা false থেকে true করা হয়।
// অন্যথায়, ঐ ইনডেক্সের মান অপরিবর্তিত থাকে।
// উদাহরণ ধরে ব্যাখ্যা:
// ধরি, visibility এর বর্তমান মান:
// javascript
// Copy code
// visibility = [false, false, false];
// যদি toggleVisibility(1) কল করা হয়:
// prev.map চালাবে:
// প্রথম ইটারেশনে(i = 0):
// i === indxx → 0 === 1 → false → মান অপরিবর্তিত থাকবে: false
// দ্বিতীয় ইটারেশনে(i = 1):
// i === indxx → 1 === 1 → true → মান false থেকে true এ পরিবর্তন।
// তৃতীয় ইটারেশনে(i = 2):
// i === indxx → 2 === 1 → false → মান অপরিবর্তিত থাকবে: false
// ফলাফল:
// javascript
// Copy code
// visibility = [false, true, false];
// সারাংশ:
// প্রতি ইটারেশনে: প্রতিটি উপাদানের ইনডেক্স চেক করা হয়। যদি ইনডেক্স মিলে যায়, তাহলে তার মান টগল করা হয়। অন্যথায়, মান অপরিবর্তিত রাখা হয়।


// এই অংশটি Ternary Operator ব্যবহার করে একটি সরল শর্ত নির্ধারণ করছে। এটি নির্ধারণ করে, বর্তমান উপাদানটি আপডেট হবে কি না।

// i === indxx ? !visible : visible
// i === indxx:
// এটি চেক করে, বর্তমান ইটারেশনের ইনডেক্স(i) কি ফাংশনে পাস করা ইনডেক্স(indxx) এর সমান।

// যদি true হয়:
// মানটিকে টগল করে(অর্থাৎ, !visible)।
// যদি false হয়:
// মান অপরিবর্তিত রাখে(visible)।
// এক্সপ্ল্যানেশন:
// i === indxx:

// i হলো map লুপের চলমান ইনডেক্স।
// indxx হলো সেই ইনডেক্স যা আপনি ফাংশনে পাস করেছেন।
// ?(Ternary Operator):

// যদি শর্তটি(i === indxx) সত্য হয় → !visible।
// !visible: বর্তমান মানকে বিপরীত করে।
// যদি true হয়, তাহলে false হবে।
// যদি false হয়, তাহলে true হবে।
// যদি শর্তটি মিথ্যা হয় → visible।
// মান অপরিবর্তিত রাখে।
// উদাহরণ:
// ধরি, visibility অ্যারে:

// javascript
// Copy code
// visibility = [true, false, true];
// এখন যদি toggleVisibility(1) কল করা হয়:

// map লুপ চালু হবে:

// প্রথম উপাদান(i = 0):
// i === indxx → 0 === 1 → false
// ফলাফল: visible(অর্থাৎ, true)।
// দ্বিতীয় উপাদান(i = 1):
// i === indxx → 1 === 1 → true
// ফলাফল: !visible(অর্থাৎ, !false → true)।
// তৃতীয় উপাদান(i = 2):
// i === indxx → 2 === 1 → false
// ফলাফল: visible(অর্থাৎ, true)।
// ফলাফল:
// আপডেটেড অ্যারে:

// javascript
// Copy code
// visibility = [true, true, true];
// সংক্ষেপে:
// i === indxx: নির্ধারণ করে এই ইনডেক্সটি টার্গেট করা হয়েছে কি না।
// !visible: মান টগল করে।
// visible: অন্য উপাদানগুলির মান অপরিবর্তিত রাখে।


// এখানে কিভাবে state এর শুধু নির্দিষ্ট ভেলুই আপডেট হচ্ছে কেনো অন্য ভেলু গুলি রিসেট হয়ে যাচ্ছে না এবং কেনো সেখত্ত্রে spreed oparetor use করলাম না তা বুঝতে নিচে দেখুন

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






// (4)==> যখন useEffect টা চলবে তখন সে একটি নতুন array create করবে কারন আমরা মেইন জাইগাতে item update করেছি এই জন্য এখানে state এও upadate করা জন্যি এটা করছি এখানে update করার জন্য সে শুধু প্রইবরতন কৃত ভেলুটিকেই update করে দিবে বিশয়টা তা না বন্রং সে নতুন ভেলু add করার জন্য আবার সম্পুন নতুন একটা array create করে update কৃত ভেলু নিয়ে আর প্রতিটা ভেলুতে ডট fill দিয়ে true ভেলু সেট করে দেওয়া হচ্ছে । তাহলে এখানে যেটা হচ্ছে str এর lenght যতটা ঠিক ততগুলি array item তইরি হচ্ছে আর এখানে useEffect যেটা করে সেটা হলো ঠিক তখনি এই নতুন array তইরি হবে যখন str এর মদ্ধগে velu upadte হবে যা dependence তে সেট করা আছে। এটী আসলে highly dynamic করা হয়েছে জেনো পরিবরতিতে আমাদের বাসের সংখা যদি বাড়ে তাহলে অখানে api তে apdate করলে auto এখানে info add হয়ে যাবে।

// কেনো useEffect ব্যবহার করা হয়েছে ?
//     useEffect ব্যবহার করা হয়েছে, কারণ visibility স্টেটটি এমনভাবে ইনিশিয়ালাইজ করতে হবে যেন এটি getBus ডেটার দৈর্ঘ্যের উপর নির্ভরশীল।**
//         যখনই getBus পরিবর্তিত হবে, তখন visibility স্টেট আপডেট হবে।
// এর ফলে, নতুন বাস যুক্ত হলে স্টেট অটো - আপডেট হয়ে যায়।
// useEffect এর মধ্যে কি করা হয়েছে ?
//     javascript
// Copy code
// useEffect(() => {
//     const initialVisibility = Array(getBus.length).fill(false);
//     setVisibility(initialVisibility);
// }, [getBus]);
// getBus.length ডেটার দৈর্ঘ্য বের করা হয়েছে:

// getBus হলো অ্যারে, যা API থেকে প্রতিটি বাসের ডেটা ধারণ করে।
// getBus.length দিয়ে জানা যায়, কতগুলো বাস আছে।
// Array(getBus.length).fill(false) তৈরি করা হয়েছে:

// এটি একটি নতুন অ্যারে তৈরি করে, যার দৈর্ঘ্য getBus.length।
// প্রতিটি আইটেমে false রাখা হয়েছে।
// উদাহরণ:
// যদি getBus.length = 3, তাহলে অ্যারে হবে: [false, false, false].
// setVisibility দিয়ে স্টেট আপডেট করা হয়েছে:

// নতুন তৈরি করা[false, false, false] অ্যারেটি visibility স্টেটে সেট করা হয়েছে।
// ডিপেন্ডেন্সি লিস্টে[getBus]:

// যখনই getBus পরিবর্তিত হবে, useEffect পুনরায় চালু হবে এবং visibility স্টেট আপডেট করবে।
// Iteration অনুযায়ী কি হচ্ছে ?
//     ধরি, getBus ডেটা প্রথমে ছিল:

// javascript
// Copy code
// getBus = [
//     { busId: 1, time: "10:00 AM" },
//     { busId: 2, time: "12:00 PM" },
// ];
// প্রথমবার:
// getBus.length = 2.
// Array(2).fill(false) →[false, false].
//     setVisibility → visibility = [false, false].
//         দ্বিতীয়বার(নতুন বাস যুক্ত হলো):
// ধরি, getBus আপডেট হলো:

// javascript
// Copy code
// getBus = [
//     { busId: 1, time: "10:00 AM" },
//     { busId: 2, time: "12:00 PM" },
//     { busId: 3, time: "2:00 PM" },
// ];
// getBus.length = 3.
// Array(3).fill(false) →[false, false, false].
//     setVisibility → visibility = [false, false, false]।
// সংক্ষেপে:
// useEffect দিয়ে নিশ্চিত করা হয়েছে, visibility অ্যারে সবসময় getBus ডেটার দৈর্ঘ্যের সাথে মিলবে।
// যখনই getBus ডেটা পরিবর্তন হয়(যেমন নতুন বাস যুক্ত হয়), visibility অটো - আপডেট হয়ে যায়।



// (3)==> এখানে setVisibility এর মদ্ধে যে আমি একটা callback fn create করেছি এর মদ্ধে এই prevVisibility পেরামিটারটা আপনার state এর মদ্ধে থাকা সমস্ত ভেলু কে গেট করে এখানে ভাবতে পারেন একটি sate এর মদ্ধে arrow callback fn তইরি করলে তার পেরামিটার কিভাবে অই state এ থাকা সমস্ত ভালেউ গেট করে এটা আসলে state management এর বিষয় । এখানে মনে রাখবেন আপনি যদি কোনো state এর মদ্ধে array আকারে অনেক ডাটা থাকে তাহলে আপনি সেই প্রতিটা ডাটা অই state fn এর মদ্ধে একটা arrow calback fn create করে তার পেরামিটার দিয়ে আপনি সব ভেলু গুলিকে ধরতে পারবেন। আর  এখানে ভেলু গুলিকে অই পেরামিটার দিয়ে ধরে তার উপরে আমারা loop চালিয়ে নিজেদের কাজে ব্যবহার করেছি।



// (9) ==> visibility[indxx] && অংশটি একটি শর্ত নির্দেশ করার জন্য ব্যবহৃত হয়েছে, যা নির্ধারণ করে সিট প্ল্যানিং সেকশনটি দেখানো হবে কি না। এটি visibility স্টেটের indxx ইনডেক্সের মানের উপর নির্ভর করে।

// visibility[indxx] && কেন ব্যবহার করা হয়েছে ?
//     visibility হলো একটি অ্যারে, যেখানে প্রতিটি ইনডেক্স একটি বুলিয়ান ভ্যালু ধারণ করে।

// প্রতিটি ইনডেক্সের মান:
// true হলে → সিট প্ল্যানিং সেকশনটি দেখাবে।
// false হলে → সিট প্ল্যানিং সেকশনটি লুকানো থাকবে।
// visibility[indxx] চেক করে, বর্তমানে কোন বাসের সিট প্ল্যানিং সেকশনটি দেখাতে হবে।

// indxx হলো বর্তমান বাসের ইনডেক্স, যা getBus.map লুপ থেকে পাওয়া গেছে।
// যদি visibility[indxx] সত্য হয়, তাহলে শর্তটির পরের অংশ(সিট প্ল্যানিং সেকশন) রেন্ডার হবে।
// && অপারেটর:

// visibility[indxx] সত্য হলে → সিট প্ল্যানিং সেকশনটি রেন্ডার হবে।
// visibility[indxx] মিথ্যা হলে → সিট প্ল্যানিং সেকশনটি স্কিপ করবে।
// কোন indxx ব্যবহার করা হয়েছে ?
//     indxx হলো getBus.map লুপের বর্তমান ইনডেক্স।
// getBus অ্যারে ধরে একটি নির্দিষ্ট বাসকে রেন্ডার করা হচ্ছে।
// প্রতিটি বাসের জন্য:
// indxx এর মান প্রথম বাসের জন্য 0, দ্বিতীয় বাসের জন্য 1, এবং এভাবে বাড়তে থাকে।
// উদাহরণ:
// ধরি, visibility স্টেট হলো:

// javascript
// Copy code
// visibility = [false, true, false];
// এখন getBus.map লুপ চালু হলে:

// প্রথম বাস(indxx = 0):

// visibility[0] && ...
// false && ... → সিট প্ল্যানিং সেকশন রেন্ডার হবে না।
// দ্বিতীয় বাস(indxx = 1):

// visibility[1] && ...
// true && ... → সিট প্ল্যানিং সেকশন রেন্ডার হবে।
// তৃতীয় বাস(indxx = 2):

// visibility[2] && ...
// false && ... → সিট প্ল্যানিং সেকশন রেন্ডার হবে না।
// সংক্ষেপে:
// visibility[indxx] চেক করছে, বর্তমান ইনডেক্সের(বাসের) জন্য সিট প্ল্যানিং সেকশনটি দেখাতে হবে কি না।
// indxx হলো getBus.map লুপের ইনডেক্স, যা প্রতিটি বাসকে রেন্ডার করার জন্য ব্যবহৃত হয়েছে।



// (10) ==> এখানে কিন্তু আগেরটার মতন toggle করতে চাচ্ছি এটা করা হয়েছে শধু অই cross btn এর জন্য এখানে শুধু অটাতে ক্লিক করলে শুধু কণ কিছু করতে চাচ্ছি  তাই এখানে(i === indxx ? false : visible) শুধু false করা হয়েছে

