import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import MainLogo from '../../img/logo.svg';

const styles = theme => ({
  HappLogo: {
    height: '60px',
    minWidth: '180px'
  },
  LogosWrapper: {
    display: 'flex',
    flex: '1',
    minHeight: '70px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minWidth: '100%'
  },
  Logo: {
    padding: '10px',
    height: '60px',
    animation: 'App-logo-spin infinite 20s linear',
  },
  [theme.breakpoints.up('md')]: {
    LogosWrapper: {
      flexWrap: 'nowrap',
      minWidth: '0'
    },
  },
});

class Logos extends Component {

  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.LogosWrapper}>
        <img src={MainLogo} className={classes.Logo} alt="City Logo"/>
      </div>
    );
  }
}

export default withStyles(styles)(Logos);