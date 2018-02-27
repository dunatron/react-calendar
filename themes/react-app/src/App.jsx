import React, {Component} from 'react';
import CalendarMenu from './components/CalendarMenu';

import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import {gql, graphql, compose} from 'react-apollo';
import './sass/App.scss';
import CalendarBodyContainer from './containers/CalendarBodyContainer';
import CreateEventContainer from './containers/CreateEventContainer'
import SearchContainer from './containers/SearchContainer';
// Connect Redux
import {connect} from "react-redux";
import {nextMonth, prevMonth} from './actions/headerActions';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import {withRouter} from "react-router";
// import {BrowserRouter} from 'react-router-dom'

const styles = {
  Calendar: {
    'width': '100%',
    'height': '100%',
  },
  card: {
    'minWidth': 'min-content',
    'maxWidth': '300px',
    'flex-shrink': '0',
    'margin': '10px',
  },
  media: {
    height: 200,
  }
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment(),
      currentMonth: null,
      currentYear: null,
      monthName: null,
      modalIsOpen: false,
      open: false,
      currentEvent: {
        ID: 1000,
        Title: null
      }
    };

    this.nextMonthClick = this.nextMonthClick.bind(this);
    this.previousMonthClick = this.previousMonthClick.bind(this);
    // Modal state
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  nextMonthClick = (e) => {
    e.preventDefault();
    this.props.dispatch(nextMonth());
  };

  previousMonthClick = async (e) => {
    e.preventDefault();
    this.props.dispatch(prevMonth());
  };

  render() {
    const CalendarBody = (props) => {
      return (
        <CalendarBodyContainer
          currentDate={header.currentDate}
          startDate={header.startOfMonth}
          endDate={header.endOfMonth}
        />
      );
    };

    const {classes} = this.props;

    const { header, happLogo, clientLogo} = this.props;

    return (
      <BrowserRouter>
        <div className={classes.Calendar}>
          <CalendarMenu
            currentDate={header.currentDate}
            happLogo={happLogo}
            clientLogo={clientLogo}
            currentMonth={header.currentMonth}
            currentYear={header.currentYear}
            nextMonthClick={this.nextMonthClick}
            previousMonthClick={this.previousMonthClick}/>
          <Switch>
            <Route exact path='/' component={CalendarBody}/>
            <Route exact path='/create' component={CreateEventContainer}/>
            <Route exact path='/search' component={SearchContainer}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    header: state.header,
  })
);

export default compose(
  reduxWrapper,
  withStyles(styles)
)(App);