import React from "react";
import SeatButton from "./SeatButton";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
  
const SeatSlot = ({handleSeatSlot, movieInfo}) => {
  
  //dispatch the updated state value
  const dispatch = useDispatch();
  const { updateActiveObject } = bindActionCreators(actionCreators, dispatch);
  
  
  // function to handle active seats
  function ToggleSeats(index) {
    updateActiveObject(movieInfo.seat[index].seatType)
  }

  return (
    <div>
      <div className="mx-4 px-2 border rounded-md border-slate-600">
        
        {/* Seat-Slot Selector */}
        <p className="text-2xl py-4 font-bold">Select your Seats</p>
        <div className="flex">
          
          {/* map through seat information from seat button file(child component) */}
          {movieInfo.seat.map((item, index) => (
            <SeatButton
              item={item}
              key={index}
              index={index}
              handleSeatSlot={handleSeatSlot}
              movieInfo={movieInfo}
              ToggleSeats={ToggleSeats}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatSlot;
