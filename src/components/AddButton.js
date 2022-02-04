import React from "react";
import { ButtonBase } from "@mui/material";
// import { createStyles, makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const RoundedButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "50%",
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0, 1, 1),
  boxShadow: theme.shadows[2],
}));

const AddButton = () => {
  return (
    <Link to="/blogs/add">
      <RoundedButton>
        <AddIcon />
      </RoundedButton>
    </Link>
  );
};

export default AddButton;
