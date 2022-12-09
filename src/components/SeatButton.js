import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";

function SeatButton({ item, index, handleSeatSlot,ToggleSeats }) {
  
  const activeObject = useSelector((state) => state.activeObject);
  const [seatNumber, setSeatNumber] = useState(item.seats);
  
  //handle function for seats decrement counter 
  const handleDecrement = () => {
    if (seatNumber > 0) {
      setSeatNumber((seatNumber) => seatNumber - 1);
      }
  };
  
  //handle function for seats increment counter
  const handleIncrement = () => {
    if (seatNumber < 9) {
      setSeatNumber((seatNumber) => seatNumber + 1);
    }
  };

  //store active seat type and number of seats in localStorage
  useEffect(() => {
    handleSeatSlot({ seatType: item.seatType, seats: seatNumber });
    localStorage.setItem("activeObject",JSON.stringify(activeObject))
    console.log(activeObject)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seatNumber]);

  return (
    
    // seat-slot container
    <div
      
      className={`${activeObject === item.seatType ? "bg-[#d37373] rounded-md text-white" : ""} font-bold border-2 border-black m-2 p-[0.5rem] rounded-xl cursor-pointer transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 hover:bg-[#d37373] duration-150`}
      onClick={() => {
        ToggleSeats(index);
      }}
    >
      {/* Seat-type container */}
      <span className="mx-7">Type {item.seatType}</span>
      
      {/* Increment and Decrement counter for number of seats */}
      <div>
        
        {/* Decrement button */}
        <button
          className={`px-2.5 border-2 bg-slate-300  rounded-lg border-black ${activeObject === item.seatType ? "text-black" : ""}`}
          onClick={() => handleDecrement()}
        >
          -
        </button>

        {/* Display Number of seats */}
        <span className="px-6">{item.seats}</span>

        {/* Increment button */}
        <button
          className={`px-2 border-2 bg-slate-300 rounded-lg border-black ${activeObject === item.seatType ? "text-black" : ""}`}
          onClick={() => handleIncrement()}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SeatButton;
