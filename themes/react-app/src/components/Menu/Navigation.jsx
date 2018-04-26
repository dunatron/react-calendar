import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import LeftArrow from 'material-ui-icons/KeyboardArrowLeft';
import RightArrow from 'material-ui-icons/KeyboardArrowRight';
import IconButton from 'material-ui/IconButton';
import {connect} from "react-redux";
import {compose} from "react-apollo/index";
import {nextMonth, prevMonth} from '../../actions/headerActions';

const styles = theme => ({
  NavWrapper: {
    'display': 'flex',
    'flex': '1',
    'align-items': 'center',
    'justify-content': 'center',
    minHeight: `${theme.spec.menuDesktopHeight}px`
  },
  FixedNavWrapper: {
    position: "fixed",
    top: 0,
    left: '48px',
    width: `calc(100% - 48px)`,
    backgroundColor: theme.palette.primary.contrastText,
    minHeight: 'unset',
    zIndex: 800
  },
  fixedColor: {
    color: theme.palette.primary.main
  },
  Arrow: {
    'height': '30px'
  },
  iconStyles: {
    'marginRight': '24px',
  },
  CurrentMonth: {
    'padding': '0 10px',
    'font-size': '24px',
    textAlign: 'center'
  },
  ArrowButton: {
    'width': '48px',
    'height': '48px',
    'padding': '2px',
    color: theme.palette.secondary.main
  },
  ArrowIcon: {
    'font-size': '36px',
    color: theme.palette.secondary.main
  }
});

class Navigation extends Component {

  nextMonthClick = (e) => {
    e.preventDefault();
    this.props.nextMonth();
  };

  previousMonthClick = async (e) => {
    e.preventDefault();
    this.props.prevMonth();
  };

  render() {
    const {classes, actionsBarIsFixed} = this.props;

    return (
      <div className={actionsBarIsFixed ? `${classes.NavWrapper} ${classes.FixedNavWrapper}` : classes.NavWrapper}>
        <IconButton
          className={classes.ArrowButton}
          onClick={this.previousMonthClick}
          color="secondary"
        >

          <LeftArrow className={classes.ArrowIcon}/>
        </IconButton>
        <h1 className={actionsBarIsFixed ? `${classes.CurrentMonth} ${classes.fixedColor}` : classes.CurrentMonth}>
          {this.props.currentMonth} {this.props.currentYear}
        </h1>
        <IconButton
          className={classes.ArrowButton}
          onClick={this.nextMonthClick}
          color="secondary"
        >
          <RightArrow className={classes.ArrowIcon}/>
        </IconButton>

      </div>
    );
  }
}

const reduxWrapper = connect(
  state => ({
    actionsBarIsFixed: state.settings.actionsBarIsFixed,
    currentMonth: state.header.currentMonth,
    currentYear: state.header.currentYear
  }),
  dispatch => ({
    nextMonth: () => dispatch(nextMonth()),
    prevMonth: () => dispatch(prevMonth()),
  })
);

export default compose(
  reduxWrapper,
  withStyles(styles)
)(Navigation);