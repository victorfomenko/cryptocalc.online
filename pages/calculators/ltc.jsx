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

class LTC extends React.PureComponent {
  static propTypes = {
    onChangeParams: PropTypes.func.isRequired,
    coin: PropTypes.shape({
      tag: PropTypes.string.isRequired,
      mid: PropTypes.string.isRequired,
      difficulty24: PropTypes.number.isRequired,
      block_reward: PropTypes.number.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      hashRate: PropTypes.string,
      power: PropTypes.string,
      powerCost: PropTypes.string,
    }).isRequired,
  };

  static async getInitialProps({ store, req, isServer }){
    if(isServer) {
      await store.dispatch(coinDux.loadCoin(req, 4))
      const coin = coinDux.coinSelector(store.getState())
      return { coin }
    }
  };

  render() {
    const { 
      coin: { 
        tag,
        mid: price,
        difficulty24, 
        block_reward 
      } , 
      params: { 
        hashRate=500, 
        power=0, 
        powerCost=0,
        poolFee=0,
        hashUnit='MH',
      }, 
      classes 
    } = this.props;
    
    return (
      <div>
        <Typography type="display1" gutterBottom>Litecoin(LTC) майнинг-калькулятор</Typography>
        <Calculator 
          tag={tag}
          price={price} 
          difficulty={difficulty24*Math.pow(2,32)} 
          blockReward={block_reward}
          hashRate={hashRate}
          hashUnit={hashUnit}
          power={power}
          powerCost={powerCost}
          poolFee={poolFee}
          onHashRateChange={this.handleHashRateChange}
          onHashUnitChange={this.handleHashUnitChange}
          onPowerChange={this.handlePowerChange}
          onPowerCostChange={this.handlePowerCostChange}
          onPoolFeeChange={this.handlePoolFeeChange}
        />
      </div>
    );
  }


  componentDidMount() {
    this.props.loadCoin(null, 4);
  }

  componentWillUnmount(){
    this.props.clearCoin();
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
  handlePoolFeeChange = (poolFee) => {
    this.props.onChangeParams({ 
      ...this.props.params,
      poolFee,
    })
  }
  handleHashUnitChange = (hashUnit) => {
    this.props.onChangeParams({ 
      ...this.props.params,
      hashUnit,
    })
  }
}


const mapDispatchToProps = {
  loadCoin: coinDux.loadCoin,
  clearCoin: coinDux.clearCoin,
};

const mapStateToProps = state => ({
  coin: coinDux.coinSelector(state),
});

const WithRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withUrlParams(LTC)
);

export default withRoot(WithRedux);