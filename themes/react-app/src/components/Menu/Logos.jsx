import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import MainLogo from '../../img/logo.svg';
import HappLogoAnimation from '../../HappSVGLogo';
// svg.js
import 'svg.js'

const styles = {
  HappLogo: {
    height: '60px',
    minWidth: '180px'
  },
  LogosWrapper: {
    'display': 'flex',
    'flex': '1',
    'min-height': '70px',
    'align-items': 'center',
    'justify-content': 'center'
  },
  Logo: {
    'padding': '10px',
    'height': '80px',
    'animation': 'App-logo-spin infinite 20s linear',
  }
};

class Logos extends Component {

  componentDidMount() {
    HappLogoAnimation();
  }

  componentWillMount() {

  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.LogosWrapper}>
        <div id="happSVGLogo" className={classes.HappLogo}></div>
        <img src={MainLogo} className="Main__Logos Happ__Logo" alt="City Logo"/>
      </div>
    );
  }
}

export default withStyles(styles)(Logos);