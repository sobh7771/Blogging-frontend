import React from "react";
import { ButtonBase } from "@mui/material";
// import { createStyles, makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";

const RoundedButton = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "50%",
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0, 1, 1),
  boxShadow: theme.shadows[2],
}));

const AddButton = () => {
  return (
    <RoundedButton>
      <AddIcon />
    </RoundedButton>
  );
};

export default AddButton;
