export const loginSuccess = (userData) => ({
  type: "LOGIN_SUCCESS",
  payload: userData,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setUserLoginStatus = (isLoggedIn) => ({
  type: "SET_USER_LOGIN_STATUS",
  payload: isLoggedIn,
});

export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});
