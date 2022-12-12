import React from 'react';
import '../components/closet/Cropper.css';
import CropperTop from '../components/closet/CropperTop';
import CropperBottom from '../components/closet/CropperBottom';

function Closet() {
  return (
    <div className="Clset">
      <div>
        <CropperTop />
        <CropperBottom />
      </div>
    </div>
  );
}

export default Closet;
