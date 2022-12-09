import React from "react";
import { slots } from "../data/data";

const TimeSlot = ({handleTimeSlot, movieInfo}) => {
  
  // copy slots array elements into movieSlotData
  const movieSlotData = [...slots]
  

  return (
    <div>
      <div className="mx-4 p-2 border rounded-md border-slate-600">
        {/* Time-slot Selector */}
        <p className="text-2xl py-4 font-bold">Select a Time</p>

        {/* map through each array elements of movieSlotData */}
        {movieSlotData.map((item, index) => (
          <button
            key={index}
           
            className={`${movieInfo.time === item ? "bg-[#d37373] rounded-md text-white" : ""} font-bold border-2 border-black m-3 p-[0.5rem] rounded-xl transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 hover:bg-[#d37373] duration-150`}
            onClick={() => {
             
              handleTimeSlot(item)
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
