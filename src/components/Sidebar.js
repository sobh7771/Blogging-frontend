import React from "react";
import RecommendationList from "./RecommendationList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: 0,
  },
});

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RecommendationList />
    </div>
  );
};

export default Sidebar;
