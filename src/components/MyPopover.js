import { Button, Popover, Stack, Typography } from "@mui/material";
import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";

const MyPopover = ({ children, ...rest }) => {
  // const { id } = useParams();
  return (
    <Popover
      {...rest}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      {children}
    </Popover>
  );
};

export default MyPopover;
