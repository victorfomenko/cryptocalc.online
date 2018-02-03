import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

// Components
import Typography from 'material-ui/Typography';
import Layout from '../../components/Layout';
import Calculator from '../../components/Calculator';
import withRoot from '../../components/WithRoot';
import withUrlParams from '../../components/utils/withUrlParams';

// Helpers
import initStore from '../../config/store';
import * as coinDux from '../../dux/coin/coinDux';

class ETC extends React.PureComponent {
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
      await store.dispatch(coinDux.loadCoin(req, 162));
      const coin = coinDux.etcSelector(store.getState());
      return { coin };
    }
    return {};
  }

  render() {
    const {
      coin,
      params: {
        hashRate = 84,
        power = 0,
        powerCost = 0,
        hashUnit = 'MH',
        poolFee = 0,
      },
    } = this.props;

    return (
      <div>
        <Layout
          title="Калькулятор майнинга ETC"
          description="Калькулятор доходности майнинга ETC"
        >
          <Typography type="display1" gutterBottom>
            Etherium Classic(ETC) майнинг-калькулятор
          </Typography>
          {coin && (
            <Calculator
              tag={coin.tag}
              price={coin.mid}
              hashUnit={hashUnit}
              difficulty={coin.difficulty24}
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
        </Layout>
      </div>
    );
  }

  componentDidMount() {
    this.props.loadCoin(null, 162);
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
  coin: coinDux.etcSelector(state),
});

const WithRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withUrlParams(ETC),
);

export default withRoot(WithRedux);
