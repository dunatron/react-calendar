import React, {Component, Fragment} from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import DnDFileReader from '../DnDFileReader'
import {addImage, removeImage} from '../../actions/createEventActions'
import RemovableMediaCard from '../RemovableMediaCard';

const styles = theme => ({
  fileUploadArea: {
    display: 'flex',
    flexWrap: 'wrap'
  },
});

class MediaStep extends Component {

  render() {
    const {EventImages, classes} = this.props
    return (
      <div className={classes.fileUploadArea}>
        {EventImages.length >=1 ? this.renderImages(EventImages) : null}
        <DnDFileReader
          event={this.props.event}
          processData={(data, type, size, name, lastModified) => this.processData(data, type, size, name, lastModified)}
        />
      </div>
    );
  }

  // renderImages = (EventImages) => {
  //   return (
  //     <Fragment>
  //       {EventImages.map((image, idx) => {
  //         return <RemovableMediaCard key={idx} image={image} removeImage={() => this._removeImage(idx)} />
  //       })}
  //     </Fragment>
  //   )
  // }

  renderImages = (EventImages) => {
    return (
      <Fragment>
        {EventImages.map((image, idx) => {
          return <RemovableMediaCard key={idx} image={image} removeImage={() => this._removeImage(idx)} />
        })}
      </Fragment>
    )
  }

  processData = (data, type, size, name, lastModified) => {
    switch (type) {
      case "img":
        this._addImage(data, type, size, name, lastModified)
        break
      case 1:
        this.renderWait(components, barStyle)
        break
    }
  }

  _addImage = (data, type, size, name, lastModified) => {
    const imageObj = {data, type, size, name, lastModified}
    this.props.addImage(imageObj)
  }

  _removeImage = (idx) => {
    this.props.removeImage(idx)
  }

}

MediaStep.propTypes = {
  classes: PropTypes.object,
};

const reduxWrapper = connect(
  state => ({
    EventImages: state.createEvent.EventImages,
  }),
  dispatch => ({
    addImage: (imageObj) => dispatch(addImage(imageObj)),
    removeImage: (idx) => dispatch(removeImage(idx))
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(MediaStep);









