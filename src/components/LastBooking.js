import React from "react";

const LastBooking = ({ lastBookingData }) => {
  return (
    
    // main container for Last Booking Details
    <div className="border border-black rounded-md w-72 p-4">
      <h2 className="font-bold text-xl">Last Booking Details :</h2>
      
      {/* Check for last booking details, when not empty */}
      {lastBookingData.length !== 0 ? (
        <div>
          {/* Seat Container */}
          <div>
            <h3 className="font-bold">Seats : </h3>
            
            {/* Type of seat : A1 */}
            <p className="font-bold">
              A1 :{" "}
              {/* Number of A1 type seats selected */}
              <span className="font-normal">{lastBookingData[0].seats.A1}</span>
            </p>
            {/* Type of seat : A2 */}
            <p className="font-bold">
              A2 :{" "}
              {/* Number of A2 type seats selected */}
              <span className="font-normal">{lastBookingData[0].seats.A2}</span>
            </p>
            {/* Type of seat : A3 */}
            <p className="font-bold">
              A3 :{" "}
              {/* Number of A3 type seats selected */}
              <span className="font-normal">{lastBookingData[0].seats.A3}</span>
            </p>
            {/* Type of seat : A4 */}
            <p className="font-bold">
              A4 :{" "}
              {/* Number of A4 type seats selected */}
              <span className="font-normal">{lastBookingData[0].seats.A4}</span>
            </p>
            {/* Type of seat : D1 */}
            <p className="font-bold">
              D1 :{" "}
              {/* Number of D1 type seats selected */}
              <span className="font-normal">{lastBookingData[0].seats.D1}</span>
            </p>
            {/* Type of seat : D2 */}
            <p className="font-bold">
              D2 :{" "}
              {/* Number of D2 type seats selected */}
              <span className="font-normal">{lastBookingData[0].seats.D2}</span>
            </p>
          </div>
          
          {/* Display Time-Slot of last booking details*/}
          <div>
            <p className="font-bold">
              Slot :{" "}
              <span className="font-normal">{lastBookingData[0].slot}</span>
            </p>
          </div>
          
          {/* Display Movie-Name of last booking details*/}
          <div>
            <p className="font-bold">
              Movie :{" "}
              <span className="font-normal">{lastBookingData[0].movie}</span>
            </p>
          </div>
        </div>
      ) : 
      
      
      (
        // Check for last booking details, when empty
        <p className="text-sm my-2">No Previous Booking Found!</p>
      )
      }
    </div>
  );
};

export default LastBooking;
