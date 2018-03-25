import React, {Component} from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import FileUploader from '../FileUploader'

const styles = theme => ({

});

class MediaStep extends Component {

  render() {
    return (
      <div>
        <FileUploader
          event={this.props.event}
          recieveData={(data, importType) =>
            console.log('File Uploader', data, importType)
          }
        />
      </div>
    );
  }
}

MediaStep.propTypes = {
  classes: PropTypes.object,
};

const reduxWrapper = connect(
  state => ({
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(MediaStep);









