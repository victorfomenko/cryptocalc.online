import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

// Components
import Typography from 'material-ui/Typography';
import Calculator from '../../components/Calculator';
import withRoot from '../../components/WithRoot';
import withUrlParams from '../../components/utils/withUrlParams';

// Helpers
import initStore from '../../config/store';
import * as coinDux from '../../dux/coin/coinDux';

class BTG extends React.PureComponent {
  static propTypes = {
    loadCoin: PropTypes.func.isRequired,
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

  static async getInitialProps({ store, req, isServer }) {
    if (isServer) {
      await store.dispatch(coinDux.loadCoin(req, 214));
      const coin = coinDux.btgSelector(store.getState());
      return { coin };
    }
    return {};
  }

  render() {
    const {
      coin,
      params: {
        hashRate = 870,
        power = 0,
        powerCost = 0,
        poolFee = 0,
        hashUnit = 'H',
      },
    } = this.props;

    return (
      <div>
        <Typography type="display1" gutterBottom>
          Bitcoin Gold(BTG) майнинг-калькулятор
        </Typography>
        {coin && (
          <Calculator
            tag={coin.tag}
            price={coin.mid}
            hashUnit={hashUnit}
            difficulty={coin.difficulty24 * 2 ** 13}
            blockReward={coin.block_reward}
            hashRate={hashRate}
            power={power}
            powerCost={powerCost}
            poolFee={poolFee}
            onHashRateChange={this.handleHashRateChange}
            onHashUnitChange={this.handleHashUnitChange}
            onPowerChange={this.handlePowerChange}
            onPowerCostChange={this.handlePowerCostChange}
            onPoolFeeChange={this.handlePoolFeeChange}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.loadCoin(null, 214);
  }

  handleHashRateChange = hashRate => {
    this.props.onChangeParams({
      ...this.props.params,
      hashRate,
    });
  };

  handlePowerChange = power => {
    this.props.onChangeParams({
      ...this.props.params,
      power,
    });
  };
  handlePowerCostChange = powerCost => {
    this.props.onChangeParams({
      ...this.props.params,
      powerCost,
    });
  };
  handlePoolFeeChange = poolFee => {
    this.props.onChangeParams({
      ...this.props.params,
      poolFee,
    });
  };
  handleHashUnitChange = hashUnit => {
    this.props.onChangeParams({
      ...this.props.params,
      hashUnit,
    });
  };
}

const mapDispatchToProps = {
  loadCoin: coinDux.loadCoin,
};

const mapStateToProps = state => ({
  coin: coinDux.btgSelector(state),
});

const WithRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withUrlParams(BTG),
);

export default withRoot(WithRedux);
