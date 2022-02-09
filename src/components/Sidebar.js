import React, { useContext } from "react";
import RecommendationList from "./RecommendationList";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <div className={classes.root}>
      <RecommendationList />
    </div>
  );
};

export default Sidebar;
