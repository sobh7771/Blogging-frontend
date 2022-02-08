import { gql, request } from "graphql-request";
import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProgressBar from "../components/ProgressBar";

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
      following {
        _id
        name
      }
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
      following {
        _id
        name
      }
    }
  }
`;

const GetCurrentViewer = gql`
  query Viewer {
    viewer {
      _id
      following {
        _id
        name
      }
    }
  }
`;

const getCurrentViewer = () => request("/graphql", GetCurrentViewer);

export const AuthContext = React.createContext(defaultValue);

function AuthContextProvider({ children }) {
  const { isLoading, data } = useQuery("currentViewer", getCurrentViewer);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signup = async (user) => {
    try {
      const data = await request("/graphql", Signup, user);
      await queryClient.refetchQueries("currentViewer");
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
      await queryClient.refetchQueries("currentViewer");
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
    await queryClient.refetchQueries("currentViewer");
    await queryClient.refetchQueries("recommendations");

    navigate("/");
  };

  const value = useMemo(
    () => ({ user: data?.viewer, login, logout, signup }),
    [data?.viewer]
  );

  if (isLoading) {
    return <ProgressBar />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
