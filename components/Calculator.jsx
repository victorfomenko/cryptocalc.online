import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// Components
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid';

// Helpers
import numeral from 'numeral';
import { calcMiningReward } from '../utils/math';

class Calculator extends React.PureComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    difficulty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    blockReward: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    hashRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    power: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    powerCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onHashRateChange: PropTypes.func.isRequired,
    onPowerChange: PropTypes.func.isRequired,
    onPowerCostChange: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      formControl: PropTypes.string.isRequired,
      formAdornment: PropTypes.string.isRequired,
    }).isRequired,
  }

  render(){
    const { tag, price, difficulty, blockReward, hashRate, power, powerCost, classes } = this.props;

    const dayReward = calcMiningReward(difficulty, hashRate*Math.pow(10, 6), 86400, blockReward);
    const cost = power*Math.pow(10, -3)*powerCost * 24;
    const dayProfit = (dayReward*price)-cost;

    return (
      <div>
        <Typography type="display1" gutterBottom>{tag}erium майнинг-калькулятор</Typography>
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
              day: {numeral(dayReward).format('0.000000')} {tag}<br/>
              7days: {numeral(dayReward*7).format('0.000000')} {tag}<br/>
              month: {numeral(dayReward*30).format('0.000000')} {tag}<br/>
              year: {numeral(dayReward*365).format('0.000000')} {tag}<br/>
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

  handleHashRateChange = ({ target }) =>  this.props.onHashRateChange(target.value);
  handlePowerChange = ({ target }) =>  this.props.onPowerChange(target.value);
  handlePowerCostChange = ({ target }) =>  this.props.onPowerCostChange(target.value);
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

export default withStyles(styles)(Calculator);