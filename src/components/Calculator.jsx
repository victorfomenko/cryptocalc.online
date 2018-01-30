import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// Components
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

// Helpers
import numeral from 'numeral';
import calcMiningReward from '../utils/math';
import { HASH_RATE_MULTIPLIER } from '../config/constants';

class Calculator extends React.PureComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    difficulty: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    blockReward: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    hashRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    power: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    powerCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    poolFee: PropTypes.number,
    hashUnit: PropTypes.oneOf(['TH', 'GH', 'MH', 'H']),
    onHashRateChange: PropTypes.func.isRequired,
    onHashUnitChange: PropTypes.func.isRequired,
    onPowerChange: PropTypes.func.isRequired,
    onPowerCostChange: PropTypes.func.isRequired,
    onPoolFeeChange: PropTypes.func,
    classes: PropTypes.shape({
      formControl: PropTypes.string.isRequired,
      formAdornment: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    hashUnit: 'MH',
    poolFee: 0,
  };

  render() {
    const {
      tag,
      price,
      difficulty,
      blockReward,
      hashRate,
      power,
      powerCost,
      hashUnit,
      classes,
      poolFee,
    } = this.props;
    const dayReward = calcMiningReward(
      difficulty,
      hashRate * HASH_RATE_MULTIPLIER[hashUnit],
      86400,
      blockReward,
      poolFee,
    );
    const cost = power * 10 ** -3 * powerCost * 24;
    const dayProfit = dayReward * price - cost;

    return (
      <Grid container>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              value={price}
              disabled
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.formAdornment}
                >
                  $
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="hashingPower">Hashing power</InputLabel>
            <Input
              id="hashingPower"
              defaultValue={hashRate}
              onChange={this.handleHashRateChange}
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.formAdornment}
                >
                  <Select
                    value={hashUnit}
                    className={classes.formAdornmentSelect}
                    onChange={this.handleHashUnitChange}
                  >
                    {Object.keys(HASH_RATE_MULTIPLIER).map(item => (
                      <MenuItem key={item} value={item}>
                        {item}/s
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="power">Power</InputLabel>
            <Input
              id="power"
              value={power}
              onChange={this.handlePowerChange}
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.formAdornment}
                >
                  W
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="powerCost">Power cost</InputLabel>
            <Input
              id="powerCost"
              value={powerCost}
              onChange={this.handlePowerCostChange}
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.formAdornment}
                >
                  $/kWh
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="poolFee">Pool fee</InputLabel>
            <Input
              id="poolFee"
              value={poolFee}
              onChange={this.handlePoolFeeChange}
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.formAdornment}
                >
                  %
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography style={{ overflowWrap: 'break-word' }}>
            hashpower: {hashRate * HASH_RATE_MULTIPLIER[hashUnit]} hash/s<br />
            difficulty: {numeral(difficulty).format('0,0.000')} hash/s<br />
            day: {numeral(dayReward).format('0.000000')} {tag}
            <br />
            7days: {numeral(dayReward * 7).format('0.000000')} {tag}
            <br />
            month: {numeral(dayReward * 30).format('0.000000')} {tag}
            <br />
            year: {numeral(dayReward * 365).format('0.000000')} {tag}
            <br />
          </Typography>
          <br />
          <Typography style={{ overflowWrap: 'break-word' }}>
            day: {numeral(dayProfit).format('$0,0.00')}
            <br />
            7days: {numeral(dayProfit * 7).format('$0,0.00')}
            <br />
            month: {numeral(dayProfit * 30).format('$0,0.00')}
            <br />
            year: {numeral(dayProfit * 365).format('$0,0.00')}
            <br />
          </Typography>
        </Grid>
      </Grid>
    );
  }

  handleHashRateChange = ({ target }) =>
    this.props.onHashRateChange(target.value);

  handlePowerChange = ({ target }) => this.props.onPowerChange(target.value);

  handlePowerCostChange = ({ target }) =>
    this.props.onPowerCostChange(target.value);

  handlePoolFeeChange = ({ target }) => {
    if (this.props.onPoolFeeChange) {
      this.props.onPoolFeeChange(target.value);
    }
  };

  handleHashUnitChange = ({ target }) =>
    this.props.onHashUnitChange(target.value);
}

const styles = {
  formControl: {
    width: '100%',
    marginBottom: '20px',
  },
  formAdornment: {
    whiteSpace: 'nowrap',
  },
  formAdornmentSelect: {
    '&:before': {
      height: '0px !important',
    },
    '&:after': {
      height: 0,
    },
  },
};

export default withStyles(styles)(Calculator);
