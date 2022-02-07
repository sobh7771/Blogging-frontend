import { LoadingButton } from "@mui/lab";
import { request } from "graphql-request";
import { gql } from "graphql-request";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const Unfollow = gql`
  mutation Unfollow($id: ID!) {
    unfollow(id: $id) {
      id
    }
  }
`;

const unfollow = (id) => request("/graphql", Unfollow, { id });

const UnfollowButton = ({ id }) => {
  const { isLoading, mutate, isError } = useMutation(unfollow);
  const queryClient = useQueryClient();

  const handleClick = () => {
    mutate(id, {
      onSuccess() {
        queryClient.refetchQueries("recommendations");
        queryClient.refetchQueries("profileDetails");
        queryClient.refetchQueries("currentViewer");
      },
    });
  };

  if (isError) {
    toast.error("Something went wrong, Please try again.", {
      toastId: "unfollow/error",
    });
  }

  return (
    <LoadingButton onClick={handleClick} loading={isLoading}>
      Unfollow
    </LoadingButton>
  );
};

export default UnfollowButton;
