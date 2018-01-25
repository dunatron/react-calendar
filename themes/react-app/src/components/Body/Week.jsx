import React, {Component} from 'react';
import {gql} from 'react-apollo';
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import DaySquare from './DaySquare';


const styles = {
  LogosWrapper: {
    'display': 'flex',
    'flex': '1',
    'min-height': '70px',
    'align-items': 'center',
    'justify-content': 'center'

  },
  Logo: {
    'padding': '10px',
    'height': '80px',
    'animation': 'App-logo-spin infinite 20s linear',
  }
};

class Week extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: []
    };

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: nextProps.events
    })
  }

  // getNumWeeksForMonth(year,month){
  //   date = new Date(year,month-1,1);
  //   day = date.getDay();
  //   numDaysInMonth = new Date(year, month, 0).getDate();
  //   return Math.ceil((numDaysInMonth + day) / 7);
  // }

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
                           className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}
                           //onClick={console.log('DAY SQUARE CLICK')}
                           dayNumber={day.number}
                           events={this.state.events}
                           eventClick={this.props.eventClick}
      />)
      date = date.clone();
      date.add(1, "d");

    }

    return (
      <div className="week" style={ {height: `calc(100% / ${weeksInMonth})`} } key={days[0].toString()}>
        {days}
      </div>
    );
  }
}

export default withStyles(styles)(Week);