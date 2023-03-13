import React from 'react';
import "./songcard.css";
import AlbumImage from "./albumimage";
import AlbumInfo from "./albuminfo";


export default function SongCard({ album }) {
  return (
    <div className="SongCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  )
}
