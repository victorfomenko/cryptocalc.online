import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  header: {
    width: '100%',
    overflow: 'hidden',
  },
  container: {
    margin: '0 auto'
  },
  logo: {
    textDecoration: 'none',
    color: 'inherit'
  }
});

function Header(props) {
  const { classes } = props;
  return (
      <AppBar position="static" color="primary" className={classes.header}>
        <Grid container>
          <Grid item xs={10} className={classes.container}>
            <Toolbar>
              <Typography type="title" color="inherit">
                <Link href='/'>
                  <a className={classes.logo}>Crypto calc</a>
                </Link>
              </Typography>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
