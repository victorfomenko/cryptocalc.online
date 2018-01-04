import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import Card from '../components/Card';
import withRoot from '../components/WithRoot';
import initStore from '../config/store'
import * as currenciesDux from '../dux/currencies/currenciesDux'

const styles = {
  root: {
    textAlign: 'center',
  },
};

class Index extends React.PureComponent {
  static async getInitialProps({ store, ...props }){
    await store.dispatch(currenciesDux.loadCurrencies())
    const currencies = currenciesDux.currenciesSelector(store.getState())
    return { currencies }
  }

  render() {
    const { classes, currencies } = this.props;
    return (
      <div className={classes.root}>
      {currencies.map( (currency) => {
        return (
          <Card key={currency.ticker}
              href={`crypto/${currency.ticker.toLowerCase()}`}
              title={currency.name}
              numbers={currency.key_numbers}
              bg={currency.media.filter(item => item.type === 'site_background')[0].url}
              btnIcon={currency.background}
        />)
      })}
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
  // currencies: currenciesDux.currenciesSelector(state)
})

const WithRedux = withRedux(initStore, null, mapDispatchToProps )(Index);
export default withRoot(withStyles(styles)(WithRedux));