import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import withStyles from 'material-ui/styles/withStyles';
import withRoot from '../../components/WithRoot';
import initStore from '../../config/store'
import * as coinDux from '../../dux/coin/coinDux'

// Components
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = {
};

class ETH extends React.PureComponent {
  static async getInitialProps({ store }){
    await store.dispatch(coinDux.loadCoin(151))
    const coin = coinDux.coinSelector(store.getState())
    return { coin }
  }

  render() {
    const { coin } = this.props;
    return (
      <div>
        <Typography type="display1" gutterBottom>Etherium майнинг-калькулятор</Typography>
        <div>
          <Typography style={{overflowWrap: 'break-word'}}>{JSON.stringify(coin)}</Typography>
        </div>
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