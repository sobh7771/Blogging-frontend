import React from "react";
import { Grid, LinearProgress, Typography } from "@mui/material";
import request, { gql } from "graphql-request";

import Recommendation from "./Recommendation";
import { useQuery } from "react-query";

const query = gql`
  query Recommendations {
    recommendations {
      id
      name
    }
  }
`;

const getRecommendations = () => request("/graphql", query);

const RecommendationList = () => {
  const { isLoading, isError, data, error } = useQuery(
    "recommendations",
    getRecommendations,
    { retry: false }
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError && error.response.errors[0].message === "Unauthorized!") {
    return null;
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
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </Grid>
    </>
  );
};

export default RecommendationList;
