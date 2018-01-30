import React, {Component} from 'react';
import {gql} from 'react-apollo';
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import Logos from './Menu/Logos';
import Navigation from './Menu/Navigation';
import Actions from './Menu/Actions';
import moment from 'moment';

const styles = {
  MainMenu: {
    'display': 'flex',
    'flex-wrap': 'wrap',
    'min-height': '70px'
  }
};

class CalendarMenu extends Component {

  render() {

    const {classes} = this.props;

    console.group('Calendar MENU');
    console.log(this.props);
    console.groupEnd();

    return (
      <div className={classes.MainMenu}>
        <Logos/>
        <Navigation currentMonth={this.props.currentMonth}
                    currentYear={this.props.currentYear}
                    nextMonthClick={this.props.nextMonthClick}
                    previousMonthClick={this.props.previousMonthClick}
        />
        <Actions/>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarMenu);