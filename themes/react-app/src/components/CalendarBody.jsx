import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import Week from './Body/Week';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {fade} from 'material-ui/styles/colorManipulator';
import EventsLoader from './Body/EventsLoader';

const styles = theme => ({
  CalendarBodyWrapper: {
    'height': 'auto',
    'border': 'none',
    'font-family': 'GustanLight',
    'display': 'block',
    'flex-wrap': 'wrap',
  },
  DaysWrapper: {
    'display': 'none',
  },
  DayName: {
    'flex': '1',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    // 'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.4)',
    'letter-spacing': '3px',
    'font-size': '14px',
    'text-transform': 'uppercase',
    'color': theme.palette.primary.contrastText
  },
  SquaresWrapper: {
    'width': '100%',
    'height': `calc(100% - ${theme.spec.dayNameHeight}px)`,
    'padding': '4%',
    'box-sizing': 'border-box'
  },
  [theme.breakpoints.up('md')]: {
    CalendarBodyWrapper: {
      'display': 'flex',
      'height': `calc(100% - ${theme.spec.menuDesktopHeight}px)`
    },
    DaysWrapper: {
      'display': 'flex',
      'width': '100%',
      'height': `${theme.spec.dayNameHeight}px`,
      //background: rgba(255, 255, 255, 0.2);
      'background': fade(theme.palette.primary.main, 0.8),
      // ${theme.palette.primary.main}
      'box-shadow': `inset 0 1px 0 ${fade(theme.palette.primary.main, 0.8)}`
    },
    SquaresWrapper: {
      'padding': 0,
    }
  },


});

class CalendarBody extends Component {

  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
    };

  }

  // shouldComponentUpdate(nextProps) {
  //   return (nextProps.currentDate !== this.props.currentDate);
  // }

/**
 *
 * ToDo: change currentDate to be monthYear.
 * dayMonthYear will not always have the same day
 * */
  renderWeeks(currentDate) {
    let weeks = [],
      done = false,
      // date = moment(currentDate).startOf("month").add("w" - 1).day("Sunday"),
      // date = moment(currentDate).startOf("month").add(-1, "w").day("Sunday"),
      date = moment(currentDate).startOf("month").day("Sunday"),
      monthIndex = date.month(),
      count = 0;

    while (!done) {

      const weeksEvents = [];

      let startWeek = moment(date).startOf('week').format();
      let endOfWeek = moment(date).endOf('week').format();

      weeks.push(<Week
        WeekNumber={count + 1}
        startWeek={startWeek}
        endWeek={endOfWeek}
        key={date.toString()} date={date.clone()} month={this.state.month} select={this.select}
        selected={this.props.selected}
        eventClick={this.props.eventClick}
      />);

      //date.add(1, "w");
      Object.assign({}, date,  date.add(1, "w"));
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  render() {

    const {classes, currentDate} = this.props;

    const WEEKS = this.renderWeeks(currentDate);

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500 }>
        <div className={classes.CalendarBodyWrapper}>
          <div className={classes.DaysWrapper}>
            <span className={classes.DayName}>Sunday</span>
            <span className={classes.DayName}>Monday</span>
            <span className={classes.DayName}>Tuesday</span>
            <span className={classes.DayName}>Wednesday</span>
            <span className={classes.DayName}>Thursday</span>
            <span className={classes.DayName}>Friday</span>
            <span className={classes.DayName}>Saturday</span>
          </div>
          <div className={classes.SquaresWrapper}>
            {/* LOADING EVENTS OVERLAY*/}
            <EventsLoader loadingText={"updating events"} size={40} fontSize={30} />
            {WEEKS}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(CalendarBody);