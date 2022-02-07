import { gql, request } from "graphql-request";
import React, { useMemo, useState, useEffect } from "react";
import { useQueryClient } from "react-query";
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

const Logout = gql`
  mutation Logot {
    logout {
      _id
    }
  }
`;

const Signup = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      _id
      name
    }
  }
`;

export const AuthContext = React.createContext(defaultValue);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(defaultState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const signup = async (user) => {
    try {
      const data = await request("/graphql", Signup, user);
      setUser({ isSignedIn: true, user: data.signup });
      navigate("/");

      toast.success(
        <>
          Thanks, <b>{data.signup.name}</b> for signing in.
        </>
      );
    } catch (e) {
      if (e.response.errors[0].path.includes("signup")) {
        toast.error("Email in use");
      }
    }
  };

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

  const logout = async () => {
    await request("/graphql", Logout);
    await queryClient.refetchQueries("recommendations");
    setUser({ isSignedIn: false, user: null });
    navigate("/");
  };

  const value = useMemo(() => ({ user, login, logout, signup }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
