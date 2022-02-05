import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Stack } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import AddToFavorite from "./AddToFavorite";
import MyPopover from "./MyPopover";
import { Delete, Edit } from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Blog({ blog }) {
  const { _id, title, body, createdAt, author, img } = blog;
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item>
      <Card>
        <CardHeader
          avatar={
            <Link to={`/profile/${author._id}`}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {author.name.charAt(0)}
              </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={<Link to={`/profile/${author._id}`}>{author.name}</Link>}
          subheader={moment(createdAt).fromNow()}
        />

        <div style={{ position: "relative" }}>
          <MyPopover
            open={!!anchorEl}
            onClose={handleClose}
            anchorEl={anchorEl}>
            <Stack padding={2} spacing={2}>
              <Button color="secondary" startIcon={<Edit />}>
                <Link to={`/blogs/${_id}/edit`}>Edit Post</Link>
              </Button>
              <Button
                variant="contained"
                color="warning"
                startIcon={<Delete />}>
                Delete Post
              </Button>
            </Stack>
          </MyPopover>
        </div>
        <CardMedia component="img" height="194" image={img} />
        <CardContent>
          <Typography variant="h4">{title}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <AddToFavorite />
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{body}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default Blog;
