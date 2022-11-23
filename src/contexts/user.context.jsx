import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.context";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value that you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// implementing the reducer
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER ",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  //to utilize the reducer the useReducer would take 2 things first one the reducer that you've created and the initial value
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
  // the dispatch function that we do have while using useReducer needs whenever you call it to pass an action to it

  const value = { currentUser, setCurrentUser };

  // getting the state of sign in and sign out using observable
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        //Creating user doc if we do get a user
        createUserDocumentFromAuth(user);
      }
      //setting the user for the context
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
