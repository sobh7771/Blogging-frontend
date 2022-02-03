import React, { useState, useContext } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Container,
  Avatar,
  Button,
  Link as MuiLink,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import MyTextField from "../components/MyTextField";
import { AuthContext } from "../contexts/AuthContext";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid Email Address")
    .required("Enter valid Email Address"),
  password: yup
    .string()
    .required("Enter valid Password")
    .min(8, "Enter at least 8 characters"),
});

export default function SignIn() {
  const { login } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    login(values);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={schema}>
      {({ handleSubmit }) => (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <MyTextField
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <MyTextField
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <MuiLink href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </MuiLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
}
