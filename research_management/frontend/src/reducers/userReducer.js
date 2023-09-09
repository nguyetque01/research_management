const initialState = {
  isLoggedIn: false,
  userData: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
      };
    case "SET_USER_LOGIN_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
