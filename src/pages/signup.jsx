import React, { useState } from 'react';
import Prototypes from 'prop-types';

//Third Party
import { Link } from 'react-router-dom';

//component
import AppIcon from '../images/icon.png';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';

const styles = (theme) => ({
  ...theme.custom,
});

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  const { UI, signupUser } = props;
  const { loading, errors } = UI;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUserData = { email, password, confirmPassword, handle };
    signupUser(newUserData, props.history);
  };

  const { classes } = props;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            helperText={errors.password}
            error={errors.password ? true : false}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={(event) => setConfirmPassword(event.target.value)}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Your Name"
            className={classes.textField}
            value={handle}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            onChange={(event) => setHandle(event.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress
                size={30}
                className={classes.progress}
              ></CircularProgress>
            )}
          </Button>
          <br />
          <small>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Signup.propTypes = {
  classes: Prototypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});
const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
