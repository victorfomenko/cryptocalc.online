import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';

// components
import Header from './Header';
import Footer from './Footer';
import withRoot from './WithRoot';

const styles = {
  layout: {
    textAlign: 'center',
  },
};

class Layout extends Component {
  render() {
    return (
      <div className={this.props.classes.layout}>
        <Header/>
        <div>
          {this.content && this.content()}
        </div>
        <Footer/>
      </div>
    )
  }
}
Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Layout));