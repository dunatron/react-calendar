import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo, compose } from 'react-apollo'
import { connect } from "react-redux";
import { withStyles } from 'material-ui/styles';
import BasicDatePicker from '../BasicDatePicker';
import BasicTimePicker from '../BasicTimePicker';
import Tooltip from 'material-ui/Tooltip';
import { Button, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import { addNewDateTime, updateDateTime, removeDateTime } from '../../actions/createEventActions';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dateRowContainer: {
    position: "relative"
  },
  card: {
    //maxWidth: 345,
    width: (theme.spacing.unit * 30),
    height: (theme.spacing.unit * 30) * 1.618,
  },
  addNewDateTimeBtn: {
    width: (theme.spacing.unit * 30),
    height: (theme.spacing.unit * 30) * 1.618,
  },
  dateRowHeader: {
    fontSize: "16px",
    color: theme.palette.primary.main
  },
  dateRow: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    padding: "15px 0"
  },
  removeRowButton: {
    position: "absolute",
    right: 0
  },
  pickerContainer: {
    padding: "15px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class DateTimeStep extends Component {

  dateRow = (item, index) => {
    const { classes } = this.props;
    let { date, finish, start } = item
    let newStart = new Date(start)
    let newFinish = new Date(finish)
    return (
      <div className={classes.dateRowContainer} >
        <Card className={classes.card}>
        <span className={classes.dateRowHeader}>[{index + 1}]</span>
        <Tooltip id="tooltip-top-start" title={"remove date row"} classes={{
          popper: classes.eventToolTip
        }}>
          <IconButton
            onClick={() => this._removeDateTime(index)}
            className={classes.removeRowButton} aria-label="Delete" color="primary">
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <div className={classes.dateRow}>
          <div className={classes.pickerContainer}>
            <BasicDatePicker label="date" selectedDate={date} handleDateChange={(date) => this._handleDateTimeChange(index, "date", date.format("YYYY-MM-DD"))} />
          </div>
          <div className={classes.pickerContainer}>
            <BasicTimePicker label="start time" selectedTime={newStart} handleTimeChange={(time) => this._handleDateTimeChange(index, "start", time.format("YYYY-MM-DD hh:mm a"))} />
          </div>
          <div className={classes.pickerContainer}>
            <BasicTimePicker label="finish time" selectedTime={newFinish} handleTimeChange={(time) => this._handleDateTimeChange(index, "finish", time.format("YYYY-MM-DD hh:mm a"))} />
          </div>
        </div>
        </Card>
      </div>
    )
  }

  _handleDateTimeChange = (index, key, date) => {
    this.props.updateDateTime(index, key, date)
  }

  _addDateTime = () => {
    this.props.addNewDateTime()
  }

  _removeDateTime = (idx) => {
    this.props.removeDateTime(idx)
  }

  render = () => {
    const { classes, DateTimes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate>
          {DateTimes && DateTimes.map((item, index) => {
            return this.dateRow(item, index)
          })}
          <Button className={classes.addNewDateTimeBtn} variant="raised" color="primary" onClick={this._addDateTime}> Add new DateTime </Button>
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
  }),
  dispatch => ({
    removeDateTime: (idx) => dispatch(removeDateTime(idx)),
    addNewDateTime: () => dispatch(addNewDateTime()),
    updateDateTime: (index, key, date) => dispatch(updateDateTime(index, key, date))
  })

);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(DateTimeStep);