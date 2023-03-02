import ACTIONS from "./action";

export const getUsers = () => {
  return {
    type: ACTIONS.USER_GETREQUEST,
  };
};

export const postUsers = (user) => {
  return {
    type: ACTIONS.USER_POSTREQUEST,
    payload: user,
  };
};

export const deleteUser = (id) => {
  console.log(id);
  return {
    type: ACTIONS.USER_DELETEREQUEST,
    payload: id,
  };
};

export const editUser = (id, payload) => {
  return {
    type: ACTIONS.USER_EDITREQUEST,
    payload: [id, payload],
  };
};
