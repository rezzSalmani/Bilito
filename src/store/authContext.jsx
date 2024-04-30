import React, { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../supabaseClient";
const AuthContext = createContext({ currentUser: null });

export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        setCurrentUser(session?.user);
      } else if (event === "SIGNED_OUT") {
        setCurrentUser(null);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });
    // call unsubscribe to remove the callback
    return () => data.subscription.unsubscribe();
  }, []);
  const values = { currentUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
