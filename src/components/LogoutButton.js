import React, { useContext } from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../contexts/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleClick = async () => {
    logout();
  };

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
