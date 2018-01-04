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
    '@font-face': [{
      fontFamily: 'Montserrat',
      src: "url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-300.2a65096b5adc2d6576a5037412279990.woff2') format('woff2'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-300.78c02056d158917313fe5aa55bdafc6b.woff') format('woff'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-300.ee115cc31a56424292bc750cfe128468.ttf') format('ttf')",
      fontWeight: 300,
      fontStyle: 'normal'
    },{
      fontFamily: 'Montserrat',
      src: "url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-regular.36afc875707acbdf97df3a9eb9d8b9b4.woff2') format('woff2'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-regular.68e802289ab6cba961ab4cff13cdfbd4.woff') format('woff'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-regular.72ef4d4af76cb807fb997a95c46941ab.ttf') format('ttf')",
      fontWeight: 400,
      fontStyle: 'normal'
    },{
      fontFamily: 'Montserrat',
      src: "url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-500.2bfe8f29082053b668b3a785e3468c5d.woff2') format('woff2'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-500.bee4d2c6cd6deb87776e2bf37cc5a5e2.woff') format('woff'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-500.48ecec221a06a0ee1d6c1617b649e9db.ttf') format('ttf')",
      fontWeight: 500,
      fontStyle: 'normal'
    },{
      fontFamily: 'Montserrat',
      src: "url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-700.c3392445dbc646222159846fe1ac1c6b.woff2') format('woff2'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-700.bd1b5a5502d51fb98563a0dc8d4f96ad.woff') format('woff'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-700.3fc53f2be05c1591d7e6c85ec4d67ed2.ttf') format('ttf')",
      fontWeight: 700,
      fontStyle:'normal'
    },{
      fontFamily: 'Montserrat',
      src: "url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-900.3e755d6606ff279d9b4c55c81e5d2261.woff2') format('woff2'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-900.94950b452a4cbf374ffc1fde52535158.woff') format('woff'),url('https://static.iqoption.com/v5/static/fonts/montserrat-v10-latin_latin-ext-900.93be0f131a3bc0e6eb9eb853dda9a719.ttf') format('ttf')",
      fontWeight: 900,
      fontStyle: 'normal'
    }],
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
      fontFamily: 'Montserrat, Rubik, sans-serif',
      fontSize: '16px',
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
  }
});

let AppWrapper = props => (<div className={props.classes.root}>{props.children}</div>);
let MainWrapper = props => (<main className={props.classes.main}>{props.children}</main>);

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