import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

class Footer extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      footer: PropTypes.string.isRequired,
    }).isRequired,
  }

  render(){

    return (
      <footer className={this.props.classes.footer}>
        <span>© 2018 Crypto calculator</span>
      </footer>
    );
  }
}

const styles = theme => ({
  footer: {
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(styles)(Footer);