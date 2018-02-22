import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Logos from './Menu/Logos';
import Navigation from './Menu/Navigation';
import Actions from './Menu/Actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = theme => ({
  MainMenu: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: `${theme.spec.menuMinHeight}`
  }
});

class CalendarMenu extends Component {

  render() {

    const {classes} = this.props;

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className={classes.MainMenu}>
          <Logos/>
          <Navigation
            currentMonth={this.props.currentMonth}
            currentYear={this.props.currentYear}
            nextMonthClick={this.props.nextMonthClick}
            previousMonthClick={this.props.previousMonthClick}
          />
          <Actions/>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(CalendarMenu);