
import { PropTypes } from 'prop-types';
import './busSlcCard.css'
import BusSeatPlan from './bus-seat-plan/BusSeatPlan';

const BusSlctCard = ({ leavCity, deperCity, data }) => {
    return (
        <div>
            <div>
                {/* buss time and info card  start*/}
                <div className="flex flex-row justify-between items-center  h-12 bg-gray-400 mx-auto px-2 mt-4 font-bold text-[15px] md:text-lg shadow-[0_12px_15px_1px_rgba(0,0,0,1)]">
                    <p>Coach Info</p>
                    <p>Departure Time</p>
                    <p>Fare (BDT)</p>
                </div>
                {/* buss time and info card  end*/}
                {/* looping for get each busses */}
                <div>
                    <BusSeatPlan leavCity={leavCity} deperCity={deperCity} data={data}></BusSeatPlan>
                </div>
                
            </div>
        </div>
    );
};
BusSlctCard.propTypes = {
    leavCity: PropTypes.string,
    deperCity: PropTypes.string,
    data: PropTypes.string
}
export default BusSlctCard;
