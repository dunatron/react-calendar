import React from "react"
import { withStyles } from "material-ui/styles"
import TextField from "material-ui/TextField"

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

const InputTextField = ({
  id,
  value,
  multiline = false,
  onChange,
  label,
  classes,
  helperText,
}) => {
  return (
    <TextField
      value={value}
      multiline={multiline}
      onChange={e => onChange(e.target.value)}
      label={label}
      id={id}
      className={classes.textField}
      helperText={helperText}
    />
  )
}

export default withStyles(styles)(InputTextField)
