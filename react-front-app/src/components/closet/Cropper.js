import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = () => {
  const [src, selectFile] = useState(null);
  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: NaN });
  const [result, setResult] = useState(null);

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {src && (
          <div className="col-6">
            <ReactCrop
              src={src}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
              onDragStart={getCroppedImg}
              onDragEnd={getCroppedImg}
              dragCrop={getCroppedImg}
            />
          </div>
        )}
        {result && (
          <div className="col-6">
            <img src={result} alt="Cropped Image" className="img-fluid" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cropper;
