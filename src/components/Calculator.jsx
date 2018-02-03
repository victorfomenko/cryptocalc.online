import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// Components
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
// import Typography from 'material-ui/Typography';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';

// Helpers
import numeral from 'numeral';
import calcMiningReward from '../utils/math';
import { HASH_RATE_MULTIPLIER, SECONDS_PER_DAY } from '../config/constants';

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
      SECONDS_PER_DAY,
      blockReward,
      poolFee,
    );
    const dayPowerCost = power * 10 ** -3 * powerCost * 24;
    const dayProfit = dayReward * price - dayPowerCost;
    const tableData = getTableData({ dayProfit, dayReward, dayPowerCost });

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="price">Стоимость валюты</InputLabel>
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
            <InputLabel htmlFor="hashingPower">Hash-мощность</InputLabel>
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
            <InputLabel htmlFor="power">Потребление энергии</InputLabel>
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
            <InputLabel htmlFor="powerCost">Тариф электричества</InputLabel>
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
            <InputLabel htmlFor="poolFee">Комиссия пула</InputLabel>
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
          <div className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell padding="none">Период</TableCell>
                  <TableCell numeric padding="none">
                    Прибыль ($)
                  </TableCell>
                  <TableCell numeric padding="none">
                    Майнинг ({tag})
                  </TableCell>
                  <TableCell numeric padding="none">
                    Расходы эл. ($)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(row => (
                  <TableRow key={row.periodName}>
                    <TableCell padding="none">{row.periodName}</TableCell>
                    <TableCell numeric padding="none">
                      {numeral(row.dayProfit).format('$0,0.00')}
                    </TableCell>
                    <TableCell numeric padding="none">
                      {numeral(row.dayReward).format('0.00000')}
                    </TableCell>
                    <TableCell numeric padding="none">
                      {numeral(row.dayPowerCost).format('0.00')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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

const getTableData = ({ dayProfit, dayReward, dayPowerCost }) => [
  {
    periodName: 'День',
    dayProfit,
    dayReward,
    dayPowerCost,
  },
  {
    periodName: 'Неделя',
    dayProfit: dayProfit * 7,
    dayReward: dayReward * 7,
    dayPowerCost: dayPowerCost * 7,
  },
  {
    periodName: 'Месяц',
    dayProfit: dayProfit * 30,
    dayReward: dayReward * 30,
    dayPowerCost: dayPowerCost * 30,
  },
  {
    periodName: 'Год',
    dayProfit: dayProfit * 365,
    dayReward: dayReward * 365,
    dayPowerCost: dayPowerCost * 365,
  },
];

const styles = {
  root: {
    marginTop: '40px',
  },
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
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
  },
};

export default withStyles(styles)(Calculator);
