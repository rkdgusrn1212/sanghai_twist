import React, { useState } from 'react';

const Cropper = () => {
  const [src, selectFile] = useState(null);
  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  onLoad = (image) => {};

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => selectFile(handleFileChange)}
          />
        </div>
        <div className="col-6">
          {src && (
            <ReactCrop
              src={src}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cropper;
