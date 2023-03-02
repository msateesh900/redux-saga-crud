import { useEffect } from "react";
import {
  getUsers,
  postUsers,
  deleteUser,
  editUser,
} from "../redux-saga/actionCreators";

import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import RegisterUser from "./RegisterUser";

function UsersList() {
  const state = useSelector((state) => state);
  //   console.log(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleEdituser = (e) => {
    e.preventDefault();
    let editId = e.target.name;
    navigate(`/register/${editId}`);
    // console.log(e.target.name);
  };
  const deleteUserHandler = (e) => {
    e.preventDefault();
    let deleteId = e.target.name;
    dispatch(deleteUser(deleteId));
    window.location.reload();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="container-fluid">
      {/* <ToastContainer /> */}
      <h1>User List Below</h1>
      {/* 
      {[10, 20, 30, 40].map((item) => {
        return <p>{item * 2}</p>;
      })} */}
      <Table responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>API Demo On</th>
            <th>EDIT & Delete</th>
          </tr>
        </thead>
        <tbody>
          {!state.users.isLoading ? (
            <tr>
              <td>No User Data</td>
            </tr>
          ) : (
            state.users.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.firstName} </td>
                  <td>{user.lastName}</td>
                  <td>
                    <b>{user.apiDemoOn}</b>
                  </td>
                  <td>
                    {/* <Link to="/register">Register</Link>&nbsp; */}
                    <button
                      name={user.id}
                      onClick={handleEdituser}
                      className="btn btn"
                    >
                      EditUser
                    </button>
                    &nbsp;
                    <button
                      name={user.id}
                      onClick={deleteUserHandler}
                      className="btn btn"
                    >
                      DeleteUser
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      {/* {state.users.isLoading &&
        state.users.users.map((user) => {
          return (
            <div key={user.id}>
              {user.firstName} {user.lastName} : <b>{user.apiDemoOn}</b>
            </div>
          );
        })} */}
    </div>
  );
}

export default UsersList;
