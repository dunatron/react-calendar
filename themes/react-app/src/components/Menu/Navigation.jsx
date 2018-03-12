import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import LeftArrow from 'material-ui-icons/KeyboardArrowLeft';
import RightArrow from 'material-ui-icons/KeyboardArrowRight';
import IconButton from 'material-ui/IconButton';
import {connect} from "react-redux";
import {compose} from "react-apollo/index";
import {nextMonth, prevMonth} from '../../actions/headerActions';

const styles = theme => ({
  LogosWrapper: {
    'display': 'flex',
    'flex': '1',
    'align-items': 'center',
    'justify-content': 'center',
    minHeight: `${theme.spec.menuDesktopHeight}px`
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
    const {classes} = this.props;

    return (
      <div className={classes.LogosWrapper}>
        <IconButton
          className={classes.ArrowButton}
          onClick={this.previousMonthClick}
        >

          <LeftArrow className={classes.ArrowIcon} />
        </IconButton>
        <h1 className={classes.CurrentMonth}>{this.props.currentMonth} {this.props.currentYear}</h1>
        <IconButton
          className={classes.ArrowButton}
          onClick={this.nextMonthClick}
        >
          <RightArrow className={classes.ArrowIcon} />
        </IconButton>

      </div>
    );
  }
}

const reduxWrapper = connect(
  state => ({
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