import { Delete } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import DeleteBlogButton from "./DeleteBlogButton";

const DeleteBlogApproval = ({ onClose, blogId }) => {
  return (
    <div>
      <Typography mb={2}>Are you sure?</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={onClose}>Cancel</Button>
        <DeleteBlogButton onClose={onClose} blogId={blogId} />
      </Stack>
    </div>
  );
};

export default DeleteBlogApproval;
