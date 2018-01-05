/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';

// components
import Grid from 'material-ui/Grid';
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
      minHeight: '100%',
    },
  },
  root: {
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    flexGrow: 1,
    padding: '20px',
  },
  container: {
    margin: '30px auto 50px auto',
  },
});

let AppWrapper = props => (<div className={props.classes.root}>{props.children}</div>);
let MainWrapper = props => (
  <main className={props.classes.main}>
    <Grid container>
      <Grid item xs={10} className={props.classes.container}>
        {props.children}
      </Grid>
    </Grid>
  </main>
);

AppWrapper = withStyles(styles)(AppWrapper);
MainWrapper = withStyles(styles)(MainWrapper);

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
            <MainWrapper>
              <BaseComponent {...this.props} />
            </MainWrapper>
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