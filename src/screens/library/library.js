import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons';
import APIKit from "../../spotify";
import { AiFillPlayCircle } from "react-icons/ai";
import './library.css';
import { useNavigate } from 'react-router-dom';

export default function Library() {
  const [playlists, setPlayLists] = useState(null);
  useEffect(() => {
    APIKit.get("me/playlists").then(function (response) {
      setPlayLists(response.data.items);
    });
  }, []);
  // console.log(response.data.items);
   const Navigate= useNavigate();
  const playPlaylist =(id)=>{
    Navigate('/player',{state: {id: id}});
  };
  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists?.map((playlists) => (
          <div className="playlist-card"
            key={playlists.id} onClick= {()=> playPlaylist(playlists.id)}>
            <img src={playlists.images[0].url} 
            className="playlist-image" 
            alt="playlist-art"/>
            <p className="playlist-title">{playlists.name}</p>
            <p className=" playlist-subtitle"> {playlists.tracks.total}Songs</p>
            <div className='playlist-fade'>
              <IconContext.Provider value={{size: "50px", color:"#E99D72"}}>
                <AiFillPlayCircle />
              </IconContext.Provider>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

