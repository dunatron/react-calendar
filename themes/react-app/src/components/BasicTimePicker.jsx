import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles';
import { TimePicker } from 'material-ui-pickers';
import AccessTimeIcon from 'material-ui-icons/AccessTime';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};

class BasicTimePicker extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    selectedDate: new Date(),
  }

  handleTimeChange = (time) => {
    this.props.handleTimeChange(time)
  }

  render() {
    const { classes, selectedTime, label } = this.props;

    return (
      <div className={classes.container}>
        <div className="picker">
          <TimePicker
            keyboardIcon={<AccessTimeIcon />}
            pickerRef={(node) => { this.picker = node; }}
            label={label}
            //mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
            format="hh:mm a"
            placeholder="08:00 AM"
            value={selectedTime}
            onChange={this.handleTimeChange}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BasicTimePicker);