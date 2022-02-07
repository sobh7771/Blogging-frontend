import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu as MenuIcon,
} from "@mui/material";
import AddButton from "./AddButton";
import LogoutButton from "./LogoutButton";
import { AuthContext } from "../contexts/AuthContext";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }} mb={10}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Blogging</Link>
          </Typography>

          {user ? (
            <>
              <LogoutButton />
              <AddButton />
            </>
          ) : (
            <Link to="/account/sign-in">
              <Button
                color="secondary"
                variant="contained"
                startIcon={<LoginIcon />}>
                Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
