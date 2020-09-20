import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//MUI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import Notifications from '@material-ui/icons/Notifications';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

//component
import MyButton from '../../util/MyButton';
import { logoutUser } from '../../redux/actions/userAction';
import PostScream from '../scream/PostScream';

const NavBar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);

  const AuthenticatedView = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(logoutUser());
    };
    return (
      <React.Fragment>
        <PostScream />
        <MyButton tip="Home">
          <HomeIcon color="primary" />
        </MyButton>
        <MyButton tip="Notifications">
          <Notifications color="primary" />
        </MyButton>
        <MyButton tip="Logout" onClick={handleLogout}>
          <MeetingRoomIcon color="primary" />
        </MyButton>
      </React.Fragment>
    );
  };
  const UnAuthenticatedView = () => {
    return (
      <React.Fragment>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </React.Fragment>
    );
  };

  return (
    <AppBar color="primary">
      <ToolBar className="nav-container">
        {authenticated ? <AuthenticatedView /> : <UnAuthenticatedView />}
      </ToolBar>
    </AppBar>
  );
};

export default NavBar;