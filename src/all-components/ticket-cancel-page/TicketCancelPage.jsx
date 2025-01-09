import { useState } from "react";

const TicketCancelPage = () => {
    const [formData, setFormData] = useState({
        ticketNumber: "",
        phoneNumber: "",
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            alert("Please accept the terms and conditions to proceed.");
            return;
        }
        console.log("Form submitted:", formData);
        // Add your submission logic here
    };
    return (
        <div className="w-[96%] md:w-10/12 mx-auto px-2 md:px-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 shadow-[0_12px_15px_1px_rgba(0,0,0,1)]">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl ">
                <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-800">
                    Cancel Request
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Ticket Number Input */}
                    <div className="mb-5">
                        <label
                            htmlFor="ticketNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ticket Number
                        </label>
                        <input
                            id="ticketNumber"
                            type="text"
                            name="ticketNumber"
                            value={formData.ticketNumber}
                            onChange={handleChange}
                            placeholder="G/12345679"
                            className="input input-bordered w-full mt-1 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            required
                        />
                    </div>
                    {/* Phone Number Input */}
                    <div className="mb-5">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone No."
                            className="input input-bordered w-full mt-1 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            required
                        />
                    </div>
                    {/* Terms and Conditions */}
                    <div className="mb-6 flex items-start">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="checkbox checkbox-primary mt-1"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                            I have read, acknowledged and agreed to the{" "}
                            <a
                                href="/terms-and-conditions"
                                className="text-blue-600 underline hover:text-blue-800 transition-all"
                            >
                                Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a
                                href="/cancellation-policy"
                                className="text-blue-600 underline hover:text-blue-800 transition-all"
                            >
                                Cancellation Policy
                            </a>{" "}
                            of Paribahan.com
                        </label>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn bg-blue-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md transform hover:scale-105 transition-all duration-300"
                    >
                        Confirm Cancellation
                    </button>
                </form>
            </div>
        </div>

    );
};

export default TicketCancelPage;