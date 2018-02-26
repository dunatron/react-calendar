import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import EventDataCard from '../Events/EventDataSheet'

function getModalStyle() {
  const marginSides = 'auto';
  const marginTopBot = 20;

  return {
    marginBottom: `${marginTopBot}px`,
    marginTop: `${marginTopBot}px`,
    marginLeft: `${marginSides}`,
    marginRight: `${marginSides}`,
  };
}

const styles = theme => ({
  root: {
    overflow: 'scroll'
  },
  paper: {
    position: 'relative',
    minWidth: theme.spacing.unit * 32,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    height: 'fit-content',
    minHeight: '250px',
    padding: '0'
  },
  closeIcon: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    padding: 0,
    minHeight: '22px',
    minWidth: '22px',
    borderRadius: 0,
  }
});

class EventModal extends React.Component {

  render() {
    const {classes, eventID} = this.props;

    return (
      <div>
        <Modal
          keepMounted={true}
          BackdropProps={{
            transitionDuration: 0
          }}
          classes={{
            root: classes.root
          }}
          aria-labelledby="event-modal-title"
          aria-describedby="event-modal-description"
          open={this.props.isOpen}
          onClose={this.props.closeModal}>
          <div style={getModalStyle()} className={classes.paper}>
            {/*<IconButton  color={"primary"} variant="raised">*/}
              {/*<CloseIcon/>*/}
            {/*</IconButton>*/}
            <Button onClick={this.props.closeModal} className={classes.closeIcon} variant="raised" color="primary">
              <CloseIcon/>
            </Button>
            {eventID && <EventDataCard eventID={this.props.eventID} eventTitle={this.props.eventTitle}/>}
          </div>
        </Modal>
      </div>
    );
  }
}

EventModal.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default withStyles(styles)(EventModal);

