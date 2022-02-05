import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Container, Box, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import MyTextField from "../../components/MyTextField";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

let schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

const AddBlog = gql`
  mutation AddBlog($title: String!, $body: String!, $tags: [String]) {
    addBlog(title: $title, body: $body, tags: $tags) {
      _id
      tags
    }
  }
`;

const addBlog = (blog) => request("/graphql", AddBlog, blog);

function BlogCreate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, isError, mutate } = useMutation(addBlog);
  const handleSubmit = async (values) => {
    mutate(values, {
      async onSuccess() {
        await queryClient.refetchQueries("blogs", { throwOnError: true });
        // console.log("Called!!!!");
        navigate("/");
      },
    });
  };

  return (
    <Formik
      initialValues={{ title: "", body: "", tags: [] }}
      onSubmit={handleSubmit}
      validationSchema={schema}>
      {({ handleSubmit, setFieldValue }) => (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <MyTextField id="title" label="Blog title" name="title" />
              <MyTextField
                id="body"
                label="Blog body"
                name="body"
                multiline
                rows={6}
              />
              <TextField
                margin="normal"
                fullWidth
                variant="filled"
                id="tags"
                label="Blog tags"
                name="tags"
                placeholder="e.g. js,react,mern"
                helperText="Enter comma separated tags"
                onChange={(e) =>
                  setFieldValue("tags", e.target.value.split(","))
                }
              />
              <LoadingButton
                type="submit"
                fullWidth
                loading={isLoading}
                loadingPosition="start"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<SendIcon />}
                variant="contained">
                {!isLoading && "Publish"}
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
}

export default BlogCreate;
