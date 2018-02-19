import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import Week from './Body/Week';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
        ;
        if (moment(eventDate).isSameOrBefore(endOfWeek) && moment(eventDate).isSameOrAfter(startWeek)) {
          weeksEvents.push(event);
        }
      }

      weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select={this.select}
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
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionEnterTimeout={2000} transitionLeaveTimeout={2000 }>
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
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(styles)(CalendarBody);