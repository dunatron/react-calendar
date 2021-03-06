import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from "react-redux";
import {compose} from "react-apollo/index";

const styles = theme => ({
  LogosWrapper: {
    display: 'flex',
    flex: '1',
    minHeight: `${theme.spec.menuDesktopHeight}px`,
    maxHeight: `${theme.spec.menuDesktopHeight}px`,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    minWidth: '100%'
  },
  Logo: {
    padding: '10px',
    height: '50px',
  },
  [theme.breakpoints.up('sm')]: {
    LogosWrapper: {
      justifyContent: 'center',
    },
  },
  [theme.breakpoints.up('md')]: {
    LogosWrapper: {
      flexWrap: 'nowrap',
      minWidth: '0',
      justifyContent: 'space-evenly',
    },
    Logo: {
      padding: '5px',
    }
  },
});

class Logos extends Component {

  componentDidMount() {

  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps) {
    //return (nextProps.happLogo !== this.props.happLogo) || (nextProps.clientLogo !== this.props.clientLogo);
    return false
  }

  render() {
    const {classes, happLogo, clientLogo} = this.props;
    return (
      <div className={classes.LogosWrapper} >
        <img src={happLogo} className={classes.Logo} alt="Happ Logo"/>
        <img src={clientLogo} className={classes.Logo} alt="City Logo"/>
      </div>
    );
  }
}

const reduxWrapper = connect(
  state => ({
    happLogo: state.settings.happLogo,
    clientLogo: state.settings.clientLogo,
  })
);

export default compose(
  reduxWrapper,
  withStyles(styles)
)(Logos);
