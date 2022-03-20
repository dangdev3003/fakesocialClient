export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const RegisterStart = (userCredentials) => ({
  type: "REGISTER_START",
});
export const RegisterSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});
export const RegisterFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: error,
});
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});

export const updateUserImg = (img) => ({
  type: "UPDATE_USER",
  payload: img,
});

export const logout = ()=>({
  type:"LOGOUT"
})
