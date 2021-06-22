const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();


// State

const cakeInitialState = {
  cakes: 10
};

const iceCreamInitialState = {
  iceCream: 20
};


// Actions

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'Cake is sold as pure joy',
  };
}

function buyIceCream() {
  return {
    type: BUY_ICE_CREAM,
    info: 'Ice is sold as cream',
  };
}


// Reducers

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        cakes: state.cakes - 1
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        iceCream: state.iceCream - 1
      };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});


// Store

const store = createStore(allReducers, applyMiddleware(logger));


// Test

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyIceCream());
unsubscribe();

