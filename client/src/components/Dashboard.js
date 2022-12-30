import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import Auth from '../utils/Auth';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID
})

export default function Dashboard({ code }) {
  const accessToken = Auth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  console.log(searchResults);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then(res => {
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
  }, [search, accessToken])

  return <div className="w-full min-h-screen flex flex-col">
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
    {/* DISPLAY SONG LYRICS */}
    <div className="w-full h-auto mt-[100px] p-8 bg-gray-800 text-gray-200 flex grow overflow-y-auto">
      Songs
    </div>
    {/* MUSIC PLAYER */}
    <div className="w-full h-auto bg-gray-900 text-gray-200 p-8 flex">
      Bottom
    </div>
  </div>
};
