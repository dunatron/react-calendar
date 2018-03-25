import React, {Component} from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";

const styles = theme => ({

});

class FileUploader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      importOption: "merge", // ["merge", "replace"]
      stage: 0,
      dragStatus: "",
      uploading: false,
      uploadPercent: 0,
      gLCodesArray: [],
    }
  }

  updateImportOption(optionVal) {
    this.setState({
      importOption: optionVal,
    })
  }

  render = () => {
    let components = []
    let barStyle = {
      width: this.state.uploadPercent + "%",
    }

    switch (this.state.stage) {
      case 0:
        this.renderUploadForm(components, barStyle)
        break
      case 1:
        this.renderWait(components, barStyle)
        break
    }

    return (
      <div>
        <div className={"dropZoneFileWrap"}>{components}</div>
      </div>
    )
  }

  renderUploadForm = (components, barStyle) => {
    components.push(
      <div
        key={"uploadForm"}
        onClick={this.onZoneClick}
        className={"dropZone " + this.state.dragStatus}
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}>
        <span className={"dropTitle"}>{"Drag and drop file"}</span>
        <span className={"dropSubTitle"}>{"or click to upload"}</span>
        <input
          key={"uploadInput"}
          ref={"uploadInput"}
          className={"uploadButton"}
          type={"file"}
          onChange={this.onFileChange}
        />
        <div key={"progressContainer"} className={"progress"}>
          <div style={barStyle} className={"progressBar"} />
        </div>
      </div>
    )
  }

  renderWait = (components, barStyle) => {
    components.push(
      <div key={"dropKey"} className={"dropZone " + this.state.dragStatus}>
        <span className={"dropMessage"}>{"Please wait..."}</span>
        <div key={"progressContainer"} className={"progress"}>
          <div style={barStyle} className={"progressBar"} />
        </div>
      </div>
    )
  }

  uploadFiles = files => {
    let me = this
    let file
    let reader
    let uniqueId

    for (let j = 0; j < files.length; j++) {
      file = files[j]
      reader = new FileReader()
      reader.onload = (function(file) {
        return function(e) {
          uniqueId = me.randomId(6)
          me.doUpload(
            uniqueId,
            0,
            e.target.result,
            file.name,
            file.type,
            file.size
          )
        }
      })(file)
      reader.readAsDataURL(file)
    }
  }

  pushDataUp = gLCodesArray => {
    this.props.recieveData(gLCodesArray, this.state.importOption)
  }

  processFile = files => {
    //http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
    let reader = new FileReader()
    let DATA = "Initial"

    reader.readAsText(files[0])
    reader.onload = function(e) {
      let Data = reader.result
      /** the reader has been kind enough to pump the csv out as a string
       * with ending line characters so now we can split the string
       * into an array which is split by the ending blank line regex
       **/
      const splitResultRows = Data.split(/\r\n|\r|\n/g)
      // remove first result from array (glCode, description)
      splitResultRows.shift()
      // remove last result from array as it is an empty string
      splitResultRows.splice(-1, 1)
      //console.log("split result", splitResultRows)
      // Loop over the array of rows
      let gLCodesArray = []
      splitResultRows.forEach(row => {
        //console.log(row)
        // Split by comma that has not been encased in quotes
        row = row.substring(1, row.length - 1)
        //console.log(row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g))
        let rowArr = row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g)

        let rowObj = {
          glCode: "",
          description: "",
        }

        rowObj.description = rowArr[0]
        rowObj.glCode = rowArr[1]
        gLCodesArray.push(rowObj)
      })

      DATA = gLCodesArray
    }

    let leMESETSTATE = state => {
      this.pushDataUp(state)
    }

    reader.onloadend = function(e) {
      leMESETSTATE(DATA)
    }
  }

  doUpload = (uniqueId, piece, base64, name, type, size) => {
    var me = this
    var fileLength = base64.length
    var chunkSize = 10000
    var postSize = 150000
    var filePieces = Math.floor(fileLength / postSize) + 1
    var currentPiece = base64.substr(piece * postSize, postSize)
    var currentCmd = piece + 1 == filePieces ? "saving" : "uploading"
    var chunkIndex = 0
    var fArray = []
    var pieceLen = currentPiece.length

    this.setState({
      stage: 1,
      dragStatus: "dropActive",
    })

    while (chunkIndex < pieceLen) {
      var fbit = currentPiece.substr(chunkIndex, chunkSize)
      fArray.push(fbit)
      chunkIndex += chunkSize
    }
    piece += 1
    apex.jQuery.ajax({
      type: "POST",
      url: "wwv_flow.show",
      data: {
        p_request: "APPLICATION_PROCESS=APP_UPLOAD_FILE",
        p_instance: $("#pInstance").val(),
        p_flow_id: nomos.applicationId,
        p_flow_step_id: nomos.pageId,
        x01: "uploadFile",
        x02: name,
        x03: type,
        x04: size,
        x05: nomos.pageId,
        x06: currentCmd,
        x07: piece,
        x08: "event",
        x09: uniqueId,
        x10: this.props.event.id,
        f01: fArray,
      },
      success: function() {
        if (piece < filePieces) {
          me.doUpload(uniqueId, piece, base64, name, type, size)
          me.setState({
            uploading: true,
            uploadPercent: piece / filePieces * 100,
          })
        } else {
          me.setState({
            stage: 0,
            dragStatus: "",
            uploading: false,
            uploadPercent: 0,
          })
          if (EventActions) {
            EventActions.refreshDocs(true)
          }
        }
      },
      async: true,
    })
  }

  onFileChange = () => {
    var me = this
    var files = this.refs.uploadInput.getDOMNode().files

    if (!files.length) {
      return
    }

    for (var z = 0; z < files.length && z < 30; z += 1) {
      file = files[z]
      if (file.type.indexOf("msdownload") > 0) {
        notify(
          "Info",
          "Please select valid file(s). Executable files are not accepted",
          "info"
        )
        this.setState({
          dragStatus: "",
        })
        return
      }
      if (file.size > 20000000) {
        notify(
          "Info",
          "File size cannot exceed 20Mb, please select other file(s)",
          "info"
        )
        this.setState({
          dragStatus: "",
        })
        return
      }
    }

    this.uploadFiles(files)
  }

  onDrop = e => {
    e.preventDefault()
    var me = this
    //var files = e.dataTransfer.files
    let files = e.dataTransfer.files

    //console.log(files)

    // for (var z = 0; z < files.length && z < 30; z += 1) {
    //   file = files[z]
    //   if (file.type.indexOf("msdownload") > 0) {
    //     notify(
    //       "Info",
    //       "Please select valid file(s). Executable files are not accepted",
    //       "info"
    //     )
    //     this.setState({
    //       dragStatus: "",
    //     })
    //     return
    //   }
    //   if (file.size > 20000000) {
    //     notify(
    //       "Info",
    //       "File size cannot exceed 20Mb, please select other file(s)",
    //       "info"
    //     )
    //     this.setState({
    //       dragStatus: "",
    //     })
    //     return
    //   }
    // }

    this.processFile(files)
  }

  onDragEnter = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "dropHover",
    })
  }

  onDragLeave = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "",
    })
  }

  onDragOver = e => {
    e.stopPropagation()
    e.preventDefault()
    this.setState({
      dragStatus: "dropHover",
    })
  }

  onZoneClick = () => {
    // var input = this.refs.uploadInput.getDOMNode()
    // $(input).trigger("click")
    this.refs.uploadInput.click()
  }

  randomId = length => {
    return Math.round(
      Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
    )
      .toString(36)
      .slice(1)
  }
}

FileUploader.propTypes = {
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
)(FileUploader);









