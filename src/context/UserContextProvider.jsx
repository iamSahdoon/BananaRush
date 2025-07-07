import { useAuthContext } from "@asgardeo/auth-react";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase/config";

const UserContextProvider = (props) => {
  const { state, getBasicUserInfo } = useAuthContext();
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then(async (response) => {
          setUserInfo(response);

          if (response?.sub) {
            const userRef = doc(database, "users", response.sub);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              // New user: create document
              await setDoc(userRef, {
                username: response.givenName,
                email: response.username,
                rank: null,
                lastMatchDate: null,
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setUserInfo(null);
        });
    } else if (state.isAuthenticated === false) {
      setUserInfo(null);
    }
  }, [state.isAuthenticated, getBasicUserInfo]);

  // Combine userInfo with additional values
  const contextValue = {
    ...userInfo,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
