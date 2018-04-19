import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo, compose } from 'react-apollo'
import { connect } from "react-redux";
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import BasicDatePicker from '../BasicDatePicker';
import BasicTimePicker from '../BasicTimePicker';
import { Button } from 'material-ui';
import { addNewDateTime, updateDateTime } from '../../actions/createEventActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class DateTimeStep extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventDates: [
        { date: "", start: "", finish: "" },
        { date: "", start: "", finish: "" }
      ]
    }
  }

  //function DateTimeStep(props) {

  dateRow = (item, index) => {
    console.log("dateRow ", item, index)
    let { date, finish, start } = item
    return (
      <div>
        <BasicDatePicker selectedDate={date} handleDateChange={(date) => this.handleDateChange(index, "date", date.format("hh:mm"))} />
        <BasicTimePicker selectedTime={new Date()} />
        <BasicTimePicker selectedTime={new Date()} />
      </div>
    )
  }

  handleDateChange = (index, key, date) => {
    console.log("Handling Change ", index, date)
    this.props.dispatch(updateDateTime(index, key, date))
  }

  addDateTime = () => {
    this.props.dispatch(addNewDateTime())
  }


  render = () => {
    const { classes, DateTimes } = this.props;

    console.log("Date Times from redux ? ", DateTimes)

    return (
      <div>
        <Button onClick={this.addDateTime}> Add new DateTime </Button>
        <form className={classes.container} noValidate>
          {DateTimes && DateTimes.map((item, index) => {
            console.log('mappings ', item, index)
            return this.dateRow(item, index)
          })}
        </form>
      </div>
    );
  }


}

DateTimeStep.propTypes = {
  classes: PropTypes.object.isRequired,
};

const reduxWrapper = connect(
  state => ({
    DateTimes: state.createEvent.DateTimes,
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(DateTimeStep);