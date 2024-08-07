import React, { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
const AuthContext = createContext({ currentUser: null });

export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION") {
        // handle initial session
        if (session) setCurrentUser(session.user);
      } else if (event === "SIGNED_IN") {
        setCurrentUser(session?.user);
        //  set user email in local storage
        localStorage.setItem("Bilito-user", session?.user.id);
        if (!session.user) toast.error("خطایی رخ داده است!");
      } else if (event === "SIGNED_OUT") {
        setCurrentUser(null);
        localStorage.removeItem("Bilito-user");
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
        setCurrentUser(session?.user);
      }
    });
    // call unsubscribe to remove the callback
    return () => data.subscription.unsubscribe();
  }, []);
  const values = { currentUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
