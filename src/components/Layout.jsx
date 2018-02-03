import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withStyles } from 'material-ui/styles';

// Components
import Grid from 'material-ui/Grid';
import Header from './Header';
import Footer from './Footer';

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
    'body div[data-reactroot]': {
      height: '100%',
      minHeight: '100%',
    },
  },
  root: {
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    // eslint-disable-next-line no-dupe-keys
    minHeight: '100vh',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    flexGrow: 1,
    overflowX: 'hidden',
  },
  container: {
    margin: '50px auto 50px auto',
  },
});

class Layout extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { classes, children, title, description, keywords } = this.props;
    return (
      <div className={classes.root}>
        <Head>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
          {keywords && <meta name="keywords" content={keywords} />}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link rel="shortcut icon" href="/static/favicon.ico?v=1" />
          <meta name="author" content="Victor Fomenko" />
          {/* Yandex.Metrika counter */}
          {typeof window !== 'undefined' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter47486365 = new Ya.Metrika2({ id:47486365, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks2");`,
              }}
            />
          )}
          {typeof window !== 'undefined' && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<div><img src="https://mc.yandex.ru/watch/47486365" style="position:absolute; left:-9999px;" alt="" /></div>`,
              }}
            />
          )}
          {/* Yandex.Metrika counter */}
        </Head>
        <Header />
        <main className={classes.main}>
          <Grid container>
            <Grid item xs={10} className={classes.container}>
              {children}
            </Grid>
          </Grid>
        </main>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
