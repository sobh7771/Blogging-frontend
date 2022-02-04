import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const MyTextField = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      {...props}
      {...field}
      error={meta.error && meta.touched}
      helperText={meta.error}
      variant="filled"
    />
  );
};

export default MyTextField;
