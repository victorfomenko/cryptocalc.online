import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  header: {
    width: '100%',
  },
});

function Header(props) {
  const { classes } = props;
  return (
      <AppBar position="static" color="primary" className={classes.header}>
        <Toolbar>
          <Typography type="title" color="inherit">
            Crypto calc
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
