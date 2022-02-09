import React, { useEffect } from "react";
import { useVisible } from "react-hooks-visible";
import { useInfiniteQuery } from "react-query";
import { Box, CircularProgress, Grid, LinearProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

function InfiniteScroll({ children, queryOptions }) {
  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(queryOptions);

  const [targetRef, isVisible] = useVisible((vi) => vi > 0.5);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    // console.log(error.response.errors[0].message);
    toast.error("Something went wrong, Please try again.", {
      toastId: "infiniteScroll/error",
    });
    return null;
  }

  return (
    <Grid item container md={7} spacing={4} direction="column">
      {children({ data })}
      <div ref={targetRef}></div>
      <Grid item>
        {isFetchingNextPage ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <Box mb={4}>
            <LoadingButton
              fullWidth
              onClick={() => fetchNextPage()}
              loading={isFetchingNextPage}
              variant="outlined"
              disabled={!hasNextPage}>
              Load more
            </LoadingButton>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default InfiniteScroll;
