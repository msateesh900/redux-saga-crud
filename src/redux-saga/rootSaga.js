import { call, fork, put, takeLatest, all, delay } from "redux-saga/effects";
import ACTIONS from "./action";
import {
  UsersGetRequest,
  UsersPostRequest,
  deleteuser,
  edituser,
} from "./api.js";

function* getUser() {
  try {
    const response = yield call(UsersGetRequest);
    console.log(response);
    // yield put({ type: ACTIONS.USER_GETREQUEST_SUCCESSFULL, users: response });
    if (response.status === 200) {
      delay(500);
      yield put({
        type: ACTIONS.USER_GETREQUEST_SUCCESSFULL,
        users: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: ACTIONS.USER_GETREQUEST_FAILURE,
      error: error.message,
    });
  }
}

function* PostUser({ payload }) {
  try {
    const response = yield call(UsersPostRequest, payload);
    // yield put({ type: ACTIONS.USER_GETREQUEST_SUCCESSFULL, users: response });
    if (response.status === 200) {
      delay(500);
      yield put({
        type: ACTIONS.USER_POSTREQUEST_SUCCESSFULL,
        users: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: ACTIONS.USER_GETREQUEST_FAILURE,
      error: error.message,
    });
  }
}

function* deleteUser({ payload }) {
  console.log(payload);
  try {
    const response = yield call(deleteuser, payload);
    if (response.status === 200) {
      delay(500);
      yield put({
        type: ACTIONS.USER_DELETEREQUEST_SUCCESSFULL,
      });
    }
  } catch (error) {
    yield put({
      type: ACTIONS.USER_DELETEREQUEST_FAILURE,
      error: error.message,
    });
  }
}

function* editUser({ payload }) {
  try {
    console.log(payload);
    const response = yield call(edituser, payload);
    if (response.status === 200) {
      delay(500);
      yield put({
        type: ACTIONS.USER_EDITREQUEST_SUCCESSFULL,
        users: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: ACTIONS.USER_EDITREQUEST_FAILURE,
      error: error.message,
    });
  }
}

function* userRequest() {
  yield takeLatest(ACTIONS.USER_GETREQUEST, getUser);
}

function* userPostRequest() {
  yield takeLatest(ACTIONS.USER_POSTREQUEST, PostUser);
}

function* userDeleteRequest() {
  yield takeLatest(ACTIONS.USER_DELETEREQUEST, deleteUser);
}

function* userEditRequest() {
  yield takeLatest(ACTIONS.USER_EDITREQUEST, editUser);
}

const userSagas = [
  fork(userRequest),
  fork(userPostRequest),
  fork(userDeleteRequest),
  fork(userEditRequest),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
