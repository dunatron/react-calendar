import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from "react-redux";
import {compose, withApollo} from "react-apollo/index";
import Tooltip from 'material-ui/Tooltip';

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

class DaySquare extends Component {

  constructor(props) {
    super(props)

    const {currentDate} = props;

    this.state = {
      events: [props.events]
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: [nextProps.events]
    })
  }

  renderEvents() {
    const {events, classes, dayNumber, filter} = this.props;

    // Filter has been set, filter the events
    if (filter.length >= 1) {

      const newEvents = [];

      for (let event of events) {
        if (event.SecondaryTag) {
          if (filter.includes(event.SecondaryTag.Title)) {
            newEvents.push(event)
          }
        }
      }
      const listItems = newEvents.map((d) =>
        // Tool tip enter and leave delay are in milliseconds
        <Tooltip id={`#e-name-tip-${d.ID}`} title={d.Title} placement="top" key={d.ID} enterDelay={0} leaveDelay={0}>
          <div
            className="event_card" key={d.ID}
            onClick={() => this.props.eventClick(d.ID, d.Title)}
          >
            {d.Title}
          </div>
        </Tooltip>);
      return (

        <div className="events_wrapper">
          {listItems}
        </div>
      );
    }

    // Filter has not been set, return all events
    const listItems = events.map((d) =>
      // Tool tip enter and leave delay are in milliseconds
      <Tooltip id={`#e-name-tip-${d.ID}`} title={d.Title} placement="top" key={d.ID} enterDelay={0} leaveDelay={0}>
        <div
          className="event_card" key={d.ID}
          onClick={() => this.props.eventClick(d.ID, d.Title)}
        >
          {d.Title}
        </div>
      </Tooltip>
    );

    return (
      <div className="events_wrapper">
        {listItems}
      </div>
    );
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={this.props.className}>
        <span className="day_number">{this.props.dayNumber}</span>
        <div className="inner_square">
          {this.renderEvents()}
        </div>
      </div>
    );
  }
}

const reduxWrapper = connect(
  state => ({
    filter: state.tags.filterTags
  })
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(DaySquare);
