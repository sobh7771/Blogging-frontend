import { gql, request } from "graphql-request";
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultState = {
  isSignedIn: null,
  user: null,
};

const defaultValue = {
  user: defaultState,
  login() {},
  logout() {},
  signup() {},
};

/*
 * Queries
 */

const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      name
    }
  }
`;

export const AuthContext = React.createContext(defaultValue);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(defaultState);
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await request(
      "/graphql",
      gql`
        query Viewer {
          viewer {
            _id
          }
        }
      `
    );

    if (!data.viewer) {
      setUser({ isSignedIn: false, user: null });
    } else {
      setUser({ isSignedIn: true, user: data.viewer });
    }
  }, []);

  const signup = async (values) => {};

  const login = async (user) => {
    try {
      const data = await request("/graphql", Login, user);
      setUser({ isSignedIn: true, user: data.login });
      navigate("/");

      toast.success(
        <>
          Congrats🎉! <b>{data.login.name}</b> you have logged in successfully
        </>
      );
    } catch (e) {
      if (e.response.errors[0].message.includes("Invalid Credentials!")) {
        toast.error("Invalid Credentials!");
      }
    }
  };

  const logout = async () => {};

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;