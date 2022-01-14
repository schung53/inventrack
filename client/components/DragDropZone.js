import React, { Component } from "react";
import { FileUploader } from "react-drag-drop-files";
import { uploadImageAsync, uploadThumbnailAsync } from '../features/inventory/inventorySlice';
import { connect } from 'react-redux';

const fileTypes = ["JPG", "PNG", "GIF"];

export class DragDrop extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      disabled: false
    }
  };

  componentDidMount() {
    document.getElementById("button").disabled = true;
  }

  handleChange = (file) => {
    this.setState({ file: file, disabled: true });
    document.getElementById("button").disabled = false;
  };

  handleSubmit = () => {
    const { uploadImageAsync, uploadThumbnailAsync } = this.props;
    const { file } = this.state;

    // uploadImageAsync(file);
    uploadThumbnailAsync(file);
  }

  render() {
    const { file, disabled } = this.state;
    return (
      <div>
      <FileUploader handleChange={(image) => this.handleChange(image)} name="file" types={fileTypes} disabled={disabled} />
      {disabled ? <>{file.name}</> : <></>}
      <button
        id="button"
        onClick={this.handleSubmit}
      >
        Submit
      </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  uploadImageAsync,
  uploadThumbnailAsync
};

export default connect(mapStateToProps, mapActionsToProps)(DragDrop);
