import React from "react";
import {
  Paper,
  Avatar,
  Box,
  Grid,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Recommendation = ({ recommendation }) => {
  return (
    <Grid item>
      <Paper>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Link to={`/profile/${recommendation._id}`}>
                <Avatar>{recommendation.name.charAt(0)}</Avatar>
              </Link>
            </Grid>
            <Grid item flexGrow={1}>
              <Link to={`/profile/${recommendation._id}`}>
                <MuiLink underline="hover" color="ButtonText">
                  {recommendation.name}
                </MuiLink>
              </Link>
            </Grid>
            <Grid item>
              <Button>Follow</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Recommendation;
