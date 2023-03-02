import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers/index";
import rootSaga from "./rootSaga";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];
// const store = createStore(reducer, {}, applyMiddleware(...middleware));
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
// export const store;
// export const persistor;
