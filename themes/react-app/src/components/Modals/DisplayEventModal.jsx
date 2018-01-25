import React, {Component} from 'react';
import {compose} from 'react-apollo';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import ReactModal from 'react-modal';
import red from 'material-ui/colors/red';
import Drawer from 'material-ui/Drawer';
import CloseIcon from 'material-ui-icons/Close';
import HappMap from '../HappMap';
import EventDataCard from '../Events/EventDataSheet';

const customStyles = {
  content : {
    'maxWidth': 'max-content',
    'margin': 'auto',
    'overflowX': 'hidden'
  }
};

const styles = theme => ({
  card: {
    'alignSelf': 'stretch',
    'maxWidth': '650px',
    'flex-shrink': '0',
    'margin': '10px',
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  closeButton: {
    'left': '30px',
    'float': 'right',
    'top': '-30px'
  },
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
  timeHolder: {
    'display': 'flex',
    'align-items': 'center'
  },
  MyModal: {
    'width': 'max-content'
  },
});

class DisplayEventModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      open: false,
      expanded: false,
      bottomDraw: false,
      eventData: {}
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  componentWillReceiveProps(nextProps) {
    //eventData
    this.setState({
      eventData: nextProps.eventData
    })
  }

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {

    const {classes} = this.props;

    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        closeTimeoutMS={200}
        shouldCloseOnOverlayClick={true}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <Button fab color="primary" aria-label="add" className={classes.closeButton} onClick={() => this.closeModal()}>
          <CloseIcon/>
        </Button>
        <EventDataCard eventID={5}/>
        <Drawer
          anchor="bottom"
          open={this.state.bottomDraw}
          onRequestClose={this.toggleDrawer('bottomDraw', false)}
        >
          <div>
            <HappMap defaultZoom={15} lat={-41.2929515} lng={174.7729421}/>
          </div>
        </Drawer>
      </ReactModal>
    );
  }
}

export default compose(
  withStyles(styles),
)(DisplayEventModal);


