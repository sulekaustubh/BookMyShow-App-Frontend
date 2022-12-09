import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TimeSlot from "./TimeSlot";
import SeatSlot from "./SeatSlot";
import MovieName from "./MovieName";
import LastBooking from "./LastBooking";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import Swal from "sweetalert2";

const MovieDetails = () => {
  // dispatch updated state value
  const dispatch = useDispatch();
  const { updateActiveObject } = bindActionCreators(actionCreators, dispatch);

  // handle function to persist movie-details in case of any unexpected page re-load
  const handleReloadPage = () => {
    // store movie information in localStorage
    let data = localStorage.getItem("movieInfo");
    if (data) {
      return JSON.parse(localStorage.getItem("movieInfo"));
    } else {
      return {
        movie: "",
        time: "",
        seat: [
          { seatType: "A1", seats: 0 },
          { seatType: "A2", seats: 0 },
          { seatType: "A3", seats: 0 },
          { seatType: "A4", seats: 0 },
          { seatType: "D1", seats: 0 },
          { seatType: "D2", seats: 0 },
        ],
      };
    }
  };

  //update state of Movie-Data
  const [movieInfo, setmovieInfo] = useState(handleReloadPage);
  localStorage.setItem("movieInfo", JSON.stringify(movieInfo));

  //Last Booking Details
  const [lastBookingData, setLastBookingData] = useState([]);

  //update Movie-Name
  const handleMovieName = (selectedMovie) => {
    setmovieInfo((previous) => {
      return {
        ...previous,
        movie: selectedMovie,
      };
    });
    localStorage.setItem("movieInfo", JSON.stringify(movieInfo));
  };

  // update Movie-Time
  const handleTimeSlot = (selectedTimeSlot) => {
    setmovieInfo((previous) => {
      return {
        ...previous,
        time: selectedTimeSlot,
      };
    });
    localStorage.setItem("movieInfo", JSON.stringify(movieInfo));
  };

  // update Seat-Slots
  const handleSeatSlot = (seatData) => {
    const findSeat = movieInfo.seat.findIndex(
      (e) => e.seatType === seatData.seatType
    );
    const newSeatData = [...movieInfo.seat];
    newSeatData[findSeat] = seatData;
    setmovieInfo((previous) => {
      return {
        ...previous,
        seat: newSeatData,
      };
    });
    localStorage.setItem("movieInfo", JSON.stringify(movieInfo));
  };
  const url="https://bookmyshow-project-backend.vercel.app"
  // Endpoint:Fetch API GET request using async/await
  const getMovieData = () => {
    try {
      axios
        .get(url+"/api/booking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => response.data)
        .then((data) => setLastBookingData(data));
    } catch (error) {
      console.log("There was an error", error);
    }
  };

  // Endpoint:Fetch API POST request using async/await
  const postMovieData = async () => {
    const response = await fetch(url+"/api/booking", {
      method: "POST",
      body: JSON.stringify({
        movie: movieInfo.movie,
        slot: movieInfo.time,
        seats: {
          A1: movieInfo.seat[0].seats,
          A2: movieInfo.seat[1].seats,
          A3: movieInfo.seat[2].seats,
          A4: movieInfo.seat[3].seats,
          D1: movieInfo.seat[4].seats,
          D2: movieInfo.seat[5].seats,
        },
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const content = await response.json();
    if (content._id) {
      //alert message using SweetAlert npm package
      Swal.fire(
        "Book that Show",
        "Tickets are Booked successfully!",
        "success"
      );
      getMovieData();
      setmovieInfo({
        movie: "",
        time: "",
        seat: [
          { seatType: "A1", seats: 0 },
          { seatType: "A2", seats: 0 },
          { seatType: "A3", seats: 0 },
          { seatType: "A4", seats: 0 },
          { seatType: "D1", seats: 0 },
          { seatType: "D2", seats: 0 },
        ],
      });

      // Removing Selected Seat
      localStorage.setItem("activeObject", JSON.stringify(""));
      updateActiveObject("");
    } else {
      Swal.fire("Oops..", `${content.errors[0].msg}!`, "error");
    }
  };

  //handle function for Book Now Button
  const handleSubmit = () => {
    postMovieData();
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <div className="bg-gray-100 pb-6">
      <div>
        {/* Header */}
        <h1 className="text-3xl font-bold py-6 px-4">Book that Show!</h1>
        <div className="flex justify-center bg-white p-6 mx-4 rounded-md drop-shadow-md">
          <div>
            {/* Movie-Name */}
            <div className="pb-4">
              <MovieName
                handleMovieName={handleMovieName}
                movieInfo={movieInfo}
              />
            </div>

            {/* Movie-Time */}
            <div className="pb-4">
              <TimeSlot handleTimeSlot={handleTimeSlot} movieInfo={movieInfo} />
            </div>

            {/* Seat-Slot */}
            <div className="pb-4">
              <SeatSlot
                handleSeatSlot={handleSeatSlot}
                movieInfo={movieInfo}
                postMovieData={postMovieData}
              />
            </div>

            {/* Book Now Submit Button */}
            <button
              className="mx-4 px-4 py-1  font-medium text-lg text-white bg-gradient-to-r from-cyan-400 to-emerald-400 border-none rounded-lg shadow-lg shadow-emerald-300 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110  duration-150"
              onClick={handleSubmit}
            >
              Book Now
            </button>
          </div>

          {/* Last Booking Details Container */}
          <div>
            <LastBooking lastBookingData={lastBookingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
