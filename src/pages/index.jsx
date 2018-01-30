import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import Card from '../components/Card';
import withRoot from '../components/WithRoot';
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
      <div>
        <Typography type="display1" gutterBottom>
          Майнинг-калькуляторы криптовалют
        </Typography>
        <TextField
          id="search"
          label="Введите название крипто-валюты для поиска"
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
      </div>
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
