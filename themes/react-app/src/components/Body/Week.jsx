import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import DaySquare from './DaySquare';
import {fade} from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  week: {
    'height': 'auto',
    'width': '100%',
    'border': 'none',
    'min-height': '50px'
  },
  Day: {
    'display': 'block',
    'position': 'relative',
    'height': 'auto'
  },
  [theme.breakpoints.up('md')]: {
    week: {
      'border': 'none',
      'box-shadow': `inset 0 -1px 0 ${fade(theme.palette.primary.main, 0.8)}`,
      '&:last-child': {
        'box-shadow': 'none',
      }
    },
    Day: {
      'display': 'inline-block',
      'box-sizing': 'border-box',
      'box-shadow': `-1px 0 0 ${fade(theme.palette.primary.main, 0.8)}`,
      'height': '100%',
      overflowX: ' hidden',
      overflowY: 'hidden',
      'width': 'calc(100% / 7)',
      'border': 'none',
      //'padding': '15px 0'
    },
  },
  weekHeader: {
    display: 'flex',
    justifyContent: 'center'
  },
  weekDays: {
    height: '100%',
  }
});

class Week extends Component {

  render() {

    const {classes, events, WeekNumber, date, month} = this.props;

    let daysInMonth = month.daysInMonth();
    let weeksInMonth = Math.ceil((daysInMonth / 7));

    let days = [];

    for (let i = 0; i < 7; i++) {
      let day = {
        prettyDate: date.format("dddd Do MMMM"),
        number: date.format("D"),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        dateCompare: date.format('YYYY-MM-DD')
      };

      let DaysEvents = events.filter((el) => {
        return day.dateCompare.includes(el.Date)
      });

      days.push(<DaySquare
        key={i}
        className={classes.Day + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}
        dayNumber={day.number}
        prettyDate={day.prettyDate}
        isToday={day.isToday}
        events={DaysEvents}
        eventClick={this.props.eventClick}
      />);
      Object.assign({}, date, date.add(1, "d"));
    }

    return (
      <div className={classes.week} style={ {height: `calc(100% / ${weeksInMonth})`} } key={days[0].toString()}>
        <div className={classes.weekDays} ref={`WeeksDays-${WeekNumber}`} id={`WeeksDays-${WeekNumber}`}>{days}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Week);