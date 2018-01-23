import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import { withRouter } from 'next/router';
import numeral from 'numeral';
import memoize from 'lodash/memoize';

// Components
import Typography from 'material-ui/Typography'
import Calculator from '../../components/Calculator';
import withRoot from '../../components/WithRoot';
import withUrlParams from '../../components/utils/withUrlParams';

// Helpers
import initStore from '../../config/store'
import * as coinDux from '../../dux/coin/coinDux'

class BTC extends React.PureComponent {
  static propTypes = {
    onChangeParams: PropTypes.func.isRequired,
    coin: PropTypes.shape({
      tag: PropTypes.string.isRequired,
      mid: PropTypes.string.isRequired,
      difficulty24: PropTypes.number.isRequired,
      block_reward: PropTypes.number.isRequired,
    }),
    params: PropTypes.shape({
      hashRate: PropTypes.string,
      power: PropTypes.string,
      powerCost: PropTypes.string,
    }).isRequired,
  };

  static async getInitialProps({ store, req, isServer }){
    if(isServer) {
      await store.dispatch(coinDux.loadCoin(req, 1))
      const coin = coinDux.coinSelector(store.getState())
      return { coin }
    }
  };

  render() {
    const { 
      coin, 
      params: { 
        hashRate=14000, 
        power=0, 
        powerCost=0 
      }, 
      classes 
    } = this.props;
    
    return (
      <div>
        <Typography type="display1" gutterBottom>Bitcoin майнинг-калькулятор</Typography>
        { coin && 
          <Calculator 
            tag={coin.tag}
            price={coin.mid} 
            hashUnit='GH'
            difficulty={coin.difficulty24*Math.pow(2,32)} 
            blockReward={coin.block_reward}
            hashRate={hashRate}
            power={power}
            powerCost={powerCost}
            onHashRateChange={this.handleHashRateChange}
            onPowerChange={this.handlePowerChange}
            onPowerCostChange={this.handlePowerCostChange}
          />
        }
      </div>
    );
  }

  componentDidMount() {
    this.props.loadCoin(null, 1);
  }

  handleHashRateChange = (hashRate) => {
    this.props.onChangeParams({ 
      ...this.props.params, 
      hashRate
    })
  }

  handlePowerChange = (power) => {
    this.props.onChangeParams({ 
      ...this.props.params,
      power,
    })
  }
  handlePowerCostChange = (powerCost) => {
    this.props.onChangeParams({ 
      ...this.props.params,
      powerCost,
    })
  }
}

const mapDispatchToProps = {
  loadCoin: coinDux.loadCoin
}

const mapStateToProps = (state) => ({
  coin: coinDux.coinSelector(state)
})

const WithRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withUrlParams(BTC, { defaultParams: { hashRate: 84 } })
);

export default withRoot(WithRedux);