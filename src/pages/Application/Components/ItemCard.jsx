import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Bookmark, ArrowUpward, ArrowDownward, Share, LocalOffer, Delete, Edit, MoreVert } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { List, ListItem, ListItemIcon, ListItemText, Popover } from '@mui/material';

export default function ItemCard(
  {
    type,
    shopName,
    name,
    open,
    close,
    discription,
    upvote,
    downvote,
    photo,
    price,
    profile, address }) {
  const [upvoted, setUpvoted] = React.useState(false);
  const [downvoted, setDownvoted] = React.useState(false);
  const [upvoteCount, setUpvoteCount] = React.useState(0);
  const [downvoteCount, setDownvoteCount] = React.useState(0);
  const formatTime = (timeString) => {
    if (!timeString) return ''; // Handle empty or undefined time strings

    const [hours, minutes] = timeString.split(':'); // Split the string into parts

    // Return formatted time without seconds
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  // Example usage
  const openingTime = formatTime(open); // e.g., "09:30:00" becomes "09:30"
  const closingTime = formatTime(close); // e.g., "17:00:00" becomes "17:00"

  const toggleUpvote = () => {
    setUpvoted((prev) => {
      const newState = !prev;
      setUpvoteCount((prevCount) => (newState ? prevCount + 1 : prevCount - 1));
      if (downvoted) {
        setDownvoted(false);
        setDownvoteCount((prevCount) => prevCount - 1);
      }
      return newState;
    });
  };

  const toggleDownvote = () => {
    setDownvoted((prev) => {
      const newState = !prev;
      setDownvoteCount((prevCount) => (newState ? prevCount + 1 : prevCount - 1));
      if (upvoted) {
        setUpvoted(false);
        setUpvoteCount((prevCount) => prevCount - 1);
      }
      return newState;
    });
  };

  React.useEffect(() => {
    setUpvoteCount(upvote);
  }, [upvote]);

  React.useEffect(() => {
    setDownvoteCount(downvote);
  }, [downvote]);
  return (
    <Card sx={{ maxWidth: 275, backgroundColor: "white", width: "fit-contain", height: "fit-contain" }}>
      {(type !== "Home" && type !== "Shop") && (
        <CardHeader
          avatar={
            <Avatar src={profile} sx={{ bgcolor: red[500] }} aria-label="recipe">
              {shopName.charAt(0)}
            </Avatar>
          }
          title={
            <Typography variant="body1" sx={{ color: "maroon", fontWeight: "bold", fontSize: "14px" }}>
              {shopName}
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "lightgray", fontWeight: "bold" }}>
              {address}
            </Typography>
          }
        />
      )}
      <CardMedia component="img" height="140" image={photo} alt="Paella dish" />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: "maroon",
            fontWeight: "bold",
            fontSize: type === "Home" ? "12px" : "14px",
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "lightgray", fontWeight: "bold" }}>
          {price}
        </Typography>
        {type !== "Home" && (
          <>
            <Typography variant="body2" sx={{ color: "lightgray", fontWeight: "bold" }}>
              Timing: {openingTime} - {closingTime}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: "1.4" }}>
              {discription}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "maroon", marginLeft: 1, marginRight: 1, minWidth: "40px" }}>
            {upvoteCount}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ marginX: 1 }} />
          <Typography variant="body2" sx={{ color: "maroon", marginRight: 1, minWidth: "40px" }}>
            {downvoteCount}
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="upvote"
            sx={{
              color: upvoted ? "white" : "maroon",
              backgroundColor: upvoted ? "maroon" : "transparent",
              border: "1px solid maroon",
              padding: 0,
              "&:hover": {
                backgroundColor: "maroon",
                color: "white",
              },
              marginX: 1.5
            }}
            onClick={toggleUpvote}
          >
            <ArrowUpward />
          </IconButton>

          <IconButton
            aria-label="downvote"
            sx={{
              color: downvoted ? "white" : "maroon",
              backgroundColor: downvoted ? "maroon" : "transparent",
              border: "1px solid maroon",
              padding: 0,
              "&:hover": {
                backgroundColor: "maroon",
                color: "white",
              },
            }}
            onClick={toggleDownvote}
          >
            <ArrowDownward />
          </IconButton>
          <MoreButton type={type} />
        </div>
      </CardActions>
    </Card>
  );
}

const MoreButton = ({ type }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Actions based on type
  const actions = [
    { icon: <Edit />, name: 'Edit', visible: type === 'Shop' },
    { icon: <Delete />, name: 'Delete', visible: type === 'Shop' },
    { icon: <LocalOffer />, name: 'Create Deal', visible: type === 'Shop' },
    { icon: <Bookmark />, name: 'Bookmark', visible: true },
    { icon: <Share />, name: 'Share', visible: true },
  ];

  return (
    <div>
      <IconButton
        aria-label="more options"
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          color: 'maroon',
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'maroon',
            color: 'white',
          },
        }}
      >
        <MoreVert />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <List>
          {actions
            .filter(action => action.visible) // Show only actions that are visible
            .map(action => (
              <ListItem button key={action.name}>
                <ListItemIcon>{action.icon}</ListItemIcon>
                <ListItemText primary={<Typography variant="body2">{action.name}</Typography>} />
              </ListItem>
            ))}
        </List>
      </Popover>
    </div>
  );
};

