/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';

// components
import Header from './Header';
import Footer from './Footer';
import getContext from '../styles/getContext';

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      height: '100%',
      minHeight: '100%',
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
      height: '100%',
      minHeight: '100%',
    },
    'body > div:first-child': {
      height: '100%',
      minHeight: '100%',
    },
    'body #__next': {
      height: '100%',
      minHeight: '100%',
    },
    'body div[data-reactroot]' : {
      height: '100%',
      minHeight: '100%'
    },
  },
  root: {
    height: '100%',
    minHeight: '100%',
  }
});

let AppWrapper = props => (<div className={props.classes.root}>{props.children}</div>);

AppWrapper = withStyles(styles)(AppWrapper);

function withRoot(BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppWrapper>
            <Header/>
            <BaseComponent {...this.props} />
            <Footer/>
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
}

export default withRoot;