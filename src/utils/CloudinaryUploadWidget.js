import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "../style/common.style.css";
import { Button } from "@mui/material";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

// WebP 포맷으로 이미지를 최적화하는 함수
const optimizeImageUrl = (url) => {
  return url.replace(/\/upload\//, '/upload/f_webp/');
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
          console.log("Done! Here is the image info: ", result.info);
          const optimizedUrl = optimizeImageUrl(result.info.secure_url);
          uploadImage(optimizedUrl, type, index); // 이미지 업로드 후 URL과 함께 uploadImage 콜백 호출
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
      <Button id={uploadButtonId} variant="contained" color="primary" sx={{ ml: 2, width: "200px" }}>
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
