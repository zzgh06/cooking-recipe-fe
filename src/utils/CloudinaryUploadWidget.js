import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import "../style/common.style.css";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const { uploadImage, type, index } = this.props;
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          if (type === 'main') {
            const mainImage = document.getElementById("uploadedimage_main");
            if (mainImage) {
              mainImage.setAttribute("src", result.info.secure_url);
            }
          }
          uploadImage(result.info.secure_url, type, index);
        }
      }
    );
    const uploadButtonId = `upload_widget_${type}${index !== null ? `_${index}` : ''}`;
    const uploadButton = document.getElementById(uploadButtonId);
    if (uploadButton) {
      uploadButton.addEventListener("click", function () {
        myWidget.open();
      }, false);
    }
  }

  render() {
    const { type, index } = this.props;
    const uploadButtonId = `upload_widget_${type}${index !== null ? `_${index}` : ''}`;
    return (
      <Button id={uploadButtonId} size="sm" className="btn-green ml-2">
        Upload Image +
      </Button>
    );
  }
}

export default CloudinaryUploadWidget;
