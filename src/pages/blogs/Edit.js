import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  Container,
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import MyTextField from "../../components/MyTextField";
import ProgressBar from "../../components/ProgressBar";
import MyModal from "../../components/MyModal";
import NotFound from "../NotFound";
import ImageUpload from "../../components/ImageUpload";

let schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
});

const EditBlog = gql`
  mutation EditBlog($id: ID!, $blog: BlogInput!) {
    editBlog(id: $id, blog: $blog) {
      id
    }
  }
`;

const GetBlogById = gql`
  query Blog($id: ID) {
    blog(id: $id) {
      title
      body
      tags
    }
  }
`;

const editBlog = (blog) => request("/graphql", EditBlog, blog);
const getBlogById = ({ queryKey }) =>
  request("/graphql", GetBlogById, { id: queryKey[1] });

function BlogEdit() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, isError, mutate } = useMutation(editBlog);
  const { id } = useParams();
  const { data, isLoading: isBlogLoading } = useQuery(
    ["blogs", id],
    getBlogById
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isBlogLoading) {
    return <ProgressBar />;
  }

  if (!data.blog) {
    return <NotFound />;
  }

  const handleSubmit = async (values) => {
    mutate(
      { blog: values, id: id },
      {
        async onSuccess() {
          await queryClient.refetchQueries("blogs", { throwOnError: true });
          navigate("/");
        },
      }
    );
  };

  const { title, body, tags } = data.blog;

  return (
    <>
      <Formik
        initialValues={{ title, body, tags: tags.join(",") }}
        onSubmit={handleSubmit}
        validationSchema={schema}>
        {({ handleSubmit, setFieldValue, values }) => (
          <>
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
                    value={values.tags}
                  />
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}>
                        Upload an image
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <LoadingButton
                        type="submit"
                        fullWidth
                        loading={isLoading}
                        loadingPosition="start"
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={<SaveIcon />}
                        variant="contained">
                        {!isLoading && "Save"}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
            <MyModal onClose={handleClose} open={open}>
              <ImageUpload onClose={handleClose} />
            </MyModal>
          </>
        )}
      </Formik>
    </>
  );
}

export default BlogEdit;
