import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Button, Grid, IconButton } from "@mui/material";
import { gql, request } from "graphql-request";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useQueryClient } from "react-query";

const Input = styled("input")({
  display: "none",
});

const ImagePlaceholder = styled("div")(({ theme }) => ({
  height: "230px",
  border: `2px dashed ${theme.palette.primary.main}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
}));

const EditBlog = gql`
  mutation EditBlog($blogId: ID!, $img: String) {
    editBlog(blogId: $blogId, img: $img) {
      _id
    }
  }
`;

const ImageUpload = () => {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    file && setImgUrl(URL.createObjectURL(file));
  }, [file]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const fd = new FormData();

    fd.append("file", file);
    fd.append("upload_preset", "zth7d3dn");

    try {
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dfngpslab/image/upload",
        {
          method: "POST",
          body: fd,
        }
      ).then((r) => r.json());

      await request("/graphql", EditBlog, {
        img: data.secure_url,
        blogId: id,
      });
      setLoading(false);
      await queryClient.refetchQueries("blogs");
      navigate("/");
    } catch (e) {}
  };

  return (
    <div>
      {imgUrl ? (
        <Grid container direction="column">
          <Grid item>
            <Image src={imgUrl} />
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between">
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => ref.current.click()}>
                Change image
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleUpload}
                startIcon={<Upload />}>
                Upload
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <ImagePlaceholder onClick={() => ref.current.click()}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span">
            <PhotoCamera />
          </IconButton>
        </ImagePlaceholder>
      )}

      <Input
        accept="image/*"
        id="icon-button-file"
        type="file"
        ref={ref}
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUpload;
