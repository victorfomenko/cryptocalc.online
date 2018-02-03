import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withStyles from 'material-ui/styles/withStyles';

// Components
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Card from '../components/Card';
import Layout from '../components/Layout';
import withRoot from '../components/WithRoot';

// Helpers
import initStore from '../config/store';
import * as coinsDux from '../dux/coins/coinsDux';

class Index extends React.PureComponent {
  static async getInitialProps({ store, req, isServer }) {
    if (isServer) {
      await store.dispatch(coinsDux.loadCurrencies(req));
      const currencies = coinsDux.currenciesSelector(store.getState());
      return { currencies };
    }
    return {};
  }

  static propTypes = {
    loadCurrencies: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.object.isRequired),
    classes: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { classes } = this.props;
    const { currencies } = this.state;
    return (
      <Layout
        title="Калькулятор майнинга «Crypto Calc»"
        keywords="BTC, ETH, ZEC, DASH, BTG, ETC, LTC, BCH, mining, crypto, calculate, currencies, rates, калькулятор, майнинг, рассчет, рассчёт, доходность, криптовалюты, курсы, биткоин, эфир"
        description="Расчет доходности майнинга в 2018, калькулятор майнинга. Стоимость криптовалют: BTC, ETH, ZEC, DASH, BTG, ETC, LTC, BCH"
      >
        <Typography type="display1" gutterBottom>
          Майнинг-калькуляторы криптовалют
        </Typography>
        <TextField
          id="search"
          label="Название крипто-валюты"
          type="search"
          className={classes.search}
          margin="normal"
          onChange={this.handleSearch}
        />
        <Grid container spacing={40}>
          {currencies.map(currency => (
            <Grid key={currency.ticker} item>
              <Card
                href={`/calculators/${currency.ticker.toLowerCase()}`}
                title={currency.name}
                numbers={currency.key_numbers}
                bg={
                  currency.media.filter(
                    item => item.type === 'site_background',
                  )[0].url
                }
                btnIcon={currency.background}
              />
            </Grid>
          ))}
        </Grid>
      </Layout>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      currencies: props.currencies || [],
    };
  }

  componentDidMount() {
    this.props.loadCurrencies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencies) {
      this.setState({ currencies: nextProps.currencies });
    }
  }

  handleSearch = ({ target }) => {
    const currencies = this.props.currencies.filter(
      item =>
        item.name.toLowerCase().indexOf(target.value.toLowerCase()) !== -1,
    );
    this.setState({ currencies });
  };
}

const styles = {
  search: {
    width: '520px',
    marginBottom: '30px',
    '@media (max-width: 628px)': {
      width: '240px',
    },
  },
};

const mapDispatchToProps = {
  loadCurrencies: coinsDux.loadCurrencies,
};

const mapStateToProps = state => ({
  currencies: coinsDux.currenciesSelector(state),
});

const WithRedux = withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Index,
);
export default withRoot(withStyles(styles)(WithRedux));
