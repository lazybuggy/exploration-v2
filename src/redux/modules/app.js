import keys from '../keys';

const defaultState = {
  loaded: false,
  user: {},
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.LANDING_LOADED:
      return { ...state, loaded: action.loaded };
    case keys.USER:
      return { ...state, user: action.user }
    default:
      return state;
  }
}

// Action Creators
export function setLandingLoaded(loaded) {
  return {
    type: keys.LANDING_LOADED,
    loaded
  };
}

export function setUserState(user) {
  console.log("rREDUX USER HAS BEEN SET", user);
  return {
    type: keys.USER,
    user
  };
}
