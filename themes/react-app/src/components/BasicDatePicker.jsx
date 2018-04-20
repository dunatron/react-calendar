import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui-pickers/DatePicker';

import withStyles from 'material-ui/styles/withStyles';
import DateRangeIcon from 'material-ui-icons/DateRange';
import LeftArrow from 'material-ui-icons/KeyboardArrowLeft';
import RightArrow from 'material-ui-icons/KeyboardArrowRight';

class BasicDatePicker extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleDateChange = (date) => {
    this.props.handleDateChange(date)
  }

  openPicker = () => {
    this.picker.wrapper.open();
  }

  render() {
    const { selectedDate, label, classes } = this.props;

    return (
      <div className={this.props.classes.container}>
        <div className="picker">
          <DatePicker
            keyboardIcon={<DateRangeIcon className={classes.navArrow} />}
            leftArrowIcon={<LeftArrow />}
            rightArrowIcon={<RightArrow />}
            pickerRef={(node) => { this.picker = node; }}
            label={label}
            format="D MMM YYYY"
            value={selectedDate}
            onChange={this.handleDateChange}
            clearLabel="clear"
            cancelLabel="cancel"
          />
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  MuiIconButton: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main
  },
  navArrow: {
    color: theme.palette.secondary.main
  }
});

export default withStyles(styles)(BasicDatePicker);
