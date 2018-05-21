import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Logos from './Menu/Logos';
import Navigation from './Menu/Navigation';
import Actions from './Menu/Actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = theme => ({
  MainMenu: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  [theme.breakpoints.up('md')]: {
    MainMenu: {
      flexWrap: 'nowrap',
      maxHeight: `${theme.spec.menuDesktopHeight}px`
    },
  },
});

class CalendarMenu extends Component {

  render() {

    const { classes } = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName="menuAnimation"
        transitionAppear={true}
        transitionAppearTimeout={3000}
        transitionEnterTimeout={5000}
        transitionLeaveTimeout={3000}>
        <div className={classes.MainMenu}>
          <Logos />
          <Navigation />
          <Actions />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(CalendarMenu);