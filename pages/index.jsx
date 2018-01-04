import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import TextField from 'material-ui/TextField';
import Card from '../components/Card';
import withRoot from '../components/WithRoot';
import initStore from '../config/store'
import * as currenciesDux from '../dux/currencies/currenciesDux'

class Index extends React.PureComponent {
  static async getInitialProps({ store, ...props }){
    await store.dispatch(currenciesDux.loadCurrencies())
    const currencies = currenciesDux.currenciesSelector(store.getState())
    return { currencies }
  }

  render() {
    const { classes } = this.props;
    const { currencies } = this.state;
    return (
      <div className={classes.root}>
      <div>
      <TextField
        id="search"
        label="Find crypto"
        type="search"
        className={classes.search}
        margin="normal"
        onChange={this.handleSearch}
      />
      </div>
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

  state = {
    currencies: []
  }

  componentDidMount(){
    this.setState({ currencies: this.props.currencies })
  }

  handleSearch = ({ target }) => {
    const currencies = this.props.currencies.filter(item => 
      item.name.toLowerCase().indexOf(target.value.toLowerCase()) !== -1
    )
    this.setState({ currencies })
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    textAlign: 'center',
  },
  search: {
    width: '50%'
  }
};

const mapDispatchToProps = (state) => ({
  // currencies: currenciesDux.currenciesSelector(state)
})

const WithRedux = withRedux(initStore, null, mapDispatchToProps )(Index);
export default withRoot(withStyles(styles)(WithRedux));