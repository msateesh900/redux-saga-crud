import axios from "axios";
const URL = "http://localhost:80/users";

export const UsersGetRequest = () => {
  return axios
    .get(URL)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const UsersPostRequest = (users) => {
  return axios
    .post(URL, users)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const deleteuser = (id) => {
  console.log(URL + "/" + id);
  return axios
    .delete(URL + "/" + id)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const edituser = (payload) => {
  // console.log(payload[0], payload[1]);
  // console.log(URL + "/" + payload[0], payload[1]);
  return axios
    .patch(URL + "/" + payload[0], payload[1])
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
