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

class ETH extends React.PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
        eth
      </div>
    );
  }
}

ETH.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WithRedux = withRedux(initStore, null, mapDispatchToProps)(ETH);
export default withRoot(withStyles(styles)(WithRedux));