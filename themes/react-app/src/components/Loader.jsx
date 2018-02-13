import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';

const styles = theme => ({
  loadingContainer: {
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center'
  },
  loadingText: {
    'font-size': '18px',
    'padding': '15px',
    'color': theme.palette.common.lightBlack
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

function Loader(props) {
  const { classes, loadingText } = props;

  return (
    <div className={classes.loadingContainer}>
      <h2 className={classes.loadingText}>{loadingText}</h2>
      <CircularProgress className={classes.progress}/>
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);