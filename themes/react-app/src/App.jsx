import React, {Component} from 'react';
import CalendarMenu from './components/CalendarMenu';
// styles
import {withStyles} from 'material-ui/styles';
import {compose} from 'react-apollo';
// router
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './sass/App.scss';
// pages/containers
import CalendarBodyContainer from './containers/CalendarBodyContainer';
import CreateEventContainer from './containers/CreateEventContainer'
import SearchContainer from './containers/SearchContainer';
// connect redux
import {connect} from "react-redux";
import {nextMonth, prevMonth} from './actions/headerActions';

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
    this.nextMonthClick = this.nextMonthClick.bind(this);
    this.previousMonthClick = this.previousMonthClick.bind(this);
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
    const { classes, header, happLogo, clientLogo} = this.props;
    return (
      <BrowserRouter>
        <div className={classes.Calendar}>
          <CalendarMenu
            happLogo={happLogo}
            clientLogo={clientLogo}
            currentDate={header.currentDate}
            currentMonth={header.currentMonth}
            currentYear={header.currentYear}
            nextMonthClick={this.nextMonthClick}
            previousMonthClick={this.previousMonthClick}/>
          <Switch>
            <Route exact path='/' component={CalendarBodyContainer}/>
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