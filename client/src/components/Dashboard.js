import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

import Auth from '../utils/Auth';
import TrackResults from './TrackResults';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID
})

export default function Dashboard({ code }) {
  const accessToken = Auth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [lyrics, setLyrics] = useState('');

  function selectTrack(track) {
    setCurrentTrack(track);
    setSearch('');
    setLyrics('');
  };

  // access lyrics
  useEffect(() => {
    if (!currentTrack) return;
    axios.get('http://localhost:3001/lyrics', {
      params: {
        track: currentTrack.title,
        artist: currentTrack.artist
      }
    })
    .then(res => {
      setLyrics(res.data.lyrics);
    })
  }, [currentTrack])

  // get access token
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // get search results
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then(res => {
      // prevent search results from appearing until user stops typing
      if (cancel) return;

      setSearchResults(res.body.tracks.items.map(track => {
        const smallAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallAlbumImage.url
        }
      })
    )})
    return () => cancel = true;
  }, [search, accessToken])

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-[100px] flex items-center bg-gray-700">
        <div className="search-bar w-full max-w-[500px] mx-4">
          <input
            type="search"
            placeholder="What do you want to listen to?"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full m-2 py-3 px-6 bg-slate-600 text-gray-300 border border-slate-500 placeholder:text-slate-400 placeholder:italic rounded-3xl focus:border-green-300 focus:outline-none"
          />
        </div>
      </div>
      {/* DISPLAY SEARCH RESULTS & SONG LYRICS */}
      <main className="w-full my-[100px] p-8 bg-gray-800 text-gray-200 flex flex-col grow overscroll-y-auto">
        {searchResults.map(track => (
          <TrackResults
            track={track}
            key={track.uri}
            selectTrack={selectTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center whitespace-pre">
            {lyrics}
          </div>
        )}
      </main>
      {/* MUSIC PLAYER */}
      <div className="fixed bottom-0 left-0 w-full h-auto bg-gray-900 text-gray-200 p-8 flex">
        <Player accessToken={accessToken} trackUri={currentTrack?.uri} />
      </div>
    </div>
  );
};
