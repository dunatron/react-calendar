import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {compose, withApollo} from "react-apollo/index";
import {fade} from 'material-ui/styles/colorManipulator';
import Tooltip from 'material-ui/Tooltip';
import VirtualList from 'react-virtual-list';

const styles = theme => ({
  label: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    textOverflow: 'ellipsis',
  },
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
  // innerSquare: {
  //   height: 'inherit',
  //   padding: '0',
  //   overflowY: 'hidden',
  //   overflowX: 'hidden',
  //   position: 'relative',
  //   margin: 0,
  // },
  innerSquare: {
    height: 'inherit',
    overflowY: 'hidden',
    overflowX: 'hidden',
    position: 'relative',
    margin: 0,
    boxSizing: 'border-box',
    padding: '10px'
  },
  eventsWrapper: {
    width: '100%',
    height: 'auto !important',
    padding: 0,
    margin: 0
  },
  eventToolTip: {
    left: '-5px !important',
    maxWidth: `calc(100% - 25px)`,
    pointerEvents: 'none'
  },
  eventCardBtn: {
    display: 'block',
    fontFamily: 'GustanLight',
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
  eventBtnText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    textOverflow: 'ellipsis',
  },
  [theme.breakpoints.up('md')]: {
    label: {
      width: `calc(100% - 15px)`,
    },
    dayNumber: {
      position: 'absolute',
      fontSize: '13px',
      lineHeight: '20px',
    },
    // eventsWrapper: {
    //   overflowY: 'scroll',
    //   overflowX: 'hidden',
    //   position: 'absolute',
    //   marginTop: 0,
    //   height: 'inherit',
    //   right: '-15px',
    //   padding: 0,
    // },
    // innerSquare: {
    //   margin: '0 15px 0 0',
    // },
    eventsWrapper: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      position: 'relative',
      marginTop: 0,
      height: 'inherit !important',
      padding: '0 25px 0 0',
      boxSizing: 'content-box !important',
      margin: 0
    },
    innerSquare: {
      margin: '0',
    },
    eventCardBtn: {
      width: '100%',
      fontSize: '16px',
      padding: '3px 5px',
      margin: '0 0 3px 0',
      minHeight: '32px',
      borderRadius: 0, // because the right side side is hidden by shifting it right
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '&:first-child': {
        margin: '15px 0 3px 0'
      },
      '&:last-child': {
        margin: '0 0 15px 0'
      },
    }
  },
});

class DaySquare extends Component {

  renderEvents() {
    const {events, classes} = this.props;

    const listItems = events.map((d) =>
      <Tooltip id="tooltip-top-start" key={d.ID} title={d.Title} classes={{
        popper: classes.eventToolTip
      }}>
        <Button
          color="primary"
          onClick={() => this.props.eventClick(d.ID, d.Title)}
          classes={{
            root: classes.eventCardBtn, // className, e.g. `OverridesClasses-root-X`
            label: classes.label, // className, e.g. `OverridesClasses-label-X`
          }}>{d.Title}</Button>
      </Tooltip>);

    return (
      <div className={classes.eventsWrapper}>
        {listItems}
      </div>
    );
  }

  /*
   <li key={`item_${item.id}`} style={{height: itemHeight}}>
            {item.Title}
          </li>
          */

  render() {

    const {classes, events} = this.props;

    const MyList = ({virtual, itemHeight,}) => (
      <ul className={classes.eventsWrapper} style={virtual.style}>
        {virtual.items.map(item => (
          <Tooltip id="tooltip-top-start" key={item.ID} title={item.Title} classes={{
            popper: classes.eventToolTip
          }}>
            <Button
              color="primary"
              style={{height: itemHeight}}
              onClick={() => this.props.eventClick(item.ID, item.Title)}
              classes={{
                root: classes.eventCardBtn, // className, e.g. `OverridesClasses-root-X`
                label: classes.label, // className, e.g. `OverridesClasses-label-X`
              }}>{item.Title}</Button>
          </Tooltip>
        ))}
      </ul>
    );

    const MyVirtualList = VirtualList()(MyList);

    return (
      <div className={this.props.className}>
        <span className={classes.dayNumber}>{this.props.dayNumber}</span>
        <div className={classes.innerSquare}>
          {/*{this.renderEvents()}*/}
          <MyVirtualList
            items={events}
            itemHeight={32}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withApollo,
)(DaySquare);
