const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("phakeSocialUser", JSON.stringify(action.payload));
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "REGISTER_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (foll) => foll !== action.payload
          ),
        },
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
      };
    case "LOGOUT":
      localStorage.removeItem("phakeSocialUser");
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};
export default AuthReducer;
