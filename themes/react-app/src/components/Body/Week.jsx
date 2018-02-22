import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
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
      'padding': '15px 0'
    }
  },

  weekHeader: {

  },
  weekDays: {
    height: '100%'
  }
});

class Week extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // events: []
      events: this.props.events
    };

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.events
    })
  }

  render() {

    const {classes} = this.props;

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
        date: date
      };
      //days.push(<span key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}>{day.number}{this.state.events.toString()}</span>)
      days.push(<DaySquare key={day.date.toString()}
                           className={classes.Day + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}
                           //onClick={console.log('DAY SQUARE CLICK')}
                           dayNumber={day.number}
                           events={this.state.events}
                           eventClick={this.props.eventClick}
      />);
      date = date.clone();
      date.add(1, "d");

    }

    return (
      <div className={classes.week} style={ {height: `calc(100% / ${weeksInMonth})`} } key={days[0].toString()}>
        <div className={classes.weekHeader}></div>
        <div className={classes.weekDays}>{days}</div>
      </div>
    );
  }
}

export default withStyles(styles)(Week);