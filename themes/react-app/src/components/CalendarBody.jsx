import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import Week from './Body/Week';


/**
 * READ THIS
 * https://www.codementor.io/chrisharrington/building-a-calendar-using-react-js--less-css-and-font-awesome-du107z6nt
 */

const styles = {
  CalendarBodyWrapper: {
    'height': '100px',
    'border': '1px solid purple',
    'display': 'flex'
  },
  DaysWrapper: {
    'display': 'flex',
    'width': '100%',
    'height': '40px',
    'background': 'rgba(255, 255, 255, 0.2)',
    'box-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  },
  Days: {
    'flex': '1',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'text-shadow': '0 1px 1px rgba(0, 0, 0, 0.4)',
    'letter-spacing': '3px',
    'font-size': '14px',
    'text-transform': 'uppercase',
    'color': 'rgba(255, 255, 255, 0.9)'
  }
};

class CalendarBody extends Component {

  constructor(props) {
    super(props);

    const {currentDate} = props;

    this.state = {
      //currentDate: moment(),
      currentYear: null,
      month: moment(),
      currentDate: currentDate,
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

  renderWeeks() {
    let weeks = [],
      done = false,
      date = moment(this.state.currentDate).startOf("month").add("w" - 1).day("Sunday"),
      monthIndex = date.month(),
      count = 0;

    while (!done) {
      weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select={this.select}
                       selected={this.props.selected}
                       events={this.state.events}
                       eventClick={this.props.eventClick}
      />);
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }

  render() {

    const {classes} = this.props;

    return (
      <div className="Calendar__Body__Wrapper">
        <div className="Days__Wrapper">
          <span className="day_name">Sunday</span>
          <span className="day_name">Monday</span>
          <span className="day_name">Tuesday</span>
          <span className="day_name">Wednesday</span>
          <span className="day_name">Thursday</span>
          <span className="day_name">Friday</span>
          <span className="day_name">Saturday</span>
        </div>
        <div className="squares__wrapper">
          {this.renderWeeks()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarBody);