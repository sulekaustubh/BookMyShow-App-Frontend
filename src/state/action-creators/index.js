export const updateActiveObject = (value) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_ACTIVE_OBJ",
      payload: value,
    });
  };
};
