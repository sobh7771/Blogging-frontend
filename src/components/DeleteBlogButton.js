import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { request } from "graphql-request";
import { gql } from "graphql-request";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const DeleteBlog = gql`
  mutation DeleteBlog($blogId: ID) {
    deleteBlog(blogId: $blogId) {
      _id
    }
  }
`;

const deleteBlog = (blogId) => request("/graphql", DeleteBlog, { blogId });

const DeleteBlogButton = ({ blogId, onClose }) => {
  const { isLoading, mutate } = useMutation(deleteBlog);
  const queryClient = useQueryClient();

  const handleClick = () => {
    mutate(blogId, {
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
