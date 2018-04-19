import React, { Component } from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { updateField } from '../../actions/createEventActions';
import { connect } from "react-redux";

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

  // state = {
  //   Title: '',
  //   Description: '',
  //   SecondaryTag: '',
  //   age: ''
  // };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  tagsDropDownList = (tags) => {
    const TagsList = [];
    tags.map(tag => {
      // TagsList.push(<MenuItem value={tag.Title}>{tag.Title}</MenuItem>)
      tag.SecondaryTags.map(secondary => {
        TagsList.push(<MenuItem value={secondary.Title}>{secondary.Title}</MenuItem>)
      })
    });
    return TagsList;
  };

  render() {

    const { classes, Tags } = this.props;

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
          id="margin-dense"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Category</InputLabel>
          <Select
            value={this.props.SecondaryTag}
            onChange={(e) => this.props.dispatch(updateField('SecondaryTag', e.target.value))}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.tagsDropDownList(Tags)}
          </Select>
        </FormControl>
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
    Description: state.createEvent.Description,
    SecondaryTag: state.createEvent.SecondaryTag,
    Tags: state.tags.allTags
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(DetailsStep);









