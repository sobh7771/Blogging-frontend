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
import { Grid } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import AddToFavorite from "./AddToFavorite";

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
  const { _id, title, body, createdAt, author } = blog;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Link to={`/profile/${author._id}`}>{author.name}</Link>}
          subheader={moment(createdAt).fromNow()}
        />
        <CardMedia
          component="img"
          height="194"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
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
