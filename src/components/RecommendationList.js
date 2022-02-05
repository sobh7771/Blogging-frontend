import React from "react";
import { Grid, Typography } from "@mui/material";
import request, { gql } from "graphql-request";

import Recommendation from "./Recommendation";
import { useQuery } from "react-query";

const query = gql`
  query Recommendations {
    recommendations {
      _id
      name
    }
  }
`;

const getRecommendations = () => request("/graphql", query);

const RecommendationList = () => {
  const { isLoading, isError, data } = useQuery(
    "recommendations",
    getRecommendations
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Something went wrong!</>;
  }

  return (
    <>
      <Typography variant="h6" mb={2}>
        Suggestions for you
      </Typography>
      <Grid container direction="column" spacing={2}>
        {data.recommendations.map((recommendation) => (
          <Recommendation
            key={recommendation._id}
            recommendation={recommendation}
          />
        ))}
      </Grid>
    </>
  );
};

export default RecommendationList;
