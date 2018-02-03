import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

class Footer extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      footer: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <footer className={this.props.classes.footer}>
        <span>© 2018 Калькулятор майнинга "Crypto Calc" </span>
      </footer>
    );
  }
}

const styles = () => ({
  footer: {
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(styles)(Footer);
