import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import MenuItem from "material-ui/Menu/MenuItem"
// import FormHelperText from "material-ui/Form/FormHelperText"
// import FormControl from "material-ui/Form/FormControl"
import { FormHelperText, FormControl } from "material-ui/Form"
import Input from "material-ui/Input"
import InputLabel from "material-ui/Input/InputLabel"
import Select from "material-ui/Select"

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

const InputSelect = ({
  id,
  name,
  selected,
  options = [{ value: 0, label: "label 0" }, { value: 1, label: "label 1" }],
  onChange,
  placeholder,
  label,
  classes,
  helperText,
}) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        value={selected}
        onChange={() => onChange()}
        input={<Input name={name} id={id} />}
        displayEmpty
        className={classes.selectEmpty}>
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map(({ value, label }, idx) => (
          <MenuItem key={idx} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

InputSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InputSelect)
