import { LoadingButton } from "@mui/lab";
import { request } from "graphql-request";
import { gql } from "graphql-request";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const Follow = gql`
  mutation Follow($id: ID!) {
    follow(id: $id) {
      id
    }
  }
`;

const follow = (id) => request("/graphql", Follow, { id });

const FollowButton = ({ id }) => {
  const { isLoading, mutate, isError } = useMutation(follow);
  const queryClient = useQueryClient();

  console.log(id);

  const handleClick = () => {
    mutate(id, {
      onSuccess() {
        queryClient.refetchQueries("currentViewer");
        queryClient.refetchQueries("recommendations");
        queryClient.refetchQueries("profileDetails");
      },
    });
  };

  if (isError) {
    toast.error("Something went wrong, Please try again.", {
      toastId: "follow/error",
    });
  }

  return (
    <LoadingButton loading={isLoading} onClick={handleClick}>
      Follow
    </LoadingButton>
  );
};

export default FollowButton;
