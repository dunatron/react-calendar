import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui-pickers/DatePicker';

import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

class BasicDatePicker extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    console.log("handleDateChange ", date)
    //this.setState({ selectedDate: date });
    //this.props.selectedDate = date
    this.props.handleDateChange(date)
  }

  openPicker = () => {
    this.picker.wrapper.open();
  }

  render() {
    const { selectedDate } = this.props;

    return (
      <div className={this.props.classes.container}>
        <div className="picker">
          <DatePicker
            clearable
            pickerRef={(node) => { this.picker = node; }}
            label="Localization done right"
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(BasicDatePicker);
