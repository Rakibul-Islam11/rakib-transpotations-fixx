import { Link } from "react-router-dom";
import "./FlipCard.css";

const FlipCard = () => {
    const cards = [
        { id: 1, title: "About Us", url: "/aboutus", description: "Find details about our service." },
        { id: 2, title: "Service", url: "/service", description: "See our detailed services." },
        { id: 3, title: "Route Map", url: "/home/route-map", description: "Find our service on the map." },
        { id: 4, title: "Query", url: "/home/query", description: "Ask us if you have any question." },
    ];

    return (
        <div className="flex justify-center md:justify-between gap-1 md:gap-6 pt-2 flex-wrap xl:flex-nowrap  w-[100%] mx-auto bg-white px-1 md:px-8 custome_class_flip ">
            {cards.map((card) => (
                <div key={card.id} className="card-container group">
                    <div className="card-content">
                        {/* Front Side */}
                        <div className="card-front">
                            <h2 className="text-2xl font-semibold">{card.title}</h2>
                            <p className="mt-2 text-sm">{card.description}</p>
                        </div>
                        {/* Back Side */}
                        <div className="card-back">
                            <h3 className="text-xl font-semibold">{card.title}</h3>
                            <Link to={card.url} className="pt-4">
                                <button className="px-4 py-2 text-white font-bold uppercase tracking-wide rounded-full shadow-md bg-red-500 hover:bg-red-600 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-sm outline outline-2 outline-black outline-offset-2">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlipCard;
