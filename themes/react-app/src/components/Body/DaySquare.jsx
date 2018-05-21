import React, {Component, Fragment} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {compose, withApollo} from "react-apollo/index";
import {fade} from 'material-ui/styles/colorManipulator';
import Tooltip from 'material-ui/Tooltip';
import VirtualList from 'react-virtual-list';
import {connect} from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom'


const R = require('ramda');

const styles = theme => ({
  label: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
    textOverflow: 'ellipsis',
  },
  dayNumber: {
    display: 'none',
  },
  isTodayNumber: {
    display: 'none'
  },
  prettyDate: {
    color: theme.palette.primary.main,
  },
  // innerSquare: {
  //   height: 'inherit',
  //   padding: '0',
  //   overflowY: 'hidden',
  //   overflowX: 'hidden',
  //   position: 'relative',
  //   margin: 0,
  // },
  outerSquare: {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  innerSquare: {
    height: 'inherit',
    overflowY: 'hidden',
    overflowX: 'hidden',
    position: 'relative',
    margin: 0,
    boxSizing: 'border-box',
    padding: '40px 10px'
  },
  eventsWrapper: {
    width: '100%',
    height: 'auto !important',
    padding: 0,
    margin: 0
  },
  eventToolTip: {
    // left: '-5px !important',
    // maxWidth: `calc(100% - 25px)`,
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
      display: 'block',
      position: 'absolute',
      fontSize: '13px',
      lineHeight: '20px',
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
    isTodayNumber: {
      display: 'block',
      position: 'absolute',
      fontSize: '13px',
      lineHeight: '20px',
      textAlign: 'center',
      top: '0',
      left: '0',
      padding: '2px',
      backgroundColor: fade(theme.palette.secondary.main, 0.8),
      color: theme.palette.common.white,
      minWidth: '26px',
      transition: 'opacity 0.5s ease-in-out',
      zIndex: 1
    },
    prettyDate: {
      display: 'none'
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
    outerSquare: {
      position: "absolute",
      margin: `${theme.spec.eventGapSpace}px 0 0 0`,
      height: `calc(100% - ${theme.spec.eventGapSpace}px)`,
      width: "100%",
      overflow: "hidden",
      right: "-15px"
    },
    innerSquare: {
      margin: '0',
      padding: `0 ${theme.spec.eventGapSpace}px 0 0`,
      overflowY: 'scroll',
      overflowX: 'hidden',
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

// ToDo: separate day square and and days events
class DaySquare extends Component {

  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.virtualContainer = React.createRef();

    const state = {
      hasMounted: false
    };

    this.state = state;
  }

  // shouldComponentUpdate(nextProps) {
  //   if(nextProps.isMobileDevice !== this.props.isMobileDevice){
  //     return true
  //   }
  //   if(nextProps.daysEvents !== this.props.daysEvents) {
  //     return true
  //   }
  //   return false
  // }

  componentDidMount = () => {
    this.setState({hasMounted: true})
  }

  generateList = () => {
    const {classes, daysEvents, isMobileDevice} = this.props;
    let container, buffer, itemHeight

    if (isMobileDevice) {
      container = window
      buffer = 0 // filter will lag as we are buffering 31 * buffer
      itemHeight = 36
    } else {
      container = this.refs.virtualContainer
      buffer = 0
      itemHeight = 32
    }

    const virtualListOptions = {
      container: container, // use this scrollable element as a container
      // initialState: {
      //   firstItemIndex: 0, // show first ten items
      //   lastItemIndex: 9,  // during initial render
      // },
    }

    const MyList = ({virtual, itemHeight,}) => (
      // <ul className={classes.eventsWrapper} style={virtual.style}>
      <div style={virtual.style}>
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
      </div>
      // </ul>
    );

    const MyVirtualList = VirtualList(virtualListOptions)(MyList);
    return <MyVirtualList
      items={daysEvents}
      itemHeight={itemHeight}
      itemBuffer={buffer}
    />
  }

  renderEvents = (events) => {
    return events.map((event, index) => {
      return <p>{index}</p>
    })
  }

  render() {
    const {classes, isToday, prettyDate, windowHeight, isMobileDevice} = this.props;
    let {hasMounted} = this.state

    return (
      <div className={this.props.className}>
        <span className={classes.prettyDate}>{prettyDate}</span>
        <span className={(isToday ? classes.isTodayNumber : classes.dayNumber)}>{this.props.dayNumber}</span>
        <div className={classes.outerSquare}>
          <div className={classes.innerSquare} id="virtualContainer" ref="virtualContainer"
               style={isMobileDevice ? {paddingBottom: windowHeight / 4} : {}}>
            <ReactCSSTransitionGroup
              transitionName="eventList"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
                {hasMounted && (
                  this.generateList()
                )}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

const reduxWrapper = connect(
  (state, ownProps) => ({
    daysEvents: R.pathOr([], [ownProps.year, ownProps.month, ownProps.day, 'data'], state.event.visibleEvents),
    isMobileDevice: state.settings.isMobileDevice,
    windowHeight: state.settings.windowHeight
  }),
  null // currently not dispatching any actions
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper
)(DaySquare);
