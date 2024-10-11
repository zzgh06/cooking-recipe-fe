import React, { Component } from "react";
import PropTypes from "prop-types";

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
      <button 
        id={uploadButtonId}
        className="w-220px bg-blue-500 text-white font-medium rounded px-2 py-3 ml-3"
      >
        Upload Image +
      </button>
    );
  }
}

CloudinaryUploadWidget.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  uploadImage: PropTypes.func.isRequired,
};

export default CloudinaryUploadWidget;
