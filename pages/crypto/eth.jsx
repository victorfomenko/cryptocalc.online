import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../../components/WithRoot';
import initStore from '../../config/store'

// Components
import Typography from 'material-ui/Typography';

const styles = {
};

class ETH extends React.PureComponent {
  render() {
    return (
      <div>
        <Typography type="display1" gutterBottom>Etherium майнинг-калькулятор</Typography>
      </div>
    );
  }
}

ETH.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
})

const WithRedux = withRedux(initStore, null, mapDispatchToProps)(ETH);
export default withRoot(withStyles(styles)(WithRedux));