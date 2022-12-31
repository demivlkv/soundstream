import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri])
  
  // will not render player if there is no access token
  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        height: 100,
        activeColor: '#1cb954',
        bgColor: '#111417',
        color: '#fcfcfc',
        loaderColor: '#888',
        sliderColor: '#1cb954',
        sliderHandleColor: '#fff',
        sliderTrackColor: '#3d3d3d',
        sliderHeight: 7,
        trackArtistColor: '#999',
        trackNameColor: '#fff'
      }}
    />
  );
};