import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper'
import ReactModal from 'react-modal';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui-icons/Settings';
import AddCircleIcon from 'material-ui-icons/AddCircleOutline';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList'
import FilterSearch from './FilterSearch';
import CategoriesList from './CategoriesList';

import { Drawer, AppBar, MenuItem, RaisedButton} from 'material-ui'


const styles = {
  ActionsWrapper: {
    'display': 'flex',
    'flex': '1',
    'align-items': 'center',
    'justify-content': 'center',
    'min-height': '70px'
  },
  Button: {
    'height': '42px'
  },
  card: {
    'display': 'flex',
    'width': '15em',
    'height': '19em',
    'flex': '1 1 auto', // flex-grow, flex-shrink, flex-basis
    'flex-wrap': 'wrap',
    'margin': '10px',
    'overflow': '-webkit-paged-x'
  },
  media: {
    height: 200,
  },
  cardContent: {
    'height': '80%',
    'width': '100%',
    'overflow': 'hidden'
  },
  cardActions: {
    'height': '20%',
  },
  categoryCircle: {
    'height': '15px',
    'width': '15px',
    'border-radius': '15px',
    'margin': '8px'
  },
  categoryComponent: {
    'display': 'flex',
    'align-items': 'center',

  },
  paper: {
    'height': 'auto',
    'width': 'auto',
    'margin': '1.2em',
    'padding': '1.2em',
    'text-align': 'center',
    'display': 'inline-block',
  }

};

class Actions extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      filterDraw: false, // left
      searchDraw: false, // top
      settingsDraw: false, // right
      openSecondary: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {

    const {classes} = this.props;

    return (
      <div className={classes.ActionsWrapper}>

        <IconButton aria-label="Add to favorites" onClick={this.toggleDrawer('filterDraw', true)}>
          <FilterListIcon />
        </IconButton>

        <IconButton aria-label="Add to favorites" onClick={this.toggleDrawer('searchDraw', true)}>
          <SearchIcon />
        </IconButton>

        <IconButton aria-label="Add to favorites" onClick={this.openModal}>
          <AddCircleIcon />
        </IconButton>

        <IconButton aria-label="Add to favorites" onClick={this.toggleDrawer('settingsDraw', true)}>
          <SettingIcon />
        </IconButton>

        {/* Filter Draw*/}
        <Drawer
          anchor="left"
          open={this.state.filterDraw}
          onRequestClose={this.toggleDrawer('filterDraw', false)}
        >
          <MenuItem onClick={this.toggleDrawer('filterDraw', false)}>CLOSE</MenuItem>
          <CategoriesList/>
        </Drawer>

        {/* Search Draw*/}
        <Drawer
          anchor="top"
          open={this.state.searchDraw}
          onRequestClose={this.toggleDrawer('searchDraw', false)}
        >
          <MenuItem onClick={this.toggleDrawer('searchDraw', false)}>CLOSE</MenuItem>
          <MenuItem >Search</MenuItem>
        </Drawer>

        {/* Settings Draw*/}
        <Drawer
          anchor="right"
          open={this.state.settingsDraw}
          onRequestClose={this.toggleDrawer('settingsDraw', false)}
          >
          <MenuItem onClick={this.toggleDrawer('settingsDraw', false)}>CLOSE</MenuItem>
          <MenuItem >Select Happ Calendar</MenuItem>
          <Link to='/login' className='ml1 no-underline black'>
            <Button color="contrast">Login</Button>
          </Link>
        </Drawer>

        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={200}
          shouldCloseOnOverlayClick={true}
          contentLabel="Example Modal"
        >

          <Button dense color='primary' onClick={this.closeModal}>
            CLOSE
          </Button>
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <div>I am a modal</div>
          <div>ToDo:</div>
          <div>1 ) create a store on CodeExampleList and move the Modal there.</div>
          <div>2 ) CodeExampleList Will contain a currentData which will have data about one card</div>
          <div>3 ) On a card Button press send the data up to CodeExampleList</div>
          <form>
            <input/>
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>

            <Paper className={classes.paper} children={<div>The body</div>}/>

          </form>
        </ReactModal>
      </div>
    );
  }
}

export default withStyles(styles)(Actions);