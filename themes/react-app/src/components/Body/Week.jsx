import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import DaySquare from './DaySquare';
import {fade} from 'material-ui/styles/colorManipulator';
import Button from 'material-ui/Button';

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
    weekHeader: {
      display: 'none !important'
    },
    weekDays: {
      display: 'block !important'
    }
  },
  weekHeader: {
    display: 'flex',
    justifyContent: 'center'
  },
  weekDays: {
    height: '100%',
    display: 'none'
  }
});

class Week extends Component {

  _toggleWeek = (ref) => {

    // ToDo : use refs and add and remove classes instead of changing element style
    // https://www.javascriptstuff.com/use-refs-not-ids/
    let element = document.getElementById(ref);

    let currStyle = element.style.display;

    if(currStyle === 'block'){
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }

  };

  render() {

    const {classes, events, WeekNumber} = this.props;

    let daysInMonth = moment().daysInMonth();
    let weeksInMonth = Math.ceil(((daysInMonth + 5) / 7));

    let days = [],
      date = this.props.date,
      month = this.props.month;

    for (let i = 0; i < 7; i++) {
      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        dateCompare: date.format('YYYY-MM-DD')
      };

      let DaysEvents = events.filter(function (el) {
        return day.dateCompare.includes(el.Date)
      });

      days.push(<DaySquare
        key={day.date.toString()}
        className={classes.Day + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}
        //onClick={console.log('DAY SQUARE CLICK')}
        dayNumber={day.number}
        events={DaysEvents}
        eventClick={this.props.eventClick}
      />);
      date = date.clone();
      date.add(1, "d");
    }

    return (
      <div className={classes.week} style={ {height: `calc(100% / ${weeksInMonth})`} } key={days[0].toString()}>
        <div className={classes.weekHeader}>
          <Button variant="raised" color="secondary" className={classes.button} onClick={() => this._toggleWeek(`WeeksDays-${WeekNumber}`)}>
            Expand Week {WeekNumber}
          </Button>
        </div>
        <div className={classes.weekDays} ref={`WeeksDays-${WeekNumber}`} id={`WeeksDays-${WeekNumber}`}>{days}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Week);