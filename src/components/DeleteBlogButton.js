import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { request } from "graphql-request";
import { gql } from "graphql-request";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const DeleteBlog = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

const deleteBlog = (id) => request("/graphql", DeleteBlog, { id });

const DeleteBlogButton = ({ id, onClose }) => {
  const { isLoading, mutate } = useMutation(deleteBlog);
  const queryClient = useQueryClient();

  const handleClick = () => {
    mutate(id, {
      async onSuccess() {
        await queryClient.refetchQueries("blogs");
        onClose();
      },
    });
  };
  return (
    <LoadingButton
      onClick={handleClick}
      variant="contained"
      color="warning"
      startIcon={<Delete />}
      loading={isLoading}>
      Delete
    </LoadingButton>
  );
};

export default DeleteBlogButton;
