import React, {Component} from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {updateTitleField, updateField} from '../../actions/createEventActions';
import {connect} from "react-redux";
import createEvent from "../../reducers/createEventReducer";

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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DetailsStep extends Component {

  state = {
    Title: '',
    Description: '',
    SecondaryTag: '',
    age: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          value={this.props.Title}
          onChange={(e) => this.props.dispatch(updateField('Title', e.target.value))}
          label="Title"
          id="margin-none"
          className={classes.textField}
          helperText="Enter the title of the event"
        />
        <TextField
          value={this.props.Description}
          onChange={(e) => this.props.dispatch(updateField('Description', e.target.value))}
          label="Dense"
          multiline
          rows="4"
          id="margin-dense"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={this.state.SecondaryTag}
          onChange={(e) => this.setState({SecondaryTag: e.target.value})}
          label="Normal"
          id="margin-normal"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        />
      </div>
    );
  }
}

DetailsStep.propTypes = {
  classes: PropTypes.object,
};

const reduxWrapper = connect(
  state => ({
    Title: state.createEvent.Title,
    Description: state.createEvent.Description
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(DetailsStep);









