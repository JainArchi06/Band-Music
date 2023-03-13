import React from "react";
import "./albumimage.css";

export default function AlbumImage({ url }) {
  return (
    <div className="albumimage flex">
      <img src={url} alt="album art" className="albumimage-art" />
      <div className="albumimage-shadow">
        <img src={url} alt="shadow" className="albumimage-shadow" />
      </div>
    </div>
  );
}
