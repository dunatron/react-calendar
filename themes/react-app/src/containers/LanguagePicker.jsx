import React, { Component } from "react"
import { compose } from "react-apollo"
import InputSelect from "../components/Fields/InputSelect"
// Connect Redux
import { connect } from "react-redux"

const TagOptions = tags => {
  console.log("DROPDOWN TAGS -> ", tags)
  return tags.map(tag =>
    tag.SecondaryTags.map(secondary => ({
      label: secondary.Title,
      value: secondary.HappTagID,
    }))
  )
}

class TagsDropDownList extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { tags, selected, onChange } = this.props
    return (
      <InputSelect
        onChange={() => onChange()}
        selected={selected}
        options={<TagOptions tags={tags} />}
      />
    )
  }
}

const reduxWrapper = connect(state => ({
  tags: state.tags.allTags,
}))

export default compose(reduxWrapper)(TagsDropDownList)
