import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles';
import { TimePicker } from 'material-ui-pickers';

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
    this.props.selectedTime = time
  }

  render() {
    const { classes, selectedTime } = this.props;

    return (
      <div className={classes.container}>
        <div className="picker">
          <TimePicker
            keyboard
            label="Masked timepicker"
            mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
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