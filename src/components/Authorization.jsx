import React, {useEffect, useState} from "react";
import {ajaxValidateToken} from "./ajax.jsx";
import {useNavigate} from "react-router-dom";
import Roles from "../model/Roles.jsx";
import Loading from "../Loading.jsx";

const AuthorizationContext = React.createContext();
export default function Authorization({rolesAllowed, invisibleForUnauthorized, children}) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [renderChildren, setRenderChildren] = useState(null);
  useEffect(() => {
    if(rolesAllowed.includes(Roles.GUEST)){
      setAuthorized(true);
      setIsLoading(false);
      setRenderChildren(children);
      return;
    }
    const token = localStorage.getItem('auth');
    if (token) {
      ajaxValidateToken(token).then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        if (rolesAllowed && !rolesAllowed.includes(user.role)) {
          if (!invisibleForUnauthorized) {
            navigate('/login');
            return;
          } else {
            return;
          }
        } else {
          setAuthorized(true);
          setRenderChildren(children)
        }
        setLoggedUser(user);
        setIsLoading(false);
      });
    } else {
      if (!invisibleForUnauthorized) {
        navigate('/login');
      } else {
        setIsLoading(false)
      }
    }

  }, [invisibleForUnauthorized, navigate, rolesAllowed]);

  return (
    <AuthorizationContext.Provider value={loggedUser}>
      <Loading visible={loading}/>
      {authorized && !loading && renderChildren}
    </AuthorizationContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthorizationContext);
}