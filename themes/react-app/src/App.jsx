import React, {Component} from 'react';
import CalendarMenu from './components/CalendarMenu';
// styles
import {withStyles} from 'material-ui/styles';
// router
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './sass/App.scss';
// pages/containers
import CalendarBodyContainer from './containers/CalendarBodyContainer';
import CreateEventContainer from './containers/CreateEventContainer'
import SearchContainer from './containers/SearchContainer';


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

  render() {
    const { classes} = this.props;
    return (
      <BrowserRouter>
        <div className={classes.Calendar}>
          <CalendarMenu/>
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

export default withStyles(styles)(App);