import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import { withRouter } from 'next/router';
import withStyles from 'material-ui/styles/withStyles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import withRoot from '../../components/WithRoot';
import initStore from '../../config/store'
import numeral from 'numeral';
import memoize from 'lodash/memoize';
import * as coinDux from '../../dux/coin/coinDux'

// Components
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import withUrlParams from '../../components/utils/withUrlParams';

// Helpers
import { calcMiningReward } from '../../utils/math';

class ETH extends React.PureComponent {
  static propTypes = {
    onChangeParams: PropTypes.func.isRequired,
  };

  static async getInitialProps({ store }){
    await store.dispatch(coinDux.loadCoin(151))
    const coin = coinDux.coinSelector(store.getState())
    return { coin }
  };

  render() {
    const { coin: { difficulty24, block_reward } , params: { hashRate }, classes } = this.props;
    return (
      <div>
        <Typography type="display1" gutterBottom>Etherium майнинг-калькулятор</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="hashingPower">Hashing power</InputLabel>
          <div className={classes.formInputWrapper}>
            <Input id="hashingPower" value={hashRate ? hashRate: ''}  onChange={this.handleHashRateChange} />
            <Typography className={classes.formHashUnit}>MH/s</Typography>
          </div>
        </FormControl>
        <Typography style={{overflowWrap: 'break-word'}}>
          hashpower: {hashRate*Math.pow(10, 6)} hash/s<br/>
          difficulty: {numeral(difficulty24).format('0,0.000')} hash/s<br/>
          day: {calcMiningReward(difficulty24, hashRate*Math.pow(10, 6), 86400, block_reward)} ETH<br/>
          7days: {calcMiningReward(difficulty24, hashRate*Math.pow(10, 6), 86400*7, block_reward)} ETH<br/>
          month: {calcMiningReward(difficulty24, hashRate*Math.pow(10, 6), 86400*30, block_reward)} ETH<br/>
          year: {calcMiningReward(difficulty24, hashRate*Math.pow(10, 6), 86400*365, block_reward)} ETH<br/>
        </Typography>
      </div>
    );
  }

  handleHashRateChange = ({ target }) => {
    this.props.onChangeParams({ hashRate: target.value })
  }
}

const getNextHashRate = memoize(query => query.length < 1 ? {} : { hashRate: query });

const styles = {
  formControl: {
    
  },
  formInputWrapper: {
    display: 'flex',
    alignItems: 'stretch',
    marginTop: '16px',
  },
  formHashUnit: {
    backgroundColor: '#e0e0e0',
    lineHeight: '230%',
    padding: '0 10px',
  }
};

ETH.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapDispatchToProps = (state) => ({
})

const WithRedux = withRedux(initStore, null, mapDispatchToProps)(
  withUrlParams(ETH, { defaultParams: { hashRate: 84000000 } })
);

export default withRoot(withStyles(styles)(WithRedux));