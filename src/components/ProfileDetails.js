import { Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { request } from "graphql-request";
import { gql } from "graphql-request";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProfilePic from "./ProfilePic";
import useMediaQuery from "@mui/material/useMediaQuery";

const Wrapper = styled("div")(({ theme }) => ({
  borderBottom: "1px solid",
  borderBottomColor: "#ccc",
  paddingBottom: 40,
  marginBottom: 40,
}));

const GetProfileDetails = gql`
  query GetProfileDetails($id: ID) {
    profile(id: $id) {
      img
      name
      followersCount
      followingCount
      blogs {
        total
      }
    }
  }
`;

const getProfileDetails = ({ queryKey }) =>
  request("/graphql", GetProfileDetails, { id: queryKey[1] });

const ProfileDetails = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery(
    ["profileDetails", id],
    getProfileDetails
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    toast.error("Something went wrong!");
    return null;
  }

  const { img, name, followersCount, followingCount, blogs } = data.profile;

  return (
    <Wrapper>
      <Grid container sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Grid item xs={4}>
          <ProfilePic pic={img} />
        </Grid>
        <Grid item container direction="column" xs={5}>
          <Grid item mb={2}>
            <Typography variant="h4">{name}</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">
                <b>{blogs.total}</b> posts
              </Typography>
              <Typography variant="h6">
                <b>{followersCount}</b> followers
              </Typography>
              <Typography variant="h6">
                <b>{followingCount}</b> following
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Wrapper>
  );
};

export default ProfileDetails;
