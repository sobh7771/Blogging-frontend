import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavorite = () => {
  return (
    <IconButton aria-label="add to favorites">
      <FavoriteIcon />
    </IconButton>
  );
};

export default AddToFavorite;
