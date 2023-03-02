import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers, postUsers } from "./redux-saga/actionCreators";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../src/components/NavBar";

import { Routes, Route } from "react-router";
import UsersList from "./components/UsersList";
import RegisterUser from "./components/RegisterUser";
import { useNavigate } from "react-router-dom";

function App() {
  const state = useSelector((state) => state);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apiDemoOn, setApiDemoOn] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // const { userData } = state.users.users;
  // console.log(state.users.isLoading);
  // console.log(state.users.users, state.users.isLoading);
  // const displayUsers = state.users.users.map((user) => {
  //   <p key={user.id}>{user.firstName}</p>;
  // });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName != "" && lastName != "" && apiDemoOn != "") {
      const request = {
        firstName: firstName,
        lastName: lastName,
        apiDemoOn: apiDemoOn,
      };
      // console.log(request);
      dispatch(postUsers(request));
      toast("User added Sucessfully:");
      // setTimeout(() => {
      //   navigate("/");
      // }, 500);
    }
  };
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/register/" element={<RegisterUser />} />
        <Route path="/register/:id" element={<RegisterUser />} />

        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </>
  );
}

export default App;
