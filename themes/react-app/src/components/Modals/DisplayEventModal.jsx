import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import EventDataCard from '../Events/EventDataSheet';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  //
  // return {
  //   top: `${top}%`,
  //   left: `${left}%`,
  //   transform: `translate(-${top}%, -${left}%)`,
  // };
  const marginSides = 'auto';
  const marginTopBot = 20;

  return {
    'margin-bottom': `${marginTopBot}px`,
    'margin-top': `${marginTopBot}px`,
    'margin-left': `${marginSides}`,
    'margin-right': `${marginSides}`,
  };
}

const styles = theme => ({
  paper: {
    position: 'relative',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing.unit * 4,
    outline: 'none',
    overflow: 'scroll',
    'max-height': '550px',
    'padding': '0'
  },
  closeIcon: {
    position: "absolute"
  }
});

class DisplayEventModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/*<Typography gutterBottom>Click to get the full Modal experience!</Typography>*/}
        {/*<Button onClick={this.handleOpen}>Open Modal</Button>*/}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.isOpen}
          onClose={this.props.closeModal}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <IconButton onClick={this.props.closeModal} className={classes.closeIcon} color={"primary"}>
              <CloseIcon />
            </IconButton>
            <EventDataCard eventID={this.props.eventID} eventTitle={this.props.eventTitle}/>
            <DisplayEventModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

DisplayEventModal.propTypes = {
  // classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const DisplayEventModalWrapped = withStyles(styles)(DisplayEventModal);

export default DisplayEventModalWrapped;

