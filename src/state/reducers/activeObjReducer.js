const updateActiveObject = (state = JSON.parse(localStorage.getItem("activeObject")), action) => {
    if (action.type === "UPDATE_ACTIVE_OBJ") {
      return action.payload;
    } else {
      return state;
    }
  };
  
  export default updateActiveObject;