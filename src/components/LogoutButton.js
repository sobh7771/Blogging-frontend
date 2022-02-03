import React, { useContext } from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const handleClick = async () => {};

  return (
    <Button
      color="secondary"
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleClick}>
      LOGOUT
    </Button>
  );
};

export default LogoutButton;
