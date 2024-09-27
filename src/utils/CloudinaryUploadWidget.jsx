import React, { Component } from "react";
import PropTypes from "prop-types";
// import "../style/common.style.css";
import { Button } from "@mui/material";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const optimizeImageUrl = (url) => {
  return url.replace(/\/upload\//, '/upload/f_webp/f_auto,q_auto/');
};

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const { type, index } = this.props;
    this.initializeWidget(type, index);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index || prevProps.type !== this.props.type) {
      this.initializeWidget(this.props.type, this.props.index);
    }
  }

  componentWillUnmount() {
    const { type, index } = this.props;
    const uploadButtonId = `upload_widget_${type}${index !== null ? `_${index}` : ''}`;
    const uploadButton = document.getElementById(uploadButtonId);
    if (uploadButton) {
      uploadButton.removeEventListener("click", this.handleClick);
    }
  }

  initializeWidget(type, index) {
    const { uploadImage } = this.props;
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const optimizedUrl = optimizeImageUrl(result.info.secure_url);
          uploadImage(optimizedUrl, type, index); 
        }
      }
    );

    const uploadButtonId = `upload_widget_${type}${index !== null ? `_${index}` : ''}`;
    const uploadButton = document.getElementById(uploadButtonId);
    if (uploadButton) {
      uploadButton.addEventListener("click", () => myWidget.open());
    }
  }

  render() {
    const { type, index } = this.props;
    const uploadButtonId = `upload_widget_${type}${index !== null ? `_${index}` : ''}`;
    return (
      <Button id={uploadButtonId} variant="contained" color="primary" sx={{ width: "200px" }}>
        Upload Image +
      </Button>
    );
  }
}

CloudinaryUploadWidget.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  uploadImage: PropTypes.func.isRequired,
};

export default CloudinaryUploadWidget;
