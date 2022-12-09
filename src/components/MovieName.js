import React from "react";
import { movies } from "../data/data";

const MovieName = ({handleMovieName, movieInfo}) => {
  
  // copy movies array elements into movieNameData
  const movieNameData = [...movies];


  return (
    <div>
      <div className="mx-4 p-2 border rounded-md border-slate-600">
        
        {/* Movie-Name Selector */}
        <p className="text-2xl  py-4 font-bold">Select a Movie</p>
        
        {/* Map through each movieNameData array elements  */}
        {movieNameData.map((item, index) => (
          <button
            key={index}
            
            className={`${movieInfo.movie === item ? "bg-[#d37373] rounded-md text-white" : ""} font-bold border-2 border-black m-3 p-[0.5rem] rounded-xl transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 hover:bg-[#d37373] duration-150`}
            onClick={() => {
              handleMovieName(item)
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieName;
