import React from "react";
import { Grid, Paper } from "@mui/material";
import BlogList from "../components/BlogList";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div>
      <Grid
        container
        rowGap={4}
        columnGap={6}
        sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
        <BlogList />
        <Grid item md={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
