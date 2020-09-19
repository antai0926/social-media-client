import React, { Fragment, useState } from 'react';
import MyButton from '../util/MyButton';
// import LikeButton from './LikeButton';
// import Comments from './Comments';
// import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { getScream, clearErrors } from '../redux/actions/dataAction';
import { useDispatch, useSelector } from 'react-redux';

const styles = (theme) => ({
  ...theme.custom,
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
});

const ScreamDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState('');
  const [newPath, setNewPath] = useState('');
  const { classes } = props;

  const {
    screamId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle,
    comments,
  } = useSelector((state) => state.data.scream);

  const { loading } = useSelector((state) => state.UI);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    dispatch(getScream(props.screamId));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DialogMarkup = () => {
    if (loading) {
      return <CircularProgress size={200} />;
    }
    return (
      <Grid container spacing={3}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('MMMM DD YYYY, h:mm a')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          <DialogMarkup />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(ScreamDialog);