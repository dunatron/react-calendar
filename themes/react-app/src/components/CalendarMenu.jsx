import React, {Component} from 'react';
import {gql} from 'react-apollo';
import {propType as fragmentPropType} from 'graphql-anywhere';
import {withStyles} from 'material-ui/styles';
import Logos from './Menu/Logos';
import Navigation from './Menu/Navigation';
import Actions from './Menu/Actions';
// import moment from 'moment';

const styles = {
  MainMenu: {
    'display': 'flex',
    'flex-wrap': 'wrap',
    'min-height': '70px'
  }
};

class CalendarMenu extends Component {

  constructor(props) {
    super(props)

    const {currentDate} = props;

    this.state = {
      currentDate: currentDate,
      currentMonth: null,
      currentYear: null
    };

  }

  componentDidMount() {
    let month = this.state.currentDate.get('month');
    let year = this.state.currentDate.get('year');
    this.setState({
      currentYear: year
    });
    this.formatMonth(month);
  }

  componentWillUpdate() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentDate: nextProps.currentDate
    });
    this.formatMonth(nextProps.currentDate.get('month'));
  }

  formatMonth(month) {

    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    let monthName = monthNames[month];
    let year = this.state.currentDate.get('year');

    console.log(year);

    this.setState({
      currentMonth: monthName,
      currentYear: year
    });

  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.MainMenu}>
        <Logos/>
        <Navigation currentMonth={this.state.currentMonth}
                    currentYear={this.state.currentYear}
                    nextMonthClick={this.props.nextMonthClick}
                    previousMonthClick={this.props.previousMonthClick}
        />
        <Actions/>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarMenu);