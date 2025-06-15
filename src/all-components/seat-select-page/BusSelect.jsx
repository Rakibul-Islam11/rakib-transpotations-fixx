import { useLoaderData, useLocation } from "react-router-dom";
import BusSlctCard from "./inner-pages/buss-select-card/BusSlctCard";


const BusSelect = () => {
    const location = useLocation();//navigate এ যে state এর মাদ্ধমে ডাটা পাঠানো হয়েছে তা রিসিভ করা হয়েছে।
    const { leavCity, deperCity, dateStor } = location.state || {}; //(8) distucturing the sending data via state
    const formattedDate = `${new Date(dateStor).toLocaleDateString("en-GB", {//(9)
        day: "2-digit", // Two-digit day
        month: "2-digit", // Two-digit month
        year: "numeric", // Full year
        })} (${new Date(dateStor).toLocaleDateString("en-US", {
        weekday: "long", // Full weekday name
    })})`;
    
    const data = useLoaderData()//recieve api data

    return (
        <div className="w-[96%] md:w-10/12 mx-auto shadow-[0_12px_15px_1px_rgba(0,0,0,1)]">
            <div className=" bg-green-400 px-4 py-1">
                <h1 className="text-lg md:text-2xl font-bold text-gray-600">Available Bus</h1>
                <div className="flex flex-row flex-wrap items-center justify-start gap-1 md:gap-3">
                    <h1 className="text-md md:text-xl text-gray-600">{leavCity}</h1>
                    <h1 className="text-md md:text-xl text-gray-600">To</h1>
                    <h1 className="text-md md:text-xl text-gray-600">{deperCity} on</h1>
                    <div>
                        <h1 className="text-gray-600 text-md md:text-xl">{formattedDate}</h1>
                    </div>
                </div>
            </div>
            {/* rander busSlctCard component start */}
            <BusSlctCard data={data} leavCity={leavCity} deperCity={deperCity}></BusSlctCard>
            {/* rander busSlctCard component end */}
        </div>
    );
};

export default BusSelect;


// (8)==> || {} অংশটি ডিফল্ট ভ্যালু (default value) হিসেবে ব্যবহার করা হয়, যাতে অ্যাপ্লিকেশন ক্র্যাশ না করে। এটি একটি নিরাপত্তামূলক ব্যবস্থা। কেন || {} ব্যবহার করা হয়েছে?
// location.state যদি undefined বা null হয়:
// ocation.state সরাসরি অ্যাক্সেস করতে গেলে, যদি এটি undefined হয়, তাহলে জাভাস্ক্রিপ্ট এর্রোর মতো "Cannot destructure property of undefined" দেখাবে।
// || {} ব্যবহার করে আমরা নিশ্চিত করছি যে, যদি location.state ফালসি (undefined, null, বা ফাঁকা) হয়, তাহলে এটি একটি খালি অবজেক্ট {} ব্যবহার করবে।
// ডিফল্ট ফ্যালব্যাক ভ্যালু:

// আমরা location.state থেকে ডেটা ডেস্ট্রাকচার করছি। কিন্তু state যদি এক্সিস্ট না করে, তাহলে {} দিয়ে এটি নিরাপদে খালি অবজেক্ট হিসেবে কাজ করবে।
// এইভাবে আমরা অ্যাপ ক্র্যাশ হওয়ার ঝুঁকি এড়াতে পারি।