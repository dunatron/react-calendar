import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import MainLogo from '../../img/logo.svg';
import ClientLogo from '../../img/webpack.svg';


const styles = {
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

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.LogosWrapper}>
        <img src={MainLogo} className="Main__Logos Happ__Logo" alt="logo"/>
        <img src={ClientLogo} className="Main__Logos Client__Logo" alt="logo"/>
      </div>
    );
  }
}

export default withStyles(styles)(Logos);