import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import { withRouter } from 'next/router';
import withStyles from 'material-ui/styles/withStyles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import withRoot from '../../components/WithRoot';
import initStore from '../../config/store'
import numeral from 'numeral';
import memoize from 'lodash/memoize';
import * as coinDux from '../../dux/coin/coinDux'

// Components
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import withUrlParams from '../../components/utils/withUrlParams';

// Helpers
import { calcMiningReward } from '../../utils/math';

class ETH extends React.PureComponent {
  static propTypes = {
    onChangeParams: PropTypes.func.isRequired,
    coin: PropTypes.shape({
      mid: PropTypes.number.isRequired,
      difficulty24: PropTypes.number.isRequired,
      block_reward: PropTypes.number.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      hashRate: PropTypes.number.isRequired,
    })
  };

  static async getInitialProps({ store, req }){
    await store.dispatch(coinDux.loadCoin(req, 151))
    const coin = coinDux.coinSelector(store.getState())
    return { coin }
  };

  render() {
    const { 
      coin: { 
        mid: price,
        difficulty24, 
        block_reward 
      } , 
      params: { 
        hashRate=84, 
        power=0, 
        powerCost=0 
      }, 
      classes 
    } = this.props;
    const dayReward = calcMiningReward(difficulty24, hashRate*Math.pow(10, 6), 86400, block_reward);
    const cost = power*Math.pow(10, -3)*powerCost * 24;
    const dayProfit = (dayReward*price)-cost;
    
    return (
      <div>
        <Typography type="display1" gutterBottom>Etherium майнинг-калькулятор</Typography>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input 
                id="price" 
                value={price}
                disabled
                endAdornment={<InputAdornment position="end" className={classes.formAdornment}>$</InputAdornment>}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="hashingPower">Hashing power</InputLabel>
              <Input 
                id="hashingPower" 
                value={hashRate} 
                onChange={this.handleHashRateChange} 
                endAdornment={<InputAdornment position="end" className={classes.formAdornment}>MH/s</InputAdornment>}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="power">Power</InputLabel>
              <Input 
                id="power" 
                value={power} 
                onChange={this.handlePowerChange} 
                endAdornment={<InputAdornment position="end" className={classes.formAdornment}>W</InputAdornment>}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="powerCost">Power cost</InputLabel>
              <Input 
                id="powerCost" 
                value={powerCost} 
                onChange={this.handlePowerCostChange} 
                endAdornment={<InputAdornment position="end" className={classes.formAdornment}>$/kWh</InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography style={{overflowWrap: 'break-word'}}>
              {/* hashpower: {hashRate*Math.pow(10, 6)} hash/s<br/>
              difficulty: {numeral(difficulty24).format('0,0.000')} hash/s<br/> */}
              day: {numeral(dayReward).format('0.000000')} ETH<br/>
              7days: {numeral(dayReward*7).format('0.000000')} ETH<br/>
              month: {numeral(dayReward*30).format('0.000000')} ETH<br/>
              year: {numeral(dayReward*365).format('0.000000')} ETH<br/>
            </Typography>
            <br/>
            <Typography style={{overflowWrap: 'break-word'}}>
              day: {numeral(dayProfit).format('$0,0.00')}<br/>
              7days: {numeral(dayProfit*7).format('$0,0.00')}<br/>
              month: {numeral(dayProfit*30).format('$0,0.00')}<br/>
              year: {numeral(dayProfit*365).format('$0,0.00')}<br/>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  handleHashRateChange = ({ target }) => {
    this.props.onChangeParams({ 
      ...this.props.params, 
      hashRate: target.value
    })
  }

  handlePowerChange = ({ target }) => {
    this.props.onChangeParams({ 
      ...this.props.params,
      power: target.value,
    })
  }
  handlePowerCostChange = ({ target }) => {
    this.props.onChangeParams({ 
      ...this.props.params,
      powerCost: target.value,
    })
  }
}
const styles = {
  formControl: {
    width: '100%',
    marginBottom: '20px'
  },
  formAdornment:{
    whiteSpace: 'nowrap'
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