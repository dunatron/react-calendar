import React, { Component } from "react"
import { withApollo, compose } from "react-apollo"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import { updateField } from "../../actions/createEventActions"
import { connect } from "react-redux"
import InputTextField from "../Fields/InputTextField"
import TagsDropDownList from "../../containers/TagsDropDownList"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class DetailsStep extends Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { classes, Title, Description, SecondaryTag } = this.props

    return (
      <div className={classes.container}>
        <InputTextField
          id="new-event-name"
          helperText="Enter the title of the event"
          value={Title}
          // onChange={value => this.props.dispatch(updateField("Title", value))}
          onChange={value => this.props.updateField("Title", value)}
          label="Title"
        />
        <InputTextField
          id="new-event-name"
          helperText="Enter the title of the event"
          value={Description}
          multiline={true}
          onChange={value =>
            // this.props.dispatch(updateField("Description", value))
            this.props.updateField("Description", value)
          }
          label="Description"
        />
        <TagsDropDownList
          selected={SecondaryTag}
          onChange={e =>
            // this.props.dispatch(updateField("SecondaryTag", e.target.value))
            this.props.updateField("SecondaryTag", e.target.value)
          }
        />
      </div>
    )
  }
}

DetailsStep.propTypes = {
  classes: PropTypes.object,
}

const reduxWrapper = connect(
  state => ({
    Title: state.createEvent.Title,
    Description: state.createEvent.Description,
    SecondaryTag: state.createEvent.SecondaryTag,
    Tags: state.tags.allTags,
  }),
  dispatch => ({
    updateField: (name, value) => dispatch(updateField(name, value)),
  })
)

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(DetailsStep)
