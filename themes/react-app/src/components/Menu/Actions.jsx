import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper'
import ReactModal from 'react-modal';
import IconButton from 'material-ui/IconButton';
import SettingIcon from 'material-ui-icons/Settings';
import AddCircleIcon from 'material-ui-icons/AddCircleOutline';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';
import CloseIcon from 'material-ui-icons/Close';
import {CircularProgress} from 'material-ui/Progress';
import CategoriesList from './CategoriesList';
import LoginForm from '../Login';

import { Drawer, MenuItem} from 'material-ui'
import {compose, gql, graphql} from "react-apollo/index";
import store from '../../state/store';


const drawerWidth = 240;
const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'absolute',
    height: '100%',
    width: drawerWidth,
  },
  ActionsWrapper: {
    'display': 'flex',
    'flex': '1',
    'align-items': 'center',
    'justify-content': 'center',
    'min-height': '70px'
  },
  loadingWrapper: {
    'display': 'flex',
    'flex': '1',
    'align-items': 'center',
    'justify-content': 'center',
    'min-height': '70px',
    'flex-direction': 'column-reverse',
  },
  Button: {
    'height': '42px'
  },
  loadingText: {
    'font-size': '12px'
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
  },
  MuiPaper: {
    'transform': 'translateX(-408.828px)',
  },
  paperAnchorDockedLeft: {
    display: 'none'
  }
});


class Actions extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      loginModalIsOpen: false,
      filterDraw: false, // left
      searchDraw: false, // top
      settingsDraw: false, // right
      openSecondary: true
    };

    // this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openLoginModal = this.openLoginModal.bind(this);
    this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);

  }

  // shouldComponentUpdate = () => {
  //
  // };

  toggleDrawer = (side, open) => () => {
    console.log(side, ' has been toggled');
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

  openLoginModal() {
    this.setState({loginModalIsOpen: true});
    this.toggleDrawer('settingsDraw', false)
  }

  closeLoginModal() {
    this.setState({loginModalIsOpen: false});
  }

  afterOpenLoginModal() {
    console.log('clsoe the setting drawer');
    this.toggleDrawer('settingsDraw', false)
  }

  _logout = async () => {

    localStorage.removeItem('USER_ID');
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('jwt');
    // ToDO : this for whatever reason is not working
    this.forceUpdate()
    // this.props.history.push(`/`)
  };

  render() {

    const {classes} = this.props;

    console.log('ACTIONS.jsx PROPS: ', this.props);

    const {token} = store.getState();

    const {data: {validateToken, loading}} = this.props;
    if (loading) {
      return <div className={classes.loadingWrapper}>
        <h2 className={classes.loadingText}>applying settings</h2>
        <CircularProgress className={classes.progress}size={20}/>
      </div>
    }

    return (
      <div className={classes.ActionsWrapper}>

        <IconButton aria-label="Add to favorites" onClick={this.toggleDrawer('filterDraw', true)}>
          <FilterListIcon />
        </IconButton>

        <IconButton aria-label="Add to favorites" onClick={this.toggleDrawer('searchDraw', true)}>
          <SearchIcon />
        </IconButton>

        <IconButton aria-label="Add to favorites" onClick={() => this.openModal()}>
          <AddCircleIcon />
        </IconButton>

        <IconButton aria-label="Add to favorites" onClick={this.toggleDrawer('settingsDraw', true)}>
          <SettingIcon />
        </IconButton>

        {/* Filter Draw*/}
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
          open={this.state.filterDraw}
          onClose={this.toggleDrawer('filterDraw', false)}
          //children={}
          // onClose={(e) => {e.preventDefault()}}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.toggleDrawer('filterDraw', false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <CategoriesList/>
          </div>

        </Drawer>

        {/* Search Draw*/}
        <Drawer
          anchor="top"
          open={this.state.searchDraw}
          onClose={this.toggleDrawer('searchDraw', false)}
        >
          <MenuItem onClick={this.toggleDrawer('searchDraw', false)}>CLOSE</MenuItem>
          <MenuItem >Search</MenuItem>
        </Drawer>

        {/* Settings Draw*/}
        <Drawer
          anchor="right"
          open={this.state.settingsDraw}
          onClose={this.toggleDrawer('settingsDraw', false)}
          >
          <MenuItem onClick={this.toggleDrawer('settingsDraw', false)}>CLOSE</MenuItem>
          <MenuItem >Select Happ Calendar</MenuItem>
          <MenuItem>


            {token ?
              <Button color="contrast" onClick={() => this._logout()}>Logout</Button>
              :
              <IconButton aria-label="Add to favorites" onClick={this.openLoginModal}>
                <AddCircleIcon />
              </IconButton>
            }
          </MenuItem>

          {validateToken.Valid && 'You are logged in according to validateToken.'}
          {!validateToken.Valid && 'You are not logged in according to validateToken.'}

        </Drawer>


        <ReactModal
          isOpen={this.state.loginModalIsOpen}
          onAfterOpen={this.afterOpenLoginModal}
          onClose={this.closeLoginModal}
          closeTimeoutMS={200}
          shouldCloseOnOverlayClick={true}
          contentLabel="Example Modal"
        >

          <Button dense color='primary' onClick={this.closeLoginModal}>
            CLOSE
          </Button>

          <LoginForm />

        </ReactModal>

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

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

export default compose(
  graphql(validateToken),
  withStyles(styles)
)(Actions);