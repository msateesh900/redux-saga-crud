import ACTIONS from "../action";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER_GETREQUEST:
      return { ...state, isLoading: true };
    case ACTIONS.USER_GETREQUEST_SUCCESSFULL:
      return { ...state, users: action.users };
    case ACTIONS.USER_POSTREQUEST_SUCCESSFULL:
      return { ...state, isLoading: false };
    case ACTIONS.USER_EDITREQUEST_SUCCESSFULL:
      return { ...state, isLoading: false };

    case ACTIONS.USER_GETREQUEST_FAILURE:
    case ACTIONS.USER_POSTREQUEST_FAILURE:
      return { ...state, error: action.error };

    case ACTIONS.USER_DELETEREQUEST_SUCCESSFULL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default users;
