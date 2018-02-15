import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';

const styles = theme => ({
  loadingContainer: {
    'display': 'flex',
    'flex': '1',
    'flex-direction': 'column',
    'align-items': 'center'
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

function Loader(props) {
  const { classes, loadingText, size, fontSize } = props;

  return (
    <div className={classes.loadingContainer}>
      <h2 className={classes.loadingText} style={{fontSize: `${fontSize}px`}}>{loadingText}</h2>
      <CircularProgress className={classes.progress} size={size}/>
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  loadingText: PropTypes.string,
};

export default withStyles(styles)(Loader);