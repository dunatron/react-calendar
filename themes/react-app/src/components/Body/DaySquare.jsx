import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from "react-redux";
import {compose, withApollo} from "react-apollo/index";
import { fade} from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  dayNumber: {
    lineHeight: '50px',
    fontSize: '26px',
    textAlign: 'center',
    top: '0',
    left: '0',
    padding: '2px',
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    color: theme.palette.common.white,
    minWidth: '26px',
    transition: 'opacity 0.5s ease-in-out',
    zIndex: 1
  },
  innerSquare: {
    height: 'inherit',
    padding: '0',
    overflowY: 'hidden',
    overflowX: 'hidden',
    position: 'relative',
    margin: 0,
  },
  eventsWrapper: {
    width: '100%'
  },
  eventCard: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 0 12px 0',
    color: theme.palette.common.black,
    fontSize: '22px',
    textTransform: 'capitalize',
    padding: '6px 12px',
    borderRadius: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    background: fade(theme.palette.primary.main, 0.2),
    '&:hover': {
      cursor: 'pointer'
    }
  },
  [theme.breakpoints.up('md')]: {
    dayNumber: {
      position: 'absolute',
      fontSize: '13px',
      lineHeight: '20px',
    },
    eventsWrapper: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      position: 'absolute',
      marginTop: 0,
      height: 'inherit',
      right: '-15px',
      padding: 0,
    },
    innerSquare: {
      margin: '0 15px 0 0',
    },
    eventCard: {
      fontSize: '16px',
      padding: '3px 5px',
      margin: '0 0 7px 0',
      borderRadius: 0, // because the right side side is hidden by shifting it right
      '&:first-child': {
        margin: '15px 0 7px 0'
      },
      '&:last-child': {
        margin: '0 0 15px 0'
      }
    }
  },
});

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
          <div
            className={classes.eventCard} key={d.ID}
            onClick={() => this.props.eventClick(d.ID, d.Title)}
          >
            {d.Title}
          </div>);
      return (
        <div className={classes.eventsWrapper}>
          {listItems}
        </div>
      );
    }

    // Filter has not been set, return all events
    const listItems = events.map((d) =>
        <div
          className={classes.eventCard} key={d.ID}
          onClick={() => this.props.eventClick(d.ID, d.Title)}
        >
          {d.Title}
        </div>);

    return (
      <div className={classes.eventsWrapper}>
        {listItems}
      </div>
    );
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={this.props.className}>
        <span className={classes.dayNumber}>{this.props.dayNumber}</span>
        <div className={classes.innerSquare}>
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
