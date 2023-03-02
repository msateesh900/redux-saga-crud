import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsers, postUsers, editUser } from "../redux-saga/actionCreators";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RegisterUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [apiDemoOn, setApiDemoOn] = useState("");
  //   const [success, setSuccess] = useState(false);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  let { id } = useParams();
  // console.log(id);
  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`http://localhost/users/${id}`)
        .then((response) => {
          console.log(response.data);
          setFirstName(response.data[0].firstName);
          setLastName(response.data[0].lastName);
          setApiDemoOn(response.data[0].apiDemoOn);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const updateRequest = (e) => {
    e.preventDefault();
    const request = {
      firstName: firstName,
      lastName: lastName,
      apiDemoOn: apiDemoOn,
    };
    // alert(id);
    dispatch(editUser(id, request));
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName != "" && lastName != "" && apiDemoOn != "") {
      const request = {
        firstName: firstName,
        lastName: lastName,
        apiDemoOn: apiDemoOn,
      };
      console.log(request);
      dispatch(postUsers(request));
      //   toast("User added Sucessfully:");
      setTimeout(() => {
        navigate("/");
        seterror(false);
      }, 500);
    } else {
      // alert(error);

      seterror(true);
    }
  };
  return (
    <>
      {error ? (
        <>
          <h3 className="alert alert-danger">Please fill the inputs</h3>
        </>
      ) : (
        <>
          {" "}
          <p className="alert alert-success">no error</p>
        </>
      )}
      <div className="container">
        {!id ? <h2>Add New user</h2> : <h2>Edit user</h2>}

        <form onSubmit={handleSubmit}>
          {/*  onSubmit={submitHandler}*/}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              FirstName
            </label>
            <input
              type="text"
              className="form-control"
              name={firstName}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              id={firstName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              LastName
            </label>
            <input
              type="text"
              className="form-control"
              name={lastName}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              id={lastName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apiDemoOn" className="form-label">
              ApiDemoOn
            </label>
            <input
              type="text"
              className="form-control"
              name={apiDemoOn}
              value={apiDemoOn}
              onChange={(e) => {
                setApiDemoOn(e.target.value);
              }}
              id={apiDemoOn}
            />
          </div>
          {!id ? (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          ) : (
            <button className="btn btn-primary" onClick={updateRequest}>
              Save
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default RegisterUser;
