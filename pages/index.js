/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../components/WithRoot';

const styles = {
  root: {
    textAlign: 'center',
  },
};

class Index extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        {/* <Header/> */}
        <Typography type="display1" gutterBottom>
          Crypto calculator
        </Typography>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));