import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';
import { compose} from 'react-apollo';
import {connect} from "react-redux";

const styles = theme => ({
  loadingContainer: {
    'display': 'flex',
    'flex': '1',
    'flex-direction': 'column',
    'align-items': 'center',
    zIndex: 99999,
    position: 'absolute',
    height: `calc(100% - 100px)`,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: `rgba(255, 255, 255, 0.8)`
  },
  loadingText: {
    'font-size': '18px',
    'padding': '15px',
    'color': theme.palette.primary.main
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    fill: theme.palette.secondary.main,
  },
});

function EventsLoader(props) {
  const { classes, loadingText, size, fontSize, loadingEvents } = props;

  if (loadingEvents) {
    return (
      <div className={classes.loadingContainer}>
        <h2 className={classes.loadingText} style={{fontSize: `${fontSize}px`}}>{loadingText}</h2>
        <CircularProgress className={classes.progress} size={size}/>
      </div>
    );
  }

  return (null);

}

EventsLoader.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingText: PropTypes.string,
};

const reduxWrapper = connect(
  state => ({
    loadingEvents: state.event.fetching
  })
);

export default compose(
  withStyles(styles),
  reduxWrapper,
)(EventsLoader);
