const axios = require('axios').default;
const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;


const initialState = {
  loading: false,
  users: [],
  error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    error: error
  };
};

const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data.map(user => user.name);
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      const e = error.message;
      dispatch(fetchUsersFailure(e));
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log('Current state:', store.getState()));
store.dispatch(fetchUsers());