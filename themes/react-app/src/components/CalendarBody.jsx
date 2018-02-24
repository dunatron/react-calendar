import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import Week from './Body/Week';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {fade} from 'material-ui/styles/colorManipulator';


/**
 * READ THIS
 * https://www.codementor.io/chrisharrington/building-a-calendar-using-react-js--less-css-and-font-awesome-du107z6nt
 */
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
    'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.4)',
    'letter-spacing': '3px',
    'font-size': '14px',
    'text-transform': 'uppercase',
    'color': 'rgba(255, 255, 255, 0.9)'
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
      'height': `calc(100% - 70px)`
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

    const {currentDate} = props;

    this.state = {
      currentYear: null,
      month: moment(),
      currentDate: currentDate,
      events: this.props.events
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.events
    })
  }

  renderWeeks() {
    let weeks = [],
      done = false,
      date = moment(this.state.currentDate).startOf("month").add("w" - 1).day("Sunday"),
      //date = moment(this.state.currentDate).startOf("month").day("Sunday"),
      //date = moment(this.state.currentDate).startOf('month'),
      monthIndex = date.month(),
      count = 0;

    while (!done) {

      const weeksEvents = [];

      let startWeek = moment(date).startOf('week').format();
      let endOfWeek = moment(date).endOf('week').format();

      for (let event of this.state.events) {
        let eventDate = moment(event.Date).format();
        if (moment(eventDate).isSameOrBefore(endOfWeek) && moment(eventDate).isSameOrAfter(startWeek)) {
          weeksEvents.push(event);
        }
      }

      weeks.push(<Week
        WeekNumber={count + 1}
        startWeek={startWeek}
        endWeek={endOfWeek}
        key={date.toString()} date={date.clone()} month={this.state.month} select={this.select}
        selected={this.props.selected}
        events={weeksEvents}
        eventClick={this.props.eventClick}
      />);

      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  render() {

    const {classes, currentDate, events} = this.props;

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
            {this.renderWeeks()}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(CalendarBody);