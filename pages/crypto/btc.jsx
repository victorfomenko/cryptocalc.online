import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../../components/WithRoot';
import initStore from '../../config/store'

const styles = {
  root: {
    textAlign: 'center',
  },
};

class BTC extends React.PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
        BTC
      </div>
    );
  }
}

BTC.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WithRedux = withRedux(initStore, null, mapDispatchToProps)(BTC);
export default withRoot(withStyles(styles)(WithRedux));