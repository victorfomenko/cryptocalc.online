import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles';
import numeral from 'numeral';

class Card extends React.PureComponent {
  static propTypes = {
    href: PropTypes.string,
    numbers: PropTypes.shape({
        bid: PropTypes.number.isRequired,
        ask: PropTypes.number.isRequired,
        ytd_return: PropTypes.number.isRequired,
    }).isRequired,
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
    }).isRequired,
  }

  render(){
    const { href, bg, numbers: { bid, ask, ytd_return }, btnIcon, title, type, classes } = this.props;
    const price = numeral((bid + ask)/2).format('$0,0.00');
    const priceChange = numeral(ytd_return).format('0.00');
    const isPositive = priceChange > 0;

    return (
    <Paper className={classes.card}>
      <Link href={href}>
        <a className={classes.link}>
            <div className={classes.header}>
                <div className={classes.headerBG} style={{ backgroundImage: `url(${bg})` }}>
                    <img src="https://static.iqoption.com/v5/static/images/mask.7fbee3fac85c8080dbf5c8a53fd69318.png" 
                     className={classes.headerRound}/>
                </div>
                <div className={classes.headerBTN}>
                    <div className={classes.headerBTNIcon} style={{ backgroundImage: `url(${btnIcon})` }}>
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                <Typography className={classes.title}>
                    <span>{title}</span>
                </Typography>
                <Typography className={classes.value}>
                    <span className={classes.valueCurrent}>{price}</span>
                    <span className={`${classes.valueChange} ${isPositive ? classes.valueChangePositive : classes.valueChangeNegative}`}>
                        &nbsp;{isPositive ? '+': ''}{priceChange}% <span>YTD</span>
                    </span>
                </Typography>
                {/* <div className={classes.graph}>
                    <div className={classes.graphItem}>
                        <svg width="110" height="57">
                            <path className={classes.sparkLine} d="M0,54.726097431774406L1.1,54.74553898554099L2.2,55L3.3,54.40200288611047L4.4,54.46851972755197L5.5,54.14878671690205L6.6,53.53976448459828L7.700000000000001,52.861644187612825L8.8,52.81348881361754L9.9,52.72457391093931L11,50.9673009275262L12.1,49.843818935594065L13.2,49.54254350176633L14.3,50.308576417937815L15.400000000000002,49.48662157486571L16.5,49.82962220777299L17.6,50.94920032838618L18.700000000000003,49.84059240654382L19.8,49.66731177831636L20.9,48.07484349149802L22,48.47541364060818L23.099999999999998,48.55812262358126L24.2,48.815256394019485L25.3,49.9298185205347L26.4,50.000893692379094L27.5,48.754396275849054L28.6,49.36816448067069L29.700000000000003,49.52478615039761L30.800000000000004,48.80741203828598L31.9,47.82586528810595L33,47.8343549496495L34.1,46.99918735570072L35.2,45.215131892852106L36.300000000000004,43.815513933862434L37.400000000000006,44.22980941718775L38.5,43.40730995431851L39.6,43.11328391342068L40.7,44.66942285612434L41.8,44.42676498836119L42.9,43.2236723966716L44,44.07712823187539L45.099999999999994,45.34276514413328L46.199999999999996,46.80367800180369L47.3,47.417578929096905L48.4,46.96678476608975L49.5,46.346421627422146L50.6,45.17760346985635L51.699999999999996,43.61638446013741L52.8,41.511401484394746L53.9,42.56799592729239L55,41.915454454224395L56.1,41.0691839390332L57.2,40.31490840318807L58.300000000000004,40.32558569719406L59.400000000000006,40.41277978437882L60.50000000000001,40.49509059993719L61.60000000000001,40.315059432207434L62.699999999999996,39.18436923707795L63.8,37.83456339465971L64.89999999999999,35.42095032950954L66,34.63030883645413L67.1,32.40314338403859L68.2,33.50775590182299L69.3,34.55566846442514L70.4,30.35545990291871L71.5,30.40534524568136L72.60000000000001,29.17056859638206L73.7,29.319766960974935L74.80000000000001,27.585221556659015L75.89999999999999,24.119792057587738L77,17.22646148244094L78.1,15.743631110413617L79.2,15.887795174360718L80.3,20.951386296617002L81.4,10.676836342291836L82.5,9.879128521784537L83.6,10.258989388692783L84.7,11.241593342008422L85.8,8.531766603497978L86.9,6.064501623374731L88,0L89.10000000000001,0.5029724008821077L90.19999999999999,2.3345425085529L91.3,5.195398266436499L92.39999999999999,8.36334636371216L93.5,12.107493053081164L94.6,21.7843342216447L95.7,18.353229499703687L96.8,23.718420997011208L97.9,21.987536902255847L99,16.28047062473091L100.10000000000001,12.725796705120956L101.2,16.533100984409643L102.30000000000001,19.07954178378003L103.39999999999999,17.574743554389336L104.5,23.912928067416026L105.6,20.250254669043407L106.7,21.93332206093784L107.8,20.12250700183848L108.9,15.685530704324457L110,16.895108390573192"></path>
                            <path className={classes.sparkArea} d="M0,54.726097431774406L1.1,54.74553898554099L2.2,55L3.3,54.40200288611047L4.4,54.46851972755197L5.5,54.14878671690205L6.6,53.53976448459828L7.700000000000001,52.861644187612825L8.8,52.81348881361754L9.9,52.72457391093931L11,50.9673009275262L12.1,49.843818935594065L13.2,49.54254350176633L14.3,50.308576417937815L15.400000000000002,49.48662157486571L16.5,49.82962220777299L17.6,50.94920032838618L18.700000000000003,49.84059240654382L19.8,49.66731177831636L20.9,48.07484349149802L22,48.47541364060818L23.099999999999998,48.55812262358126L24.2,48.815256394019485L25.3,49.9298185205347L26.4,50.000893692379094L27.5,48.754396275849054L28.6,49.36816448067069L29.700000000000003,49.52478615039761L30.800000000000004,48.80741203828598L31.9,47.82586528810595L33,47.8343549496495L34.1,46.99918735570072L35.2,45.215131892852106L36.300000000000004,43.815513933862434L37.400000000000006,44.22980941718775L38.5,43.40730995431851L39.6,43.11328391342068L40.7,44.66942285612434L41.8,44.42676498836119L42.9,43.2236723966716L44,44.07712823187539L45.099999999999994,45.34276514413328L46.199999999999996,46.80367800180369L47.3,47.417578929096905L48.4,46.96678476608975L49.5,46.346421627422146L50.6,45.17760346985635L51.699999999999996,43.61638446013741L52.8,41.511401484394746L53.9,42.56799592729239L55,41.915454454224395L56.1,41.0691839390332L57.2,40.31490840318807L58.300000000000004,40.32558569719406L59.400000000000006,40.41277978437882L60.50000000000001,40.49509059993719L61.60000000000001,40.315059432207434L62.699999999999996,39.18436923707795L63.8,37.83456339465971L64.89999999999999,35.42095032950954L66,34.63030883645413L67.1,32.40314338403859L68.2,33.50775590182299L69.3,34.55566846442514L70.4,30.35545990291871L71.5,30.40534524568136L72.60000000000001,29.17056859638206L73.7,29.319766960974935L74.80000000000001,27.585221556659015L75.89999999999999,24.119792057587738L77,17.22646148244094L78.1,15.743631110413617L79.2,15.887795174360718L80.3,20.951386296617002L81.4,10.676836342291836L82.5,9.879128521784537L83.6,10.258989388692783L84.7,11.241593342008422L85.8,8.531766603497978L86.9,6.064501623374731L88,0L89.10000000000001,0.5029724008821077L90.19999999999999,2.3345425085529L91.3,5.195398266436499L92.39999999999999,8.36334636371216L93.5,12.107493053081164L94.6,21.7843342216447L95.7,18.353229499703687L96.8,23.718420997011208L97.9,21.987536902255847L99,16.28047062473091L100.10000000000001,12.725796705120956L101.2,16.533100984409643L102.30000000000001,19.07954178378003L103.39999999999999,17.574743554389336L104.5,23.912928067416026L105.6,20.250254669043407L106.7,21.93332206093784L107.8,20.12250700183848L108.9,15.685530704324457L110,16.895108390573192L110,55L108.9,55L107.8,55L106.7,55L105.6,55L104.5,55L103.39999999999999,55L102.30000000000001,55L101.2,55L100.10000000000001,55L99,55L97.9,55L96.8,55L95.7,55L94.6,55L93.5,55L92.39999999999999,55L91.3,55L90.19999999999999,55L89.10000000000001,55L88,55L86.9,55L85.8,55L84.7,55L83.6,55L82.5,55L81.4,55L80.3,55L79.2,55L78.1,55L77,55L75.89999999999999,55L74.80000000000001,55L73.7,55L72.60000000000001,55L71.5,55L70.4,55L69.3,55L68.2,55L67.1,55L66,55L64.89999999999999,55L63.8,55L62.699999999999996,55L61.60000000000001,55L60.50000000000001,55L59.400000000000006,55L58.300000000000004,55L57.2,55L56.1,55L55,55L53.9,55L52.8,55L51.699999999999996,55L50.6,55L49.5,55L48.4,55L47.3,55L46.199999999999996,55L45.099999999999994,55L44,55L42.9,55L41.8,55L40.7,55L39.6,55L38.5,55L37.400000000000006,55L36.300000000000004,55L35.2,55L34.1,55L33,55L31.9,55L30.800000000000004,55L29.700000000000003,55L28.6,55L27.5,55L26.4,55L25.3,55L24.2,55L23.099999999999998,55L22,55L20.9,55L19.8,55L18.700000000000003,55L17.6,55L16.5,55L15.400000000000002,55L14.3,55L13.2,55L12.1,55L11,55L9.9,55L8.8,55L7.700000000000001,55L6.6,55L5.5,55L4.4,55L3.3,55L2.2,55L1.1,55L0,55Z"></path>
                            <defs>
                                <linearGradient id="slPositiveGradient" gradientUnits="userSpaceOnUse" x2="0" y2="100%">
                                    <stop offset="0%" stopColor="rgb(53, 169, 71)" style={{ stopOpacity: 0.15 }}></stop>
                                    <stop offset="100%" stopColor="rgb(255, 255, 255)" style={{ stopOpacity: 0.1 }}></stop>
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="slNegativeGradient" gradientUnits="userSpaceOnUse" x2="0" y2="100%">
                                    <stop offset="0%" stopColor="rgb(227, 72, 40)" style={{ stopOpacity: 0.15 }}></stop>
                                    <stop offset="100%" stopColor="rgb(255, 255, 255)" style={{ stopOpacity: 0.1 }}></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className={classes.graphChange}>
                        <div className={classes.graphChangeValue}>+232%</div>
                        <div className={classes.graphChangePeriod}><span>Изм. за 3 мес.</span></div>
                    </div>
                </div> */}
            </div>
        </a>
      </Link>
    </Paper>
    );
  }
}

const styles = (theme, ...args) => ({
  card: {
    display: 'inline-block',
    width: '240px',
    position: 'relative',
    boxShadow: '0 0 16px 1px rgba(0,0,0,.05)',
    color: theme.palette.text.primary,
    cursor: 'pointer',
    transition: 'box-shadow .3s ease,-webkit-box-shadow .3s ease',
    '&:hover': {
        boxShadow: '0 0 24px 1px rgba(0,0,0,.15)',
    }
  },
  link: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  header: {
    position: 'relative',
    height: '100px',
    marginBottom: '40px'
  },
  headerBG: {
    height: '100%',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  headerRound: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-1px',
    width: '100%',
  },
  headerBTN: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    position: 'absolute',
    height: '56px',
    top: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    border: 'none',
    background: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    padding: '0 0 0 30px',
    cursor: 'pointer',
  },
  headerBTNIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '56px',
    height: '56px',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    borderRadius: '50%',
    boxShadow: '0 0 16px 1px rgba(0,0,0,.05)',
    transform: 'translateX(-50%) translateY(-50%)',
    transition: 'transform .4s ease,left .4s ease,-webkit-transform .4s ease',
    zIndex: 1,
  },
  footer: {
    display: 'flex',
    height: '80px',
    flexDirection: 'column',
    padding: '0 20px 20px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '16px',
    lineHeight: '1.5',
    fontWeight: '500',
    textAlign: 'center'
  },
  value: {
    fontSize: '12px',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: '4px',
  },
  valueCurrent: {
    display: 'inline-block',
    marginRight: '2px',
  },
  valueChange: {
    display: 'inline-block'
  },
  valueChangePositive: {
      color: '#35a947',
  },
  valueChangeNegative: {
      color: '#e34828',
  },
  graph: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  graphItem: {
    width: '118px',
  },
  graphChange: {
    textAlign: 'right',
    width: '80px',
  },
  graphChangeValue: {
    fontWeight: '500',
    color: '#35a947',
  },
  graphChangePeriod: {
    fontSize: '10px',
    color: '#9b9b9b',
  },
  sparkLine: {
    fill: 'none',
    strokeWidth: '1px',
    stroke: '#35a947',
  },
  sparkArea: {
      fill: 'url("#slPositiveGradient")',
  }
});

export default withStyles(styles)(Card);